<template>
  <div class=" has-background-white w-100 findtrip">
    <Nav />

    <div v-if="!loadingDestinations" class=" container">
      <b-carousel>
        <b-carousel-item>
          <header>
            <img src="../assets/honeymoon.jpg" alt="NK travel safaris ads" />
            <div class="content flex f-column has-text-centered items-center">
              <div class="mt-5">
                <h2
                  class="has-text-white is-size-3 mb-3 has-text-weight-semibold is-family-sans-serif"
                >
                  Honey Moon
                </h2>
                <p class="has-text-white">Organize trips and destinations</p>
              </div>
            </div>
          </header>
        </b-carousel-item>
        <b-carousel-item>
          <header>
            <img src="../assets/camping.jpg" alt="NK travel safaris ads" />
            <div class="content flex f-column has-text-centered items-center">
              <div class="mt-5">
                <h2
                  class="has-text-white is-size-3 mb-3 has-text-weight-semibold is-family-sans-serif"
                >
                  Camping
                </h2>
                <p class="has-text-white">
                  Get closer to nature with awesome camping deals.
                </p>
              </div>
            </div>
          </header>
        </b-carousel-item>
        <b-carousel-item>
          <header>
            <img src="../assets/wildsafari.jpg" alt="NK travel safaris ads" />
            <div class="content flex f-column has-text-centered items-center">
              <div class="mt-5">
                <h2
                  class="has-text-white is-size-3 mb-3 has-text-weight-semibold is-family-sans-serif"
                >
                  Wild Safari
                </h2>
                <p class="has-text-white">
                  Experience the wild chase and grazing elephants not forgeting
                  the fantastic night sky with blazing stars.
                </p>
              </div>
            </div>
          </header>
        </b-carousel-item>
      </b-carousel>
      <div class="px-3 py-2">
        <div class="flex j-between items-center">
          <h2
            class="mt-2 has-text-weight-semibold is-family-sans-serif has-text-black-bis is-size-4"
          >
            All
          </h2>
          <div class="flex row">
            <button
              @click="showSearchModal"
              class="button is-danger is-rounded mr-3"
            >
              <search-icon
                size="1.5x"
                class="has-text-white icon-btn"
              ></search-icon>
              <span class="icon-text">Search</span>
            </button>

            <b-dropdown
              position="is-bottom-left"
              append-to-body
              aria-role="menu"
            >
              <button class="button is-light is-rounded" slot="trigger">
                <filter-icon
                  size="1.5x"
                  class="has-text-primary icon-btn"
                ></filter-icon>
                <span class="icon-text">
                  Filter
                </span>
              </button>

              <b-dropdown-item custom aria-role="menuitem">
                <span class="has-text-weight-semibold">Category</span>
              </b-dropdown-item>
              <hr class="dropdown-divider" />

              <b-dropdown-item aria-role="listitem">Honey moon</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Camping</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Safari</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Hiking</b-dropdown-item>
              <hr class="dropdown-divider" aria-role="menuitem" />
              <b-dropdown-item aria-role="listitem">
                <span>Price</span>
              </b-dropdown-item>
              <b-dropdown-item value="logout" aria-role="menuitem">
                Number of days.
              </b-dropdown-item>
            </b-dropdown>

            <!-- <b-dropdown position="is-bottom-left" aria-role="list">
              <button class="button is-light is-rounded" slot="trigger">
                <filter-icon
                  size="1.5x"
                  class="has-text-primary icon-btn"
                ></filter-icon>
                <span class="icon-text">
                  Filter
                </span>
              </button>
              <b-dropdown-item aria-role="listitem">Category</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">No of days</b-dropdown-item>
              <b-dropdown-item aria-role="listitem">Location</b-dropdown-item>
            </b-dropdown> -->
          </div>
        </div>
        <hr />
        <div class="flex row wrap">
          <TripCardSmall
            v-for="dest in destinations"
            :key="dest.id"
            :days="dest.days || 1"
            :name="dest.name"
            :trip="dest"
            :image="
              dest.images[0] || 'https://source.unsplash.com/weekly?hiking'
            "
            :description="dest.summary || 'Destination summary not set.'"
          />
        </div>
      </div>
    </div>
    <div class="flex items-centered f-column centered py-4 h-100" v-else>
      <img src="../assets/logo.png" height="100" width="100" alt="" />
      <p class="is-family-sans-serif">Loading...</p>
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <Search :dta="destinations" />
    </b-modal>
    <FooterClient />
  </div>
</template>

<script>
import Nav from "@/components/utilities/nav.vue";
import Search from "@/components/utilities/search.vue";
import TripCardSmall from "@/components/customs/trip-card-small.vue";
import FooterClient from "../components/utilities/footer";
import { companyCollection } from "../db";
import { SearchIcon, FilterIcon } from "vue-feather-icons";
// import { sortBy } from "lodash";

export default {
  name: "FindTrip",
  components: {
    Nav,
    SearchIcon,
    TripCardSmall,
    FooterClient,
    FilterIcon,
    Search
  },
  data() {
    return {
      loadingDestinations: false,
      isCardModalActive: false,
      companies: [],
      destinations: [],
      sortedDestinations: [],
      term: "",
      keys: ["company", "name", "location", "tags"]
    };
  },
  methods: {
    showSearchModal() {
      this.isCardModalActive = true;
    },
    destinationsChanged() {
      console.log("updated");
    },
    setDestinations(c) {
      this.loadingDestinations = true;
      c.forEach(company => {
        // console.log("company", company);
        companyCollection
          .doc(`${company.id}`)
          .collection("destinations")
          .get()
          .then(querySnapshots => {
            this.loadingDestinations = false;
            console.log("queried");
            if (querySnapshots.empty) {
              console.log("empty trips");
            } else {
              querySnapshots.forEach(doc => {
                let destination = doc.data();
                console.log("data", destination);

                this.destinations.push({
                  id: doc.id,
                  company: company.name,
                  companyId: company.id,
                  ...destination
                });
              });
            }
          })
          .catch(error => {
            this.loadingDestinations = false;
            this.$buefy.snackbar.open({
              position: "is-top-right",

              message:
                "Sorry we were unable tomload all trips. " + error.message
            });
          });
      });
    }
  },
  created() {
    this.$bind(
      "companies",
      companyCollection.where("archived", "==", false)
    ).then(c => {
      this.setDestinations(c);
    });
  }
};
</script>

<style lang="scss">
.h-100 {
  height: calc(100vh - 40px);
  overflow: hidden;
}

.trips {
  height: auto !important;
}

.icon-btn {
  margin-right: 0.73em;

  @media screen and (max-width: 520px) {
    margin: 0;
  }
}

.icon-text {
  @media screen and (max-width: 520px) {
    display: none;
  }
}

.overflow-scroll {
  overflow-y: scroll;
}

.findtrip {
  background-blend-mode: screen;
  min-height: 100vh;
  background-size: cover;
}

.items-centered {
  align-items: center !important;
}

header {
  position: relative;
  height: 350px;
  border-radius: 7px;

  @media screen and (max-width: 640px) {
    margin: 0 1em;
  }

  img {
    height: 350px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    mix-blend-mode: overlay;
    object-fit: cover;

    object-position: bottom;
    border-radius: 7px;
  }

  .content {
    justify-content: center;
    background: #000000a1;
    border-radius: 7px;
    height: 350px;
    align-items: center;
    padding: 3em 1em;
  }
}
</style>
