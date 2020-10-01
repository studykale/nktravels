<template>
  <div class="h-100 w-100 findtrip">
    <Nav />
    <div class="columns h-100 overflow-hidden">
      <div
        class="column is-full-mobile is-one-quarter-tablet has-background-white"
      >
        <div class="search px-3 py-3">
          <Search />
        </div>
      </div>
      <div
        class="column is-full-mobile is-three-quarters-desktop overflow-scroll"
      >
        <div class="px-3 py-2">
          <h2
            class="mt-2 has-text-weight-semibold is-family-sans-serif has-text-black-bis is-size-4"
          >
            Destinations
          </h2>
          <hr />
          <div class="flex row wrap">
            <TripCardSmall
              image="https://source.unsplash.com/daily?savanna"
              name="Safari lodge"
              description="Awesome safari lodge awesome description"
            />
            <TripCardSmall
              image="https://source.unsplash.com/daily?savanna"
              name="Safari lodge"
              description="Awesome safari lodge awesome description"
            />
            <TripCardSmall
              image="https://source.unsplash.com/daily?savanna"
              name="Safari lodge"
              description="Awesome safari lodge awesome description"
            />
            <TripCardSmall
              image="https://source.unsplash.com/daily?savanna"
              name="Safari lodge"
              description="Awesome safari lodge awesome description"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/utilities/nav.vue";
import Search from "@/components/utilities/search.vue";
import TripCardSmall from "@/components/customs/trip-card-small.vue";

import { companyCollection } from "../db";

export default {
  name: "FindTrip",
  components: {
    Nav,
    Search,
    TripCardSmall
  },
  data() {
    return {
      companies: [],
      destinations: []
    };
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

.overflow-scroll {
  overflow-y: scroll;
}

.findtrip {
  background-blend-mode: screen;
  height: 100vh;
  background-size: cover;
}
</style>
