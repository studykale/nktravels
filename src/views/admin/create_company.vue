<template>
  <div class="pt-2">
    <div class="container mx-4">
      <h2 class="has-text-black is-size-5 has-text-weight-semibold">
        Create company
      </h2>
      <hr />
      <CompanyForm />
    </div>
  </div>
</template>

<script>
import CompanyForm from "@/components/customs/company/company_form.vue";

export default {
  name: "CreateCompany",
  components: {
    CompanyForm
  }
};
</script>

<style></style>
