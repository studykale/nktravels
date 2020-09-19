<template>
  <b-navbar transparent>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h2 class="logo">
          NK Travels
        </h2>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item class="has-text-weight-bold" href="#">
        Home
      </b-navbar-item>
      <b-navbar-item href="#">
        Gallery
      </b-navbar-item>
      <b-navbar-dropdown label="Features">
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
          <a class="button is-primary">
            <strong>Book</strong>
          </a>
          <a class="button is-light">
            Contact Us
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style lang="scss" scoped>
.navbar {
  background: transparent !important;
  width: inherit;
}

.logo {
  font-weight: bold;
  color: white;
}

.navbar-item {
  @media screen and (min-width: 1024px) {
    color: white !important;
  }
}

.navbar-dropdown {
  .navbar-item {
    color: black !important;
  }
}
</style>
