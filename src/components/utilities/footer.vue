<template>
  <div class="container py-5">
    <div class="columns mx-2">
      <div class="column">
        <h2
          class="is-family-sans-serif  has-text-weight-semibold mb-4 is-size-3"
        >
          NK Travels
        </h2>
        <ul class="flex">
          <li class="mr-2">
            <facebook-icon
              size="1.5x"
              class="has-text-grey-dark"
            ></facebook-icon>
          </li>
          <li>
            <instagram-icon
              size="1.5x"
              class="has-text-grey-dark"
            ></instagram-icon>
          </li>
        </ul>
      </div>
      <div class="column is-two-thirds">
        <div class="columns">
          <div class="column">
            <h4
              class="is-family-sans-serif is-size-5 has-text-grey-dark has-text-weight-semibold"
            >
              Destinations
            </h4>
            <ul class="mt-3">
              <li>
                Camping
              </li>
              <li>
                Hiking
              </li>
              <li>
                Safaris
              </li>
            </ul>
          </div>
          <div class="column">
            <h4
              class="is-family-sans-serif is-size-5 has-text-grey-dark has-text-weight-semibold"
            >
              Contact Us
            </h4>
            <ul class="mt-3">
              <li>
                Talk to us though +254712234345
              </li>
              <li>
                Nairobi Kenya
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FacebookIcon, InstagramIcon } from "vue-feather-icons";

export default {
  name: "Footer",
  components: {
    FacebookIcon,
    InstagramIcon
  }
};
</script>

<style></style>
