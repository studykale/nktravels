<template>
  <div class="pt-2">
    <div class="container">
      <div class="mx-2 ">
        <div class="header mb-4">
          <img src="../../assets/organize.jpg" alt="Organize work" />
          <div class="content flex f-column has-text-centered items-center">
            <div class="mt-5">
              <h2
                class="has-text-white is-size-3 mb-3 has-text-weight-semibold"
              >
                Organize
              </h2>
              <p class="has-text-white">Organize trips and destinations</p>
            </div>
          </div>
        </div>
        <h2 class="is-size-5 has-text-black-bis has-text-weight-semibold">
          Trips ({{ destinations.length }})
        </h2>
        <hr />
        <div v-if="destinations">
          <div class="mb-8 columns is-3-desktop is-2-tablet is-multiline">
            <div
              class="column is-one-fifth-desktop is-one-third-tablet is-full-mobile"
              v-for="(t, i) in destinations"
              :key="i"
              @click="showDetails(t)"
            >
              <TripCard :name="t.name" :company="t.company" :image="t.image" />
            </div>
          </div>
          <TripDetails />
        </div>
        <div class="flex items-center f-column j-center" v-else>
          <inbox-icon size="4x" class="has-text-warning"></inbox-icon>
          <p class="is-size-4 has-text-weight-light">Empty</p>
          <p>There aren't any destinations yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TripCard from "@/components/customs/company/trip_card.vue";
import { companyCollection } from "../../db";
import TripDetails from "@/components/customs/company/trip_details.vue";
import { InboxIcon } from "vue-feather-icons";

export default {
  name: "Home",
  components: {
    TripCard,
    InboxIcon,
    TripDetails
  },
  data() {
    return {
      open: false,
      companies: [],
      destinations: [],
      trips: [
        {
          name: "Kili",
          company: "Manjaro"
        },
        {
          name: "Njaro",
          company: "Zumi travels"
        },
        {
          name: "Kogo",
          company: "Soho Travels and Sons"
        },
        {
          name: "Limo",
          company: "Zumi travels"
        },
        {
          name: "peru",
          company: "Hillton"
        }
      ]
    };
  },
  methods: {
    setDestinations(c) {
      console.log("c", c);
      c.forEach(company => {
        companyCollection
          .doc(`${company.id}`)
          .collection("destinations")
          .get()
          .then(querySnapshots => {
            querySnapshots.forEach(doc => {
              let destination = doc.data();
              this.destinations.push({
                id: doc.id,
                company: company.name,
                companyId: company.id,
                name: destination.name,
                image: destination.images[0]
              });
            });
          })
          .catch(error => {
            console.log("error", error);
          });
      });
    },
    showDetails(t) {
      console.log("show", t);
      this.$root.$emit("openTripDetails", {
        show: true,
        company: t.companyId,
        id: t.id
      });
    }
  },
  created() {
    this.$bind("companies", companyCollection).then(results => {
      this.setDestinations(results);
    });
  }
};
</script>

<style lang="scss" scoped>
.mb-8 {
  margin-bottom: 4em;
}

.header {
  position: relative;
  height: 200px;
  border-radius: 7px;

  img {
    height: 200px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    mix-blend-mode: overlay;
    object-fit: cover;
    object-position: left;
    border-radius: 7px;
  }

  .content {
    background: #000000a1;
    border-radius: 7px;
    height: 200px;
    align-items: center;
    padding: 3em 1em;
  }
}
</style>
