<template>
  <div class="t-card">
    <b-image
      v-if="image"
      ratio="16by9"
      :src="image"
      alt="Beach picture"
    ></b-image>
    <img src="../../../assets/beach.jpg" alt="NK travels trip" v-else />
    <div class="t-content">
      <h2 class="has-text-weight-bold has-text-black-bis">{{ name }}</h2>
      <p class="is-size-7 has-text-grey">{{ company }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TripCard",
  props: {
    name: {
      type: String,
      default: "Trip Card"
    },
    company: {
      type: String,
      default: "Mzizi Travels"
    },
    image: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.t-card {
  min-width: 170px;
  max-width: 250px;
  margin-bottom: 10px;
  padding: 4px;
  transition: all ease-in 200ms;

  &:hover {
    box-shadow: 0 10px 15px #f0f6f4;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  @media screen and (max-width: 480px) {
    margin-right: auto;
  }

  img.rounded {
    border-radius: 10px;
  }

  .t-content {
    padding: 5px;
  }
}
</style>
