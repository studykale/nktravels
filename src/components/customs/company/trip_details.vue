<template>
  <b-sidebar
    type="is-light"
    fullheight
    right
    v-model="openSide"
    mobile="fullwidth"
  >
    <div class="px-3 py-5">
      <div class="flex j-right mb-3">
        <minimize-2-icon
          @click="openSide = !openSide"
          size="1.5x"
        ></minimize-2-icon>
      </div>
      <div v-if="destination">
        <h2
          class="mb-3 is-family-sans-serif is-text-capitalized is-size-5 has-text-black-bis has-text-weight-semibold"
        >
          {{ destination.name }}
        </h2>
        <div class="flex f-column mb-2">
          <p class="is-size-7 has-text-grey">Category</p>
          <b class="mb-3">{{ destination.category }}</b>
        </div>
        <div class="flex f-column mb-2">
          <p class="is-size-7 has-text-grey">
            Description
          </p>
          <span class="mb-3" v-html="destination.description"></span>
        </div>
        <div class="mb-3">
          <p class="is-size-7 has-text-grey">
            Images.
          </p>
          <div
            class="flex row wrap images"
            v-if="destination.images.length > 0"
          >
            <img
              v-for="(img, i) in destination.images"
              :key="i"
              :src="img"
              alt=""
            />
          </div>
          <div v-else>
            <p>Trip does not have any images.</p>
          </div>
        </div>
        <div class="my-3">
          <p class="is-size-7 has-text-grey">Views</p>
          <p>{{ destination.views || "0" }} Views</p>
        </div>

        <p>{{ destination.packages.length || 0 }} trip package(s)</p>
        <hr />
        <div class="flex row">
          <b-button
            @click="destinationDetails()"
            class="mt-3 mr-2"
            type="is-info"
            >More details</b-button
          >
          <b-button @click="confirmDelete" class="mt-3 mr-2" type="is-danger"
            >Delete</b-button
          >
          <b-button v-if="destination.bookings" type="is-primary" class="mt-3">
            Bookings
          </b-button>
        </div>
      </div>
    </div>
  </b-sidebar>
</template>

<script>
import { Minimize2Icon } from "vue-feather-icons";
import { companyCollection, storageRef } from "../../../db";

export default {
  components: {
    Minimize2Icon
  },
  data() {
    return {
      openSide: false,
      tripId: null,
      destination: null,
      companyId: null,
      bookings: null
    };
  },
  methods: {
    destinationDetails() {
      alert("we are here");
    },
    confirmDelete() {
      this.openSide != this.openSide;
      this.$buefy.dialog.confirm({
        message:
          "Are you sure you want to delete the destination? This can not be undone.",
        title: "Delete trip",
        confirmText: "Delete",
        onConfirm: () => this.deleteDestination
      });
    },
    deleteDestination() {
      companyCollection
        .doc(this.companyId)
        .collection("destinations")
        .doc(this.destination.id)
        .get()
        .then(result => {
          if (result.exists) {
            let dData = result.data();
            if (dData.images) {
              let images = dData.images;
              images.forEach(e => {
                storageRef.storage.refFromURL(e).delete();
              });
            }

            companyCollection.doc(result.id).delete();
          }
        })
        .catch(error => {
          console.log("error", error);
          this.$buefy.snackbar.open({
            message: "Destination was not deleted.",
            type: "is-warning",
            position: "is-bottom-right"
          });
        });
    }
  },
  created() {
    this.$nextTick(() => {
      this.$root.$on("openTripDetails", arg1 => {
        console.log("arg1", arg1);
        this.openSide = arg1.show;
        this.$bind(
          "destination",
          companyCollection
            .doc(arg1.company)
            .collection("destinations")
            .doc(arg1.id)
        );
        // companyCollection
        //   .doc(arg1.company)
        //   .collection("destinations")
        //   .doc(arg1.id)
        //   .collection("bookings")
        //   .get()
        //   .then(bookings => {
        //     if (!bookings.empty) {
        //       bookings.forEach(b => {
        //         let id = b.id;
        //         let bData = b.data();
        //         this.bookings.push({
        //           id,
        //           ...bData
        //         });
        //       });
        //     }
        //   })
        //   .catch(() => {
        //     this.bookings = null;
        //   });
      });
    });
  }
};
</script>

<style scoped lang="scss">
span p {
  font-size: 0.85rem;
}

.images {
  margin-top: 1em;
}
.images img {
  border-radius: 4px;
  height: 100px;
  width: 120px;
  object-fit: center;
}
</style>
