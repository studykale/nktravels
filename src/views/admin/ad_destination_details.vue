<template>
  <div class="pt-2">
    <div v-if="!loadingDestination" class="container mx-4">
      <h2
        class="is-family-primary is-size-5 has-text-black-bis has-text-weight-semibold"
      >
        {{ destination.name }}
      </h2>
      <hr />
      <h4 class="has-text-weight-semibold is-family-sans-serif">
        Summary
      </h4>
      <p>{{ destination.summary }}</p>
      <br />
      <h4 class="has-text-weight-semibold is-family-sans-serif">
        Description
      </h4>
      <hr />
      <span class="d-description" v-html="destination.description"></span>
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
      <br />
      <h4 class="has-text-weight-semibold is-family-sans-serif">
        Messages
      </h4>
      <br />
      <br />
      <b-table
        :data="destination.messages"
        :columns="messageColumns"
        focusable
        detailed
      >
        <template slot="detail" slot-scope="props">
          <p>
            {{ props.row.message }}
          </p>
        </template>
      </b-table>
      <br />
      <h4 class="has-text-weight-semibold is-family-sans-serif">
        Bookings
      </h4>
      <br />
      <br />
      <b-table
        :data="destination.bookings"
        :columns="bookingColumns"
        focusable
        detailed
      >
        <template slot="detail" slot-scope="props">
          <small class="has-text-weight-semibold">Package Choice</small>
          <h3 class="is-family-sans-serif has-text-weight-semibold">
            {{ props.row.package }}
          </h3>
          <br />
          <small class="has-text-weight-semibold">Package cost</small>
          <h3 class="is-family-sans-serif has-text-weight-semibold">
            {{ props.row.packageCost }}
          </h3>
          <hr />
          <p>{{ props.row.message }}</p>
        </template>
      </b-table>
      <br />
    </div>
    <div v-else class="h-100 items-center flex centered">
      <p class="is-family-sans-serif">Loading destination details</p>
    </div>
  </div>
</template>

<script>
import { companyCollection } from "../../db";
export default {
  data() {
    return {
      loadingDestination: false,
      loadingBookings: false,
      loadingMessages: false,
      destination: null,
      bookingColumns: [
        {
          field: "name",
          label: "Name"
        },
        {
          field: "email",
          label: "Email"
        },
        {
          field: "primaryPhone",
          label: "Phone number"
        },
        {
          field: "secondaryPhone",
          label: "Second phone No."
        },
        {
          field: "startDate",
          label: "Start date"
        },
        {
          field: "endDate",
          label: "End date"
        }
      ],
      messageColumns: [
        {
          field: "name",
          label: "Name"
        },
        {
          field: "email",
          label: "Email"
        },
        {
          field: "type",
          label: "Message Type"
        }
      ],
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
      ]
    };
  },
  created() {
    this.loadingDestination = true;
    this.loadingBookings = true;
    this.loadingMessages = true;

    companyCollection
      .doc(this.$route.params.companyId)
      .collection("destinations")
      .doc(this.$route.params.tripId)
      .get()
      .then(result => {
        this.loadingDestination = false;

        if (result.exists) {
          console.log("destination details", result.data());
          this.destination = result.data();
        }
      })
      .catch(() => {
        this.loadingDestination = false;
      });
  }
};
</script>

<style lang="scss" scoped>
.d-description {
  ul {
    margin: 1em !important;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
  }

  p {
    font-size: 0.85rem;
    color: grey;
  }

  ul li {
    margin-left: 1.2em;
    list-style-type: disc;
  }
}
</style>
