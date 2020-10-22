<template>
  <div class="container py-5">
    <div class="columns mx-2">
      <div class="column">
        <h2
          class="is-family-sans-serif flex items-center  has-text-weight-semibold mb-4 is-size-5"
        >
          <span class="mr-3">
            <Logo />
          </span>
          NK Travels
        </h2>
        <img
          height="100"
          width="100"
          src="@/assets/lipanampesa.png"
          alt="NK travels lipa na mpesa"
        />
        <br />
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
              Contact Us
            </h4>
            <ul class="mt-3">
              <li>
                Talk to us though
                <span class="ml-2">
                  <a href="tel:0741943157">0741943157</a> or
                  <a href="tel:0757227976">0757227976</a>.
                </span>
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
import Logo from "@/components/utilities/logo.vue";

export default {
  name: "Footer",
  components: {
    FacebookIcon,
    InstagramIcon,
    Logo
  }
};
</script>

<style></style>
