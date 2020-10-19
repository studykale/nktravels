<template>
  <b-navbar transparent :type="type">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h2 class="logo">
          NK Travels
        </h2>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/about">
        About Us
      </b-navbar-item>
      <b-navbar-item tag="router-link" to="/about#gallery">
        Gallery
      </b-navbar-item>
      <b-navbar-dropdown hoverable arrowless boxed label="Features">
        <b-navbar-item href="#">
          Honey Moon
        </b-navbar-item>
        <b-navbar-item href="#">
          Safaris
        </b-navbar-item>
        <b-navbar-item href="#">
          Hotels
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link to="/find-trip" class="button is-primary">
            <strong>Find your trip</strong>
          </router-link>
          <router-link to="/contactus" class="button is-light">
            Contact Us
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Nav",
  props: {
    type: String,
    blacken: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: inherit;
}

.logo {
  font-weight: bold;
}
</style>
