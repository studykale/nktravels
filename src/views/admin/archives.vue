<template>
  <div class="pt-2">
    <div class="container mx-4">
      <h2 class="has-text-black is-size-5 has-text-weight-semibold">
        Archives
      </h2>
      <hr />
      <div v-if="archives.length > 0" class="flex row wrap">
        <CompanyCard
          :company="company"
          :id="company.id"
          v-for="company in archives"
          :key="company.id"
        />
      </div>
      <div class="flex items-center f-column j-center" v-else>
        <inbox-icon size="4x" class="has-text-warning"></inbox-icon>
        <p class="is-size-4 has-text-weight-light">Empty</p>
        <p>There aren't any archived companies yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyCard from "@/components/customs/company/company_card.vue";
import { companyCollection } from "../../db";
import { InboxIcon } from "vue-feather-icons";

export default {
  name: "Archive",
  components: {
    CompanyCard,
    InboxIcon
  },
  data() {
    return {
      archives: []
    };
  },
  created() {
    this.$bind("archives", companyCollection.where("archive", "==", true));
  }
};
</script>

<style></style>
