<template>
  <div class="card">
    <div class="card-header px-4 py-3">
      <h2
        class="has-text-centeris-size-5 is-family-sans-serif has-text-weight-semibold"
      >
        Contact us.
      </h2>
    </div>
    <div class="card-content">
      <form @submit.prevent="sendContact">
        <div class="columns">
          <div class="column is-full-mobile">
            <b-field
              :type="{ 'is-danger': nameErrors.length > 0 }"
              :message="nameErrors"
              label="First name"
            >
              <b-input
                placeholder="Joe"
                required
                maxlength="20"
                v-model="$v.name.$model"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-full-mobile">
            <b-field label="Second name">
              <b-input
                maxlength="20"
                placeholder="doe"
                v-model="secondName"
              ></b-input>
            </b-field>
          </div>
        </div>
        <b-field
          :type="{ 'is-danger': emailErrors.length > 0 }"
          :message="emailErrors"
          label="Email"
        >
          <b-input
            type="email"
            required
            v-model.trim="$v.email.$model"
            placeholder="your@example.com"
            maxlength="30"
          >
          </b-input>
        </b-field>
        <b-field
          :type="{ 'is-danger': messageErrors.length > 0 }"
          :message="messageErrors"
          label="Message"
        >
          <b-input
            v-model="$v.message.$model"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>

        <button
          type="submit"
          :class="{ 'is-loading': isSubmitting }"
          class="button is-expanded is-info is-light"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../../db";
import { validationMixin } from "vuelidate";
const {
  required,
  minLength,
  maxLength,
  email
} = require("vuelidate/lib/validators");

export default {
  name: "GlobalClientContact",
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    message: {
      required,
      min: minLength(10),
      max: maxLength(300)
    },
    name: {
      required,
      max: maxLength(10)
    }
  },
  data() {
    return {
      email: "",
      firstName: "",
      secondName: "",
      message: "",
      isSubmitting: false,
      sent: null
    };
  },
  methods: {
    sendContact() {
      this.isSubmitting = true;

      db.collection("contactus")
        .add({
          firstName: this.name,
          secondName: this.secondName,
          email: this.email,
          message: this.message
        })
        .then(() => {
          this.isSubmitting = false;
          this.firstName = this.secondName = this.email = this.message = "";
          this.$buefy.snackbar.open({
            message:
              "We have received the message successfully. Thank you for your time",
            title: "Message sent successfully",
            type: "is-success",
            position: "is-bottom-right"
          });
        })
        .catch(error => {
          this.firstName = this.secondName = this.email = this.message = "";
          this.isSubmitting = false;
          this.$buefy.snackbar.open({
            type: "is-warning",
            title: "Message not sent",
            position: "is-bottom-right",
            message: "We could not send the message. " + error.message
          });
        });
      console.log("contact sent");
    }
  },
  computed: {
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
    nameErrors() {
      const errors = [];

      if (!this.$v.name.$dirty) {
        return errors;
      }
      if (!this.$v.name.required) {
        errors.push("Please add this field");
      }
      if (!this.$v.name.max) {
        errors.push("Your name is too long. Please review it");
      }

      return errors;
    },
    messageErrors() {
      const errors = [];

      if (!this.$v.message.$dirty) {
        return errors;
      } else if (!this.$v.message.min) {
        errors.push("Please be more descriptive. Thank you");
      } else if (!this.$v.message.max) {
        errors.push("Your message is too long. Please make it short.Thank you");
      }

      return errors;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 350px;

  @media screen and (max-width: 520px) {
    width: 300px;
  }
}
</style>
