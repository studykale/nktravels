<template>
  <div class="pt-2">
    <div class="container mx-4">
      <h2
        class="is-family-primary is-size-5 has-text-black-bis has-text-weight-semibold"
      >
        Settings
      </h2>
      <hr />
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-header px-3 py-2">
              <h2
                class="is-family-sans-serif is-size-5 has-text-weight-semibold"
              >
                Change Email
              </h2>
            </div>
            <div class="card-content">
              <form @submit.prevent="updateUserEmail">
                <b-field
                  :type="{ 'is-danger': newEmailErrors.length > 0 }"
                  horizontal
                  :message="newEmailErrors"
                  label="Email"
                >
                  <b-input
                    v-model="$v.newEmail.$model"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    expanded
                  ></b-input>
                </b-field>
                <button
                  :disabled="true"
                  class="button is-success mr-a"
                  type="submit"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-header px-3 py-2">
              <h2
                class="is-family-sans-serif is-size-5 has-text-weight-semibold"
              >
                Change Password
              </h2>
            </div>
            <div class="card-content">
              <form @submit.prevent="updateUserPassword">
                <b-field
                  :message="newPasswordErrors"
                  :type="{ 'is-danger': newPasswordErrors.length > 0 }"
                  horizontal
                  label="Password"
                >
                  <b-input
                    v-model="$v.newPassword.$model"
                    placeholder="Your new password"
                    name="password"
                    type="password"
                    expanded
                    password-reveal
                  ></b-input>
                </b-field>
                <b-field
                  :message="confirmPasswordErrors"
                  :type="{ 'is-danger': confirmPasswordErrors.length > 0 }"
                  horizontal
                  label="Confirm Password"
                >
                  <b-input
                    v-model="$v.confirmPassword.$model"
                    placeholder="Your new password"
                    name="password"
                    type="password"
                    expanded
                    password-reveal
                  ></b-input>
                </b-field>
                <div class="flex row">
                  <button
                    :disabled="passwordSubmitStatus === 'ERROR'"
                    :class="{ 'is-loading': updatingPassword }"
                    class="button is-success mr-3"
                    type="submit"
                  >
                    Save
                  </button>
                  <b-tooltip
                    label="Please note that you will be logged out of all devices after a successful change"
                    position="is-top"
                  >
                    <b-button type="is-text">Please note</b-button>
                  </b-tooltip>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
const {
  required,
  minLength,
  email,
  sameAs
} = require("vuelidate/lib/validators");

export default {
  name: "Settings",
  mixins: [validationMixin],
  data() {
    return {
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
      passwordSubmitStatus: null,
      emailSubmitStatus: null
    };
  },
  validations: {
    newEmail: {
      email,
      required
    },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      same: sameAs("newPassword")
    }
  },
  methods: {
    updateUserEmail() {
      let data = {
        email: this.newEmail,
        type: "email"
      };
      if (this.$v.newEmail.$invalid) {
        this.emailSubmitStatus = "ERROR";
      } else {
        this.emailSubmitStatus = "OKAY";
        this.emailSubmitStatus = "PENDING";
        this.updateUserProfile(data);
        this.emailSubmitStatus = null;
        this.$v.$reset();
      }
    },
    updateUserPassword() {
      let data = {
        type: "password",
        password: this.newPassword
      };

      if (this.$v.newPassword.$invalid || this.$v.confirmPassword.$invalid) {
        this.passwordSubmitStatus = "ERROR";
      } else {
        this.passwordSubmitStatus = "PENDING";
        this.updateUserProfile(data);
        this.confirmPassword = "";
        this.newPassword = "";
        this.passwordSubmitStatus = null;
      }
    }
  },
  computed: {
    newEmailErrors() {
      const errors = [];
      if (!this.$v.newEmail.$dirty) {
        return errors;
      }
      if (!this.$v.newEmail.required)
        errors.push("An replace email is required");
      if (!this.$v.newEmail.email) errors.push("A valid email is required.");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) {
        return errors;
      }
      if (!this.$v.newPassword.required) {
        errors.push("Please enter the password to change to");
      }
      if (!this.$v.newPassword.minLength) {
        errors.push("Please enter a stronger password");
      }
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) {
        return errors;
      }
      if (!this.$v.confirmPassword.required) {
        errors.push("Please enter the confirmation password.");
      }
      if (!this.$v.confirmPassword.same) {
        errors.push("The passwords must be identical");
      }
      return errors;
    }
  }
};
</script>

<style></style>
