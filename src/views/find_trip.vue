<template>
  <div class="h-100 w-100 findtrip">
    <Nav />
    <div class="container">
      <div class="mx-5 mt-5">
        <h2
          class="is-size-4 has-text-white has-text-weight-semibold is-family-sans-serif"
        >
          Book your trip here
        </h2>
      </div>
      <div class="columns mx-3">
        <div class="column is-half-desktop is-half-widescreen is-full-mobile">
          <hr />
          <div class="card mt-5">
            <div class="card-content">
              <form>
                <b-field label="Destination">
                  <b-select placeholder="Where you want to go" required>
                    <option value="flint">Nairobi</option>
                    <option value="silver">Mombasa</option>
                    <option value="silver">Kilifi</option>
                    <option value="silver">Turkana</option>
                  </b-select>
                </b-field>
                <b-field label="Travel Style">
                  <b-select placeholder="Select a character" required>
                    <option value="flint">Flight</option>
                    <option value="silver">Bus</option>
                  </b-select>
                </b-field>
                <b-field label="Select a date">
                  <b-datepicker
                    placeholder="Click to select..."
                    v-model="dates"
                    range
                  >
                  </b-datepicker>
                </b-field>
                <button class="button is-warning" type="submit">
                  Find trip
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/utilities/nav.vue";

export default {
  name: "FindTrip",
  components: {
    Nav
  },
  data() {
    return {
      dates: []
    };
  }
};
</script>

<style lang="scss">
.findtrip {
  background: url("../assets/elephant.jpg") no-repeat center;
  background-blend-mode: screen;
  height: 100vh;
  background-size: cover;
}
</style>
