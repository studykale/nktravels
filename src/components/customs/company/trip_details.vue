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
        <p class="has-text-grey has-family-sans-serif">
          {{ destination.location }}
        </p>
        <br />
        <div class="flex f-column mb-2">
          <p class="is-size-7 has-text-grey">Category</p>
          <b class="mb-3">{{ destination.category }}</b>
        </div>
        <div class="flex f-column mb-2">
          <p class="is-size-7 has-text-grey">
            Description
          </p>
          <span
            class="mb-3 description"
            v-html="destination.description"
          ></span>
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
              class="mr-1"
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
        <hr />
        <b-field grouped group-multiline>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark">
                <eye-icon size="1.5x" class="flex has-text-white"></eye-icon>
              </b-tag>
              <b-tag type="is-info">0</b-tag>
            </b-taglist>
          </div>
        </b-field>

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
        </div>
      </div>
    </div>
  </b-sidebar>
</template>

<script>
import { Minimize2Icon, EyeIcon } from "vue-feather-icons";
import { companyCollection, storageRef } from "../../../db";

export default {
  components: {
    Minimize2Icon,
    EyeIcon
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
    showBookingModal() {},
    destinationDetails() {
      this.$router.push(
        `/admin/destination-details/company/${this.companyId}/destination/${this.destination.id}`
      );
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
        this.companyId = arg1.company;
        this.$bind(
          "destination",
          companyCollection
            .doc(arg1.company)
            .collection("destinations")
            .doc(arg1.id)
        );
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

.description {
  h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
  }

  p {
    font-size: 0.85rem !important;
    color: grey;
  }

  ul {
    list-style: disc !important;
    margin: 1em !important;
  }

  ul li {
    margin-left: 1.4em;
  }
}
</style>
