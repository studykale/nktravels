<template>
  <div class="mx-2 h-100 flex column centered items-center">
    <div class="has-text-centered py-3">
      <Logo />
    </div>
    <div class="card max-300">
      <div class="card-content">
        <h3 class="is-size-4 is-family-sans-serif">Sign In</h3>
        <form @submit.prevent="loginUser">
          <b-field
            label="Email"
            :type="{ 'is-danger': emailErrors.length > 0 }"
          >
            <b-input
              type="email"
              placeholder="Your email"
              required
              v-model.trim="$v.email.$model"
            >
            </b-input>
          </b-field>

          <b-field
            label="Password"
            :type="{ 'is-danger': passwordErrors.length > 0 }"
            :message="passwordErrors"
          >
            <b-input
              type="password"
              password-reveal
              placeholder="Your password"
              v-model.trim="$v.password.$model"
              required
            >
            </b-input>
          </b-field>
          <router-link
            to="/admin/auth/pass-change-req"
            class="text-left text-purple d-block"
            >Forgot Password</router-link
          >
          <button
            :disabled="submitStatus === 'PENDING'"
            class="button is-primary loginBtn"
            :class="{ 'is-loading': loginStatus.loggingIn == true }"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div class="card-footer">
        <p>
          Don't have an Account?
          <span>
            <router-link to="/admin/auth/signup">Sign Up</router-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { validationMixin } from "vuelidate";
const { required, minLength, email } = require("vuelidate/lib/validators");
import Logo from "../../utilities/logo";

export default {
  name: "Signin",
  mixins: [validationMixin],
  components: {
    Logo
  },
  data() {
    return {
      email: "",
      password: "",
      isSubmitting: "",
      submitStatus: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      min: minLength(8)
    }
  },
  methods: {
    ...mapActions("user", ["login"]),
    loginUser() {
      let data = {
        email: this.email,
        password: this.password
      };

      this.$v.$touch();
      if (this.$v.$invalid && !this.$v.$touch()) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";

        this.submitStatus = "OKAY";
        this.login(data);
        this.email = this.password = this.confirmation = "";
        this.$v.$reset();
      }
    }
  },
  computed: {
    ...mapState({
      loginStatus: state => state.user.status
    }),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      } else if (!this.$v.email.email) {
        errors.push("Please enter a valid email address");
      } else if (!this.$v.email.required) {
        errors.push("Email is required");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      }
      if (!this.$v.password.required) {
        errors.push("A password is required...");
      }
      if (!this.$v.password.min) {
        errors.push("Please enter a minimum of 7 characters");
      }
      return errors;
    }
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
.h-100 {
  height: 100vh;
}

.loginBtn {
  margin: 1em 0;
  display: block;
}

.card {
  margin: 0 auto;
}

.card-footer {
  padding: 1em;
}
</style>
