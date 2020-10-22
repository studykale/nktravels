<template>
  <div class="pt-2">
      <div class="container mx-4">
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
            <br>
             <h4 class="has-text-weight-semibold is-family-sans-serif">
                Description
            </h4>
            <hr>
            <span v-html="destination.description"></span>
            <br>
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
            <br>
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
            <br>
            <h4 class="has-text-weight-semibold is-family-sans-serif">
                Messages
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
                  <h3 class="is-family-sans-serif has-text-weight-semibold">{{ props.row.package }}</h3>
                    <br>
                    <small class="has-text-weight-semibold">Package cost</small>
                    <h3 class="is-family-sans-serif has-text-weight-semibold">{{ props.row.packageCost }}</h3>
                    <hr>
                    <p>{{ props.row.message }}</p>
                </template>
            </b-table>
            <br>
      </div>
  </div>
</template>

<script>
import db, { companyCollection } from '../../db';
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
            ],
        }
    },
    created() {
        this.loadingDestination =  true;
        this.loadingBookings =  true;
        this.loadingMessages = true;

        companyCollection
        .doc(this.$route.params.companyId)
        .collection("destinations")
        .doc(this.$route.params.tripId)
        .get()
        .then(result => {
            this.loadingDestination =  false;

            if (result.exists) {
                this.destination = result.data();
            }
        })
        .catch(error => {
            this.loadingDestination =  false;
        })
    }
}
</script>

<style>

</style>