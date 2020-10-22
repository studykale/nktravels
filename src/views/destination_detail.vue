<template>
  <div>
    <NavClient />
    <div class="wrapper has-background-white">
      <div v-if="!loadingDestination" class="container mt-5 mb-3">
        <div v-if="!errorFound" class="columns mx-2">
          <div class="column is-full-mobile is-half-desktop is-half-widescreen">
            <b-carousel
              v-if="destination.images.length > 0"
              :autoplay="false"
              :overlay="gallery"
              @click="switchGallery(true)"
              :indicator-inside="false"
            >
              <b-carousel-item
                class="my-3"
                v-for="(image, i) in destination.images"
                :key="i"
              >
                <span class="image">
                  <img :src="image" />
                </span>
              </b-carousel-item>
              <span
                v-if="gallery"
                @click="switchGallery(false)"
                class="modal-close is-large"
              />
              <template slot="indicators" slot-scope="props">
                <figure class="al image" :draggable="false">
                  <img :draggable="false" :src="props.i" :title="props.i" />
                </figure>
              </template>
            </b-carousel>
            <div v-else>
              <p class="is-family-sans-serif">No images attached.</p>
            </div>
            <div class="my-3">
              <b-button @click="bookDestination" type="is-primary is-light"
                >Book trip</b-button
              >
            </div>
            <div class="mt-3">
              <h2
                class="is-size-4 has-text-weight-semibold is-family-sans-serif"
              >
                {{ destination.name }}
              </h2>
              <hr />
              <h4 class="has-text-weight-semibold is-family-sans-serif">
                Details
              </h4>
              <div class="my-3">
                <span v-html="destination.description"></span>
              </div>

              <br />
              <h4 class="has-text-weight-semibold is-family-sans-serif">
                Packages
              </h4>
              <small>Choose the right package for you.</small>
              <br />
              <br />
              <b-table
                :data="destination.packages"
                :columns="columns"
                focusable
                detailed
              >
                <template slot="detail" slot-scope="props">
                  <p>
                    {{ props.row.description }}
                  </p>
                </template>
              </b-table>
            </div>
          </div>
          <div class="column is-half-desktop">
            <div class="card mx-3">
              <div class="card-header py-2 px-3">
                <h2
                  class="is-family-sans-serif has-text-weight-semibold is-size-4"
                >
                  Get in touch.
                </h2>
              </div>
              <div class="card-content">
                <form @submit.prevent="sendMessageForTrip">
                  <b-field
                    :type="{ 'is-danger': nameErrors.length > 0 }"
                    :message="nameErrors"
                    label="Name"
                  >
                    <b-input required v-model="$v.name.$model"></b-input>
                  </b-field>
                  <b-field
                    :type="{ 'is-danger': emailErrors.length > 0 }"
                    :message="emailErrors"
                    label="Email"
                  >
                    <b-input required v-model.trim="$v.email.$model"></b-input>
                  </b-field>
                  <b-field label="Type">
                    <b-radio
                      size="is-small"
                      v-model="type"
                      name="name"
                      native-value="inquiry"
                    >
                      Inquiry
                    </b-radio>
                    <b-radio
                      size="is-small"
                      v-model="type"
                      name="name"
                      native-value="complaint"
                    >
                      Complaint
                    </b-radio>
                    <b-radio
                      size="is-small"
                      v-model="type"
                      name="name"
                      native-value="request"
                    >
                      Request
                    </b-radio>
                  </b-field>
                  <b-field
                    :type="{ 'is-danger': messageErrors.length > 0 }"
                    :message="messageErrors"
                    label="Message"
                  >
                    <b-input
                      maxlength="200"
                      type="textarea"
                      v-model="$v.message.$model"
                    ></b-input>
                  </b-field>
                  <button
                    :class="{ 'is-loading': isSubmittingMessage }"
                    class="button is-primary mt-3"
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex items-center centered">
          <b-message
            title="Destination not found"
            type="is-danger"
            aria-close-label="Close message"
          >
            {{ errorMessage }}
            <span class="mt-2">
              <router-link to="/find-trip">
                Go home
              </router-link>
            </span>
          </b-message>
        </div>
        <b-modal scroll="keep" v-model="showBookingForm">
          <BookingForm
            :trip="destination"
            :companyId="$route.params.companyId"
            :tripId="$route.params.tripId"
          />
        </b-modal>
      </div>
      <div class="h-100 flex items-center centered" v-else>
        <p class="is-family-sans-serif">
          Loading destination...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavClient from "@/components/utilities/nav.vue";
