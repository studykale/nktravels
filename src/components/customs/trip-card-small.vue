<template>
  <div class="trip-card">
    <img :src="image" alt="Image card" />
    <div class="content">
      <h2
        class="has-text-black-bis is-family-sans-serif has-weight-semibold mb-2 is-size-6"
      >
        {{ name }}
      </h2>
      <p class="has-text-grey-bis is-size-7">{{ description }}</p>
      <router-link to="/detail" class="is-size-7">Read more</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TripCardSmall",
  props: ["image", "name", "description"]
};
</script>

<style lang="scss" scoped>
.trip-card {
  max-width: 200px;
  margin: 0.75em;
  border-radius: 5px;
  box-shadow: 0 2px 5px #d4dade;
  transition: all ease 200ms;

  &:hover {
    box-shadow: 0 10px 15px #d4dade;
  }

  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .content {
    padding: 1em;
  }
}
</style>
