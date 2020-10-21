<template>
  <div class="h-100 has-background-white -mb-2">
    <div class="flex h-100 f-column items-center centered">
      <award-icon size="4x" class="has-text-success"></award-icon>
      <br />
      <h2 class="is-family-sans-serif is-size-3">Booking was successful.</h2>
      <p class="has-text-center">
        Thank you for booking your Holiday with us. For any assistance feel free
        to call us.
      </p>
      <router-link class="button is-success mt-4" to="/find-trip"
        >Find more trips</router-link
      >
    </div>
  </div>
</template>

<script>
import { AwardIcon } from "vue-feather-icons";
export default {
  components: {
    AwardIcon
  }
};
</script>

<style lang="scss" scoped>
.-mb-2 {
  margin-bottom: -2em;
}

.h-100 {
  height: 100vh;
}
</style>
