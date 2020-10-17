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
import {
  auth,
  newUser,
  storageRef,
  TaskEvent,
  TaskState,
  currentUser
} from "../../db";
import router from "../../router";

const uploadFiles = (file, dir) => {
  // let progress, status;
  return new Promise((resolve, reject) => {
    let uploadTask = storageRef
      .child(`${dir}/${file.name}`)
      .put(file, { contentType: file.type });

    uploadTask.on(
      TaskEvent.STATE_CHANGED,
      snapshot => {
        // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // //('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case TaskState.PAUSED: // or 'paused'
            // //('Upload is paused');
            Notification.open({
              message: "Sorry the upload process paused..",
              type: "is-warning"
            });

            break;
          case TaskState.RUNNING: // or 'running'
            // //('Upload is running');
            Notification.open({
              message: "Uploading...",
              type: "is-info"
            });

            break;
          case TaskState.SUCCESS:
            // status = "complete";
            Notification.open({
              message: "Successfully uploaded just finishing up",
              type: "is-success"
            });
            break;
        }
      },
      error => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            // //("You dont have permmission")
            error = "unauthorized";
            reject(new Error("No permission"));
            break;

          case "storage/canceled":
            // User canceled the upload
            // //("error cancelled")
            error = "cancelled";
            reject(new Error("Process cancelled"));
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            error = "Error occurred";
            reject(new Error("Error occured. Unknown"));
            // //("error unknown")

            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          // //("url", url)
          resolve(url);
          // //("files", filesUrl)
        });
      }
    );
  });
};

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
    },
    setUser(state, user) {
      state.user = user;
      state.status = { loggedIn: true };
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
          console.log("loggedin");
          let user = result.user;
          window.$cookies.set("loggedIn", true, "1d");
          commit(LOGIN_USER, {
            username: user.displayName,
            email: user.email,
            verified: user.emailVerified,
            photoUrl: user.photoURL,
            userId: user.uid
          });
          router.replace("admin/dashboard");
        })
        .catch(error => {
          console.log("error from signin", error);
          //("error sign in", error)
          if (error.code == "auth/user-not-found") {
            Notification.open({
              type: "is-warning",
              message: "No account found by the email",
              duration: 3000,
              position: "is-top"
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
          router.push("/admin/dashboard");
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
    },
    updateUserProfile({ dispatch, commit }, data) {
      console.log("data");
      commit("updateProfileRequest");
      if (data.type == "photo") {
        uploadFiles(data.image, "photo")
          .then(file => {
            currentUser
              .updateProfile({
                photoURL: file
              })
              .then(() => {
                commit("updateProfile", currentUser.photoURL);
              })
              .catch(error => {
                Notification.open({
                  message:
                    "Sorry we could not update the profile. " + error.message
                });
                commit("updateProfileFail");
              });
          })
          .catch(error => {
            Notification.open({
              message: "Profile was not updated :" + error.message
            });
            commit("updateProfileFail");
          });
      } else if (data.type == "email") {
        commit("updateEmailRequest");

        currentUser
          .updateEmail(data.email)
          .then(() => {
            Notification.open({
              type: "is-info",
              message: "Email updated..."
            });
            commit("updateEmail", currentUser.email);
          })
          .catch(error => {
            commit("updateEmailFail");
            if (error.type == "invalid-email") {
              Notification.open({
                message: "Sorry but that is an invalid email.",
                type: "is-warning"
              });
            } else if (error.type == "requires-recent-login") {
              Notification.open({
                message: "You need to have logged In",
                type: "is-danger"
              });
            } else if (error.type == "email-already-in-use") {
              Notification.open({
                message: "Sorry that email is already in use",
                type: "is-warning"
              });
            }
          });
      } else if (data.type == "password") {
        commit("updatePasswordRequest");

        currentUser
          .updatePassword(data.password)
          .then(result => {
            console.log("res", result);
            dispatch("signout");
          })
          .catch(error => {
            console.log("err", error);
          });
      }
    }
  }
};

export default User;
