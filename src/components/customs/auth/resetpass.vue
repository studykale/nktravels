<template>
  <div class="card max-300 mx-auto pt-3">
    <b-message
      v-if="emailNotFound == true"
      label="No account found"
      type="is-warning"
      class="mx-2"
    >
      No account was not found by that email...
    </b-message>
    <div class="card-content">
      <h2 class="is-size-5 has-text-centered is-family-sans-serif">
        Forgot password.
      </h2>
      <hr />
      <p class="my-3">We will send a password reset link if the email exists</p>
      <form @submit.prevent="sendPassChangeRequest">
        <b-field label="Email">
          <b-input
            required
            v-model="email"
            placeholder="your@email.com"
            type="email"
          ></b-input>
        </b-field>
        <button
          class="button is-danger is-fullwidth"
          :class="{ submitting: 'is-loading' }"
          type="submit"
        >
          Send
        </button>
      </form>
      <div class="card-footer py-2 px-3">
        <router-link to="signup" class="text-purple"
          >Sign Up instead?</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../../../db";

export default {
  name: "ResetPass",
  data() {
    return {
      email: "",
      emailNotFound: false,
      submitting: false
    };
  },
  methods: {
    sendPassChangeRequest() {
      this.submitting = true;
      console.log("submitting");
      auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.email = "";
          this.submitting = false;
          this.$router.push("/admin/auth/signin");
        })
        .catch(error => {
          console.log("error", error);
          this.email = "";
          this.submitting = false;
          if (error.code == "auth/user-not-found") {
            this.emailNotFound = true;
          }
        });
    }
  }
};
</script>

<style></style>
