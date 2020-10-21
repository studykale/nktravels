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
      <b-navbar-item href="tel:+254757227976">
        <span>
          <phone-call-icon
            size="1x"
            class="has-text-success mr-1"
          ></phone-call-icon>
        </span>
        Call Us
      </b-navbar-item>
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
import { PhoneCallIcon } from "vue-feather-icons";

export default {
  name: "Nav",
  components: {
    PhoneCallIcon
  },
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
