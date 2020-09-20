<template>
  <div class="has-background-white h-100 flex centered">
    <div class="container my-4  mx-4">
      <div class="flex centered my-5">
        <Logo />
      </div>
      <ResetPass />
    </div>
  </div>
</template>

<script>
import ResetPass from "@/components/customs/auth/resetpass.vue";
import Logo from "@/components/utilities/logo.vue";

export default {
  components: {
    ResetPass,
    Logo
  }
};
</script>

<style lang="scss">
.h-100 {
  height: 100vh;
}

.mx-auto {
  margin: 0 auto;
}
</style>
