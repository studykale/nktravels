<template>
  <div class="h-100 w-100 has-background-white">
    <div class="columns">
      <div class="column is-half-desktop is-full-mobile">
        <div class="flex items-center centered">
          <SignUpCard />
        </div>
      </div>
      <div class="column is-half-desktop image">
        <img src="../assets/zebras.jpg" alt="Zebras" />
      </div>
    </div>
  </div>
</template>

<script>
import SignUpCard from "@/components/customs/auth/signup.vue";
export default {
  metaInfo: {
    title: "Admin only"
  },
  components: {
    SignUpCard
  }
};
</script>

<style lang="scss">
.h-100 {
  height: 100vh;
}

.w-100 {
  width: 100%;
}

.image {
  background-color: darkgray;
  padding: 0 !important;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    mix-blend-mode: luminosity;
  }

  @media screen and (max-width: 720px) {
    display: none !important;
  }
}
</style>
