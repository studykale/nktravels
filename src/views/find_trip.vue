<template>
  <div class=" has-background-white w-100 findtrip">
    <Nav />

    <div class=" container">
      <div class="px-3 py-2">
        <div class="flex j-between items-center">
          <h2
            class="mt-2 has-text-weight-semibold is-family-sans-serif has-text-black-bis is-size-4"
          >
            All
          </h2>
          <div class="flex row">
            <button @click="showSearchModal" class="button is-danger is-rounded mr-3">
              <search-icon
                size="1.5x"
                class="has-text-white icon-btn"
              ></search-icon>
              <span class="icon-text">Search</span>
            </button>

            <b-dropdown position="is-bottom-left" aria-role="list">
              <button
                class="button is-light is-rounded"
                slot="trigger"
                
              >
                <filter-icon
                  size="1.5x"
                  
                  class="has-text-primary icon-btn"
                ></filter-icon>
                <span class="icon-text">
                  Filter
                </span>
              </button>

              <b-dropdown-item aria-role="listitem"
                >Camping and Hiking</b-dropdown-item
              >
              <b-dropdown-item aria-role="listitem"
                >Africa Jungle</b-dropdown-item
              >
              <b-dropdown-item aria-role="listitem"
                >Wild Safari</b-dropdown-item
              >
              <b-dropdown-item aria-role="listitem"
                >Beach and Hotels</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </div>

        <hr />
        <div class="flex row wrap">
          <TripCardSmall
            days="2"
            image="https://source.unsplash.com/daily?savanna"
            name="Safari lodge"
            description="Awesome safari lodge awesome description"
          />
          <TripCardSmall
            days="7"
            image="https://source.unsplash.com/daily?savanna"
            name="Safari lodge"
            description="Awesome safari lodge awesome description"
          />
          <TripCardSmall
            days="5"
            image="https://source.unsplash.com/daily?savanna"
            name="Safari lodge"
            description="Awesome safari lodge awesome description"
          />
          <TripCardSmall
            days="2"
            image="https://source.unsplash.com/daily?savanna"
            name="Safari lodge"
            description="Awesome safari lodge awesome description"
          />
          <TripCardSmall
            days="5"
            image="https://source.unsplash.com/daily?savanna"
            name="Safari lodge"
            description="Awesome safari lodge awesome description"
          />
        </div>
      </div>
    </div>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
            <div class="card mx-2">
              <div class="card-content">
                <h2 class="is-family-sans-serif is-size-5 has-text-weight-semibold">

                Search All.
                </h2>
                <hr>
                <b-field>
                  <b-input rounded placeholder="Search..."
                      type="search"
                      size="is-medium"
                      icon-pack="fas"
                      v-model="term"
                      icon="search">
                  </b-input>
                </b-field>
              </div>
            </div>
        </b-modal>
    <FooterClient />
  </div>
</template>

<script>
import Nav from "@/components/utilities/nav.vue";
// import Search from "@/components/utilities/search.vue";
import TripCardSmall from "@/components/customs/trip-card-small.vue";
import FooterClient from "../components/utilities/footer";
import { companyCollection } from "../db";
import { SearchIcon, FilterIcon } from "vue-feather-icons";

export default {
  name: "FindTrip",
  components: {
    Nav,
    SearchIcon,
    TripCardSmall,
    FooterClient,
    FilterIcon
  },
  data() {
    return {
      isCardModalActive: false,
      companies: [],
      destinations: [],
      term: ""
    };
  },
  methods: {
    showSearchModal() {
      console.log("showing", this.isCardModalActive);
      this.isCardModalActive = true;
    }
  },
  created() {
    this.$bind(
      "companies",
      companyCollection.where("archive", "==", false)
    ).then(c => {
      console.log("companies", c);
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
</style>
