import {
  LOGIN_USER,
  SIGNUP_USER,
  SIGNUP_USER_COMPLETE,
  LOGIN_REQUEST,
  SIGNUP_USER_REQUEST,
  LOGIN_FAILURE,
  SIGNUP_USER_FAILURE
} from "../mutation-types";
import { NotificationProgrammatic as Notification } from "buefy";
import { auth, newUser } from "firebase";
import router from "../../router";

const User = {
  namespaced: true,
  state: {
    status: {
      loggedIn: false
    },
    user: null
  },
  mutations: {
    [LOGIN_REQUEST](state) {
      state.status = {
        loggingIn: true
      };
    },
    [LOGIN_FAILURE](state) {
      state.status = {};
      state.user = null;
    },
    [LOGIN_USER](state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    [SIGNUP_USER](state, user) {
      state.status = { loggedIn: true };
      state.user = { user, isVerified: false };
    },
    [SIGNUP_USER_COMPLETE](state) {
      state.status = {};
    },
    [SIGNUP_USER_REQUEST](state) {
      state.status = {
        signingup: true
      };
    },
    [SIGNUP_USER_FAILURE](state) {
      state.status = {};
      state.user = {};
    }
  },
  actions: {
    init({ commit }) {
      auth
        .onAuthStateChanged(user => {
          if (user) {
            commit("authUser", {
              username: user.displayName,
              email: user.email,
              id: user.uid,
              verified: user.emailVerified
            });
          } else {
            router.push("admin/auth/signin");
          }
        })
        .catch(error => {
          if (
            error.code == "auth/id-token-expired" ||
            error.code == "auth/user-token-expired"
          ) {
            // onIdTokenRevocation()
            //("No")
          } else {
            router.push("admin/auth/signin");
          }
        });
    },
    login({ commit }, payload) {
      commit(LOGIN_REQUEST);
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(result => {
          let user = result.user;
          window.$cookies.set("loggedIn", true, "1d");
          commit(LOGIN_USER, {
            username: user.displayName,
            email: user.email,
            verified: user.emailVerified,
            photoUrl: user.photoURL,
            userId: user.uid
          });
          router.replace("/dashboard/projects");
        })
        .catch(error => {
          //("error sign in", error)
          if (error.code == "auth/user-not-found") {
            Notification.open({
              type: "is-warning",
              message: "No account found by the email",
              duration: 3000
            });
          }

          if (error.code == "auth/wrong-password") {
            Notification.open({
              type: "is-warning",
              message: "Wrong email/password combination.",
              duration: 6000
            });
          }

          if (error.code == "auth/network-request-failed") {
            Notification.open({
              type: "is-info",
              message: "Your internet seems to be down. Please try again",
              duration: 5000
            });
          }
          commit(LOGIN_FAILURE);
        });
    },
    signUp({ commit }, payload) {
      commit(SIGNUP_USER_REQUEST);

      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: payload.username,
              photoURL: `http://tinygraphs.com/spaceinvaders/${payload.username}?theme=duskfalling&numcolors=4&size=220&fmt=svg`
            })
            .then(() => {
              newUser(data.user.uid).set(
                {
                  role: "ADMIN",
                  username: payload.username,
                  email: payload.email,
                  profile: `http://tinygraphs.com/spaceinvaders/${payload.username}?theme=duskfalling&numcolors=4&size=220&fmt=svg`,
                  verified: data.user.emailVerified
                },
                { merge: true }
              );
            });
          commit(SIGNUP_USER_COMPLETE);
          router.push("/admin/auth/signin");
        })
        .catch(error => {
          //("error", error)

          if (error.code == "auth/network-request-failed") {
            Notification.open({
              type: "is-warning",
              position: "is-top",
              duration: 5000,
              message: "Network error. Please check your internet connection"
            });
          } else if (error.code == "auth/email-already-in-use") {
            Notification.open({
              type: "is-warning",
              position: "is-top",
              duration: 5000,
              message: "The account is already in use by another."
            });
          } else {
            Notification.open({
              message: "Sorry we could not create an account " + error.message,
              type: "is-warning",
              position: "is-top-right"
            });
          }
          commit(SIGNUP_USER_FAILURE);
        })
        .catch(() => {
          commit(SIGNUP_USER_FAILURE);
        });
    },
    signout({ commit }) {
      auth
        .signOut()
        .then(() => {
          commit("logout");
          window.$cookies.remove("loggedIn");
          if (window.$cookies.isKey("kadm")) window.$cookies.remove("kadm");
          window.$cookies.remove("vuex");
          window.localStorage.removeItem("vuex");
          router.replace("/");
        })
        .catch(error => {
          Notification.open({
            message: "Sorry we could not log you out :" + error.message,
            type: "is-info",
            position: "is-top-right"
          });
        });
    },
    fetchUser({ commit }, user) {
      if (user) {
        commit("setUser", {
          username: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          verified: user.emailVerified,
          userId: user.uid
        });
      } else {
        commit("setUser", null);
      }
    }
  }
};

export default User;
