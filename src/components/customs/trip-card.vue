<template>
  <div class="card trip">
    <div class="card-image">
      <figure class="image is-4by3">
        <div class="tagWrapper flex">
          <b-tag class="has-background-white has-text-weight-bold mr-2" rounded
            >5 days</b-tag
          >
          <b-tag
            class="has-background-white has-text-weight-bold rating"
            rounded
          >
            <star-icon size="1.5x" class="mr-2 has-text-warning"></star-icon>
            <span>
              <p>4.5</p>
            </span>
          </b-tag>
        </div>
        <img :src="image" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <p class="title is-4">Wild Safari Ride</p>
      <p class="has-text-grey-dark">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        facilis corrupti quidem culpa impedit consequuntur.
      </p>
      <div class="flex items-center mt-4">
        <span class="mr-2">
          <p class="has-text-weight-semibold is-family-sans-serif">Read More</p>
        </span>
        <span>
          <a
            href="#"
            class="is-text-danger mt-5 has-text-weight-semibold is-family-sans-serif"
            ><arrow-right-icon size="2x" class="custom-class"></arrow-right-icon
          ></a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon, StarIcon } from "vue-feather-icons";

export default {
  name: "TripCard",
  components: {
    ArrowRightIcon,
    StarIcon
  },
  props: {
    image: String
  }
};
</script>

<style></style>
