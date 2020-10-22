<template>
  <div class="card">
    <div class="card-content">
      <h2 class="is-family-sans-serif is-size-5 has-text-weight-semibold">
        Booking
      </h2>
      <p class="is-size-6 has-text-warning" v-if="errorMessage.length > 1">
        {{ errorMessage }}
      </p>
      <hr />
      <form @submit.prevent="bookDestination">
        <div class="columns">
          <div class="column">
            <h4 class="is-family-primary">
              Personnal details
            </h4>
            <hr />
            <div class="columns">
              <div class="column is-full-mobile">
                <b-field label="First name">
                  <b-input required v-model="firstName"></b-input>
                </b-field>
              </div>
              <div class="column is-full-mobile">
                <b-field label="Second name">
                  <b-input required v-model="secondName"></b-input>
                </b-field>
              </div>
            </div>
            <b-field label="Email">
              <b-input type="email" v-model="email"> </b-input>
            </b-field>
            <small class="is-size-7 has-text-black has-text-weight-semibold"
              >Primary contact</small
            >
            <VuePhoneNumberInput
              color="#ffa776"
              valid-color="#00CF91"
              default-country-code="KE"
              required
              v-model="phoneNumber"
            />
            <br />
            <small class="is-size-7 has-text-black has-text-weight-semibold"
              >Secondary contact</small
            >
            <VuePhoneNumberInput
              color="#ffa776"
              valid-color="#00CF91"
              default-country-code="KE"
              required
              v-model="secondaryPhone"
            />
          </div>
          <div class="column ">
            <h4 class="is-family-primary">
              Booking details
            </h4>
            <hr />
            <b-field label="Destination package">
              <b-select
                required
                v-model="packageChoice"
                placeholder="Select a package"
                expanded
              >
                <option
                  v-for="(p, i) in trip.packages"
                  :key="i"
                  :value="p.name"
                  >{{ p.name }}</option
                >
              </b-select>
            </b-field>
            <b-field label="Start date">
              <b-datepicker
                v-model="startDate"
                placeholder="Start date"
                icon="calendar"
                :min-date="startDate"
                trap-focus
              >
              </b-datepicker>
            </b-field>
            <b-field
              label="End date"
              :type="{ 'is-error': getRightEndDate }"
              :message="{ 'Please enter the right end date': getRightEndDate }"
            >
              <b-datepicker
                v-model="endDate"
                placeholder="Start date"
                icon="calendar"
                :min-date="startDate"
                trap-focus
              >
              </b-datepicker>
            </b-field>
            <b-field label="Message or request">
              <b-input
                v-model="bookingMessage"
                maxlength="200"
                type="textarea"
              ></b-input>
            </b-field>
            <br />
            <img
              class="flex mx-a"
              height="250"
              width="250"
              src="../../assets/lipanampesa.png"
              alt=""
            />
            <h4
              class="has-text-weight-center has-text-green has-text-center is-family-sans-serif"
            >
              5378943 - <span class="has-text-red">BUY GOODS AND SERVICES</span>
            </h4>
            <br />
            <h2
              v-if="packageChoice"
              class="is-family-sans-serif has-text-center has-text-weight-semibold is-size-3"
            >
              {{ `KSH ${destinationPrice.cost}` || "Please Select package" }}
            </h2>
            <h2 v-else class="has-text-center is-family-sans-serif">
              Please select a destination package
            </h2>
            <br />
          </div>
        </div>
        <button
          type="submit"
          :class="{ 'is-loading': booking }"
          class="button is-success"
        >
          Book destination
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import db, { Timestamp } from "../../db";
// import tripCardVue from '../customs/trip-card.vue';

export default {
  props: {
    trip: {
      required: true
    },
    companyId: {
      type: String,
      required: true
    },
    tripId: {
      type: String,
      required: true
    }
  },
  name: "BookingForm",
  components: {
    VuePhoneNumberInput
  },
  data() {
    let today = new Date();
    let maxDate = new Date(today.setDate(today.getMonth() + 1));
    return {
      firstName: "",
      secondName: "",
      email: "",
      phoneNumber: "",
      secondaryPhone: "",
      startDate: today,
      endDate: today,
      bookingMessage: "",
      packageChoice: null,
      maxDate,
      booking: false,
      errorMessage: ""
    };
  },
  methods: {
    bookDestination() {
      let dCost = this.trip.packages.find(t => t.name == this.packageChoice)
        .cost;

      let data = {
        name: `${this.firstName} ${this.secondName}`,
        email: this.email,
        primaryPhone: this.phoneNumber,
        secondaryPhone: this.secondaryPhone,
        packageChoice: this.packageChoice,
        packageCost: dCost,
        message: this.bookingMessage,
        startDate: this.startDate,
        endDate: this.endDate
      };

      this.booking = true;
      db.collection(
        `companies/${this.companyId}/destinations`
      )
      .doc(this.tripId)
      .set({
        bookings: data
      }, { merge: true })
        
        .then(() => {
          this.booking = false;
          let today = new Date();
         
          db.collection("notifications")
          .add({
            client: data.name,
            email: data.email,
            message: "New reservation was made for " + this.trip.name,
            created: Timestamp.now()
          })
          .then(() => {
             this.firstName = this.secondName = this.email = this.phoneNumber = this.secondaryPhone =
            "";
          this.startDate = today;
          this.message = "";
          this.endDate = new Date(today.setDate(today.getMonth() + 2));
          this.$router.replace("/successful-booking");

          })
          .catch(() => {
            this.$router.replace("/successful-booking");
          })
        })
        .catch(error => {
          this.booking = false;
          this.errorMessage = `Sorry we were unable to complete your booking process. ${error.message}`;
        });
    }
  },
  computed: {
    destinationPrice() {
      return this.trip.packages.find(t => t.name == this.packageChoice);
    },
    getRightEndDate() {
      if (this.startDate.getTime() > this.endDate.getTime()) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mx-a {
  margin: 0 auto;
}
</style>
