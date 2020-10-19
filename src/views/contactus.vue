<template>
  <div>
    <Nav></Nav>
    <div class="columns h-100">
      <div
        class="column is-half-desktop is-full-mobile flex items-center centered"
      >
        <ContactForm />
      </div>
      <div class="column is-half-desktop image"></div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/utilities/nav.vue";
import ContactForm from "@/components/utilities/contactform.vue";

export default {
  name: "ContactUs",
  components: {
    Nav,
    ContactForm
  }
};
</script>

<style lang="scss" scoped>
.h-100 {
  height: calc(100vh - 40px);
}

.flex {
  display: flex;

  .centered {
    justify-content: center;
  }

  .items-centered {
    align-items: center;
  }
}

.image {
  background: url("../assets/envelops.jpg") center no-repeat;
  background-size: cover;
  @media screen and (max-width: 720px) {
    display: none !important;
  }
}
</style>
