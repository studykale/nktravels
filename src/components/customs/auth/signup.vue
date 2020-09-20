<template>
  <div class="mx-2 h-100 flex column centered items-center">
    <div class="has-text-centered py-3">
      <Logo />
    </div>
    <div class="card max-300">
      <div v-if="Notify.length > 0" class="card-header">
        <b-message
          v-for="note in Notify"
          :key="note.mKey"
          :type="note.type"
          :duration="note.duration"
          aria-close-label="Close message"
        >
          {{ note.message }}
        </b-message>
      </div>
      <div class="card-content">
        <h3 class="is-size-4 is-family-sans-serif">Sign Up</h3>
        <br />
        <form @submit.prevent="userSignUp">
          <b-field
            label="Username"
            :type="{ 'is-danger': usernameErrors.length > 0 }"
            :message="usernameErrors"
          >
            <b-input
              v-model.trim="$v.username.$model"
              placeholder="john doe"
              maxlength="30"
            ></b-input>
          </b-field>
          <b-field
            label="Email"
            :type="{ 'is-danger': emailErrors.length > 0 }"
            :message="emailErrors"
          >
            <b-input
              v-model.trim="$v.email.$model"
              placeholder="your@email.com"
              type="email"
            ></b-input>
          </b-field>
          <b-field
            label="Password"
            :type="{ 'is-danger': passwordErrors.length > 0 }"
            :message="passwordErrors"
          >
            <b-input
              v-model.trim="$v.password.$model"
              placeholder="Your password"
              type="password"
              minLength="8"
              maxlength="16"
              password-reveal
            ></b-input>
          </b-field>
          <button
            :disabled="submitStatus === 'ERROR'"
            :class="{ 'is-loading': signingup }"
            class="is-success button is-fullwidth"
            type="submit"
            expanded
          >
            Sign Up
          </button>
        </form>
        <p class="mt-4">
          Already have an account?
          <span
            ><router-link to="/admin/auth/signin">Sign In</router-link></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, createNamespacedHelpers, mapState } from "vuex";
import { validationMixin } from "vuelidate";
import Logo from "../../utilities/logo";

const {
  required,
  minLength,
  email,
  maxLength
} = require("vuelidate/lib/validators");
const { mapGetters } = createNamespacedHelpers("notifications");

export default {
  mixins: [validationMixin],
  name: "SignUp",
  components: {
    Logo
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      submitStatus: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    username: {
      required,
      min: minLength(3),
      max: maxLength(30)
    },
    password: {
      required,
      min: minLength(7),
      max: maxLength(15)
    }
  },
  methods: {
    ...mapActions("user", ["signUp"]),
    userSignUp() {
      let data = {
        email: this.email,
        username: this.username,
        password: this.password
      };
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "OKAY";
        this.submitStatus = "PENDING";
        this.signUp(data);
        this.email = "";
        this.password = "";
        this.username = "";
        this.$v.$reset();
      }
    }
  },
  computed: {
    ...mapState({
      signingup: state => state.user.status.signingup
    }),
    ...mapGetters(["Notify"]),
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
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) {
        return errors;
      }
      if (!this.$v.username.min) {
        errors.push("Please enter a valid username.");
      } else if (!this.$v.username.max) {
        errors.push("username is required");
      } else if (!this.$v.username.required) {
        errors.push("Username is required");
      }
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) {
        return errors;
      } else if (!this.$v.password.required) {
        errors.push("Please enter a password");
      } else if (!this.$v.password.min) {
        errors.push("A password of minimum length 7 is required");
      } else if (!this.$v.password.max) {
        errors.push("The password needs to be a maximum of 20 characters.");
      }
      return errors;
    }
  }
};
</script>

<style>
.mx-auto {
  margin: 0 auto;
}

.flex {
  display: flex;
}
</style>
