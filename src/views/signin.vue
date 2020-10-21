<template>
  <div class="h-100 has-background-white w-100">
    <div class="columns">
      <div class="column is-half-desktop is-full-mobile">
        <div class="flex items-center centered">
          <SignIn />
        </div>
      </div>
      <div class="column is-half-desktop image"></div>
    </div>
  </div>
</template>

<script>
import SignIn from "@/components/customs/auth/signin.vue";

export default {
  metaInfo: {
    title: "Admin signin"
  },
  components: {
    SignIn
  },
  data() {
    return {
      type: "signin"
    };
  }
};
</script>

<style lang="scss" scoped>
.column img {
  object-fit: cover;
  height: 100vh;
  width: 100%;
}

.image {
  background: url("../assets/safari.jpg") center no-repeat;
  background-size: cover;
  @media screen and (max-width: 720px) {
    display: none !important;
  }
}
</style>
