<template>
  <div class="h-100">
    <div class="columns">
      <div class="column has-background-grey-dark">
        <h2 class="has-text-white is-size-2">Side bar</h2>
      </div>
      <div class="column is-three-quarters-desktop is-full-mobile">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout"
};
</script>

<style lang="scss" scoped>
.h-100 {
  height: 100vh;
}
</style>
