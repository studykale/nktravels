<template>
  <div class="pt-2">
    <div class="container mx-4">
      <h2 class="has-text-black is-size-5 has-text-weight-semibold">
        Archives
      </h2>
      <hr />
      <CompanyCard />
    </div>
  </div>
</template>

<script>
import CompanyCard from "@/components/customs/company/company_card.vue";

export default {
  name: "Archive",
  components: {
    CompanyCard
  }
};
</script>

<style></style>
