<template>
  <div>
    <NavClient />
    <div class="wrapper has-background-white">
      <div class="container mt-5 mb-3">
        <div class="columns mx-2">
          <div class="column is-full-mobile is-half-desktop is-half-widescreen">
            <b-carousel
              :autoplay="false"
              :overlay="gallery"
              @click="switchGallery(true)"
              :indicator-inside="false"
            >
              <b-carousel-item class="my-3" v-for="(item, i) in 6" :key="i">
                <span class="image">
                  <img :src="getImgUrl(i)" />
                </span>
              </b-carousel-item>
              <span
                v-if="gallery"
                @click="switchGallery(false)"
                class="modal-close is-large"
              />
              <template slot="indicators" slot-scope="props">
                <figure class="al image" :draggable="false">
                  <img
                    :draggable="false"
                    :src="getImgUrl(props.i)"
                    :title="props.i"
                  />
                </figure>
              </template>
            </b-carousel>
            <div class="my-3">
              <b-button type="is-primary is-light">Book trip</b-button>
            </div>
            <div class="mt-3">
              <h2
                class="is-size-4 has-text-weight-semibold is-family-sans-serif"
              >
                Mzima Springs
              </h2>
              <hr />
              <h4 class="has-text-weight-semibold is-family-sans-serif">
                Details
              </h4>
              <p class="my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate, illum pariatur. Corrupti voluptate dolorum tempore.
              </p>
              <p class="my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates in nam veritatis iste quos vitae qui adipisci
                eveniet, mollitia ipsum. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Voluptate, illum pariatur. Corrupti voluptate
                dolorum tempore.
              </p>
              <p class="my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate, illum pariatur. Corrupti voluptate dolorum tempore.
              </p>
              <br />
              <h4 class="has-text-weight-semibold is-family-sans-serif">
                Pricing
              </h4>
              <br />
              <b-table
                :data="data"
                :columns="columns"
                :selected.sync="selected"
                focusable
              >
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
                <form>
                  <b-field :type="{ 'is-danger': nameErrors.length > 0 }"
              :message="nameErrors" label="Name">
                    <b-input required  v-model="$v.name.$model"></b-input>
                  </b-field>
                  <b-field
                    :type="{ 'is-danger': emailErrors.length > 0 }"
          :message="emailErrors"
                   label="Email">
                    <b-input required v-model.trim="$v.email.$model"></b-input>
                  </b-field>
                  <b-field  label="Type">
                    <b-radio v-model="type"
                        name="name"
                        native-value="inquiry">
                        Inquiry
                    </b-radio>
                    <b-radio v-model="type"
                        name="name"
                        native-value="complaint">
                        Complaint
                    </b-radio>
                    <b-radio v-model="type"
                        name="name"
                        native-value="request">
                        Request
                    </b-radio>
                  </b-field>
                  <b-field
                    :type="{ 'is-danger': messageErrors.length > 0 }"
          :message="messageErrors"
                   label="Message">
                    <b-input
                      maxlength="200"
                      type="textarea"
                       v-model="$v.message.$model"
                    ></b-input>
                  </b-field>
                  <button class="button is-primary mt-3" type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavClient from "@/components/utilities/nav.vue";
import db from '../db';
const data = [
  {
    id: 1,
    first_name: "Jesse",
    last_name: "Simmons",
    date: "2016-10-15 13:43:27",
    gender: "Male"
  },
  {
    id: 2,
    first_name: "John",
    last_name: "Jacobs",
    date: "2016-12-15 06:00:53",
    gender: "Male"
  },
  {
    id: 3,
    first_name: "Tina",
    last_name: "Gilbert",
    date: "2016-04-26 06:26:28",
    gender: "Female"
  },
  {
    id: 4,
    first_name: "Clarence",
    last_name: "Flores",
    date: "2016-04-10 10:28:46",
    gender: "Male"
  },
  {
    id: 5,
    first_name: "Anne",
    last_name: "Lee",
    date: "2016-12-06 14:38:38",
    gender: "Female"
  }
];

import { validationMixin } from "vuelidate";
const {
  required,
  minLength,
  maxLength,
  email
} = require("vuelidate/lib/validators");

export default {
  name: "TripDetails",
  props: {
    trip: {
      type: Object,
      required: true
    }
  },
  mixins: [validationMixin],
  components: {
    NavClient
  },
  data() {
    return {
      gallery: false,
      images: [],
      data,
      selected: data[1],
      email: "",
      type: "inquiry",
      name: "",
      message: "",
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "first_name",
          label: "First Name"
        },
        {
          field: "last_name",
          label: "Last Name"
        },
        {
          field: "date",
          label: "Date",
          centered: true
        },
        {
          field: "gender",
          label: "Gender"
        }
      ],
      isSubmittingMessage: false,
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
    sendMessageForTrip() {
      this.isSubmittingMessage = true;
      db.collection(`companies/${this.trip.companyId}/destinations/${this.trip.id}/messages`)
      .add({
        name: this.name,
        email: this.email,
        message: this.message
      })
      .then(() => {
        this.isSubmittingMessage = false;
        this.$buefy.snackbar.open({
          message: "Message sent successfully. Thank you for your feedback.",
          position: "is-bottom-right",
          type: "is-info"
        });
      })
      .catch(error => {
        this.isSubmittingMessage = false;
        this.$buefy.snackbar.open({
          message: "Message was not sent. " + error.message,
          position: "is-bottom-right",
          type: "is-info"
        });
      })
    },
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`;
    },
    setType(type) {
      this.type = type;
      console.log("type", this.type)
    },
    switchGallery(value) {
      this.gallery = value;
      if (value) {
        return document.documentElement.classList.add("is-clipped");
      } else {
        return document.documentElement.classList.remove("is-clipped");
      }
    },

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