import db, { companyCollection } from "../db";
import BookingForm from "@/components/utilities/booking_form.vue";
import { validationMixin } from "vuelidate";
const {
  required,
  minLength,
  maxLength,
  email
} = require("vuelidate/lib/validators");

export default {
  name: "TripDetails",
  mixins: [validationMixin],
  components: {
    NavClient,
    BookingForm
  },
  data() {
    return {
      gallery: false,
      images: [],
      selected: [],
      email: "",
      type: "inquiry",
      name: "",
      message: "",
      destination: {},
      loadingDestination: false,
      columns: [
        {
          field: "name",
          label: "Name",
          width: "40"
        },
        {
          field: "noOfDays",
          label: "Number of days"
        },
        {
          field: "cost",
          label: "Price"
        },
        {
          field: "numberOfPeople",
          label: "No of people",
          centered: true
        }
      ],
      isSubmittingMessage: false,
      errorMessage: "",
      errorFound: false,
      showBookingForm: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    name: {
      required,
      max: maxLength(10)
    },
    message: {
      required,
      max: maxLength(300),
      min: minLength(100)
    }
  },
  methods: {
    bookDestination() {
      this.showBookingForm = !this.showBookingForm;
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    sendMessageForTrip() {
      this.isSubmittingMessage = true;
      db.collection(`companies/${this.$route.params.companyId}/destinations/`)
        .doc(this.$route.params.tripId)
        .set({
          messages: {
            name: this.name,
            email: this.email,
            message: this.message,
            type: this.type
          }
        })
        .then(() => {
          this.isSubmittingMessage = false;
          this.name = this.email = this.message = "";
          this.$buefy.snackbar.open({
            message: "Message sent successfully. Thank you for your feedback.",
            position: "is-bottom-right",
            type: "is-info"
          });
        })
        .catch(error => {
          this.isSubmittingMessage = false;
          this.name = this.email = this.message = "";

          this.$buefy.snackbar.open({
            message: "Message was not sent. " + error.message,
            position: "is-bottom-right",
            type: "is-info"
          });
        });
    },
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`;
    },
    switchGallery(value) {
      this.gallery = value;
      if (value) {
        return document.documentElement.classList.add("is-clipped");
      } else {
        return document.documentElement.classList.remove("is-clipped");
      }
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
  },
  created() {
    this.loadingDestination = true;
    companyCollection
      .doc(this.$route.params.companyId)
      .collection("destinations")
      .doc(this.$route.params.tripId)
      .get()
      .then(result => {
        this.loadingDestination = false;
        if (result.exists) {
          this.destination = result.data();
        }
      })
      .catch(error => {
        this.loadingDestination = false;
        // If the destination was not loaded.
        this.errorFound = true;
        this.errorMessage =
          "Sorry we were unable to access the destination details. " +
          error.message;
      });
  }
};
</script>

<style lang="scss">
img {
  border-radius: 7px;
}
.is-active .al img {
  filter: grayscale(0%);
}
.al img {
  filter: grayscale(100%);
}

.wrapper {
  min-height: 100vh;
  margin-top: -25px;
  margin-bottom: 2em;
}

.radio.control-label:hover {
  color: grey !important;
}
</style>
