<template>
  <div class="trip-card">
    <b-image :src="image" ratio="16by9" alt="Image card"></b-image>
    <div class="tagWrapper">
      <b-tag class="has-background-white has-text-weight-bold mr-2" rounded
        >{{ days }} days</b-tag
      >
    </div>
    <div class="content">
      <h2
        class="has-text-black-bis is-family-sans-serif has-weight-semibold mb-2 is-size-6"
      >
        {{ name }}
      </h2>
      <div class="field my-2" v-if="booked">
        <b-tag rounded>Fully Booked</b-tag>
      </div>
      <p class="has-text-grey-bis is-size-6">{{ description }}</p>
      <a @click="getDetails" type="is-link">Read more</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TripCardSmall",
  props: ["image", "name", "description", "days", "booked", "trip"],
  methods: {
    getDetails() {
      this.$router.push({
        path: `/detail/company/${this.trip.companyId}/${this.trip.name}/${this.trip.id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.trip-card {
  max-width: 280px;
  margin: 0.75em;
  border-radius: 5px;
  box-shadow: 0 2px 5px #d4dade;
  transition: all ease 200ms;
  position: relative;

  @media screen and (max-width: 520px) {
    max-width: 290px !important;
    margin: 0.75em auto;
  }

  .tagWrapper {
    position: absolute;
    z-index: 10;
    top: 10px;
    left: 10px;

    .rating span {
      display: flex;
    }
  }

  &:hover {
    box-shadow: 0 10px 15px #d4dade;
  }

  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }

  .content {
    padding: 1em;
  }
}
</style>
