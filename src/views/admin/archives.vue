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
      companies: [],
      archives: []
    };
  },
  firestore: {
    companies: companyCollection
  },
  methods: {
    archivedCompanies() {
      return this.companies.find(e => e.archived == true);
    }
  },
  created() {
    this.archives = this.archivedCompanies;
  }
};
</script>

<style></style>
