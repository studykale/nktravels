<template>
  <div class="pt-2">
    <div class="container mx-2">
      <h2 class="has-text-weight-semibold is-size-4">
        Add trip
      </h2>
      <hr />
      <TripFormCard />
    </div>
  </div>
</template>

<script>
import TripFormCard from "@/components/customs/company/trip_form.vue";

export default {
  components: {
    TripFormCard
  }
};
</script>

<style></style>
