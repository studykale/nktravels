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
          Trips
        </h2>
        <hr />
        <div class="mb-8 columns is-3-desktop is-2-tablet is-multiline">
          <div
            class="column mr-3 is-one-fifth-desktop is-one-third-tablet is-full-mobile"
            v-for="(t, i) in trips"
            :key="i"
          >
            <TripCard :name="t.name" :company="t.company" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TripCard from "@/components/customs/company/trip_card.vue";

export default {
  name: "Home",
  components: {
    TripCard
  },
  data() {
    return {
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
