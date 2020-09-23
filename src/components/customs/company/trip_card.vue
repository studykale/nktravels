<template>
  <div class="t-card">
    <img class="rounded" src="../../../assets/beach.jpg" alt="Beach picture" />
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
    }
  }
};
</script>

<style lang="scss" scoped>
.t-card {
  min-width: 180px;
  margin-bottom: 10px;

  img {
      border-radius: 10px;
  }

  .t-content {
    padding: 5px;
  }
}
</style>
