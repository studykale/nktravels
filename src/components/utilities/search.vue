<template>
  <div class="card mx-2">
    <div class="card-content">
      <h2 class="is-family-sans-serif is-size-5 has-text-weight-semibold">
        Search All.
      </h2>
      <hr />
      <b-field>
        <b-input
          autocomplete="off"
          @blur="searchResultsVisible = false"
          rounded
          placeholder="Search..."
          @focus="searchResultsVisible = true"
          @keydown.esc="searchResultsVisible = false"
          @keydown.up.prevent="highlightPrevious"
          @keydown.down.prevent="highlightNext"
          @keyup.native="performSearch"
          @input="softReset"
          ref="search"
          type="search"
          icon-pack="fas"
          v-model="search"
          icon="search"
          @click:append="reset"
        >
        </b-input>
      </b-field>
      <br />
      <!-- Results -->
      <div v-if="search.length > 0" class="searchResults">
        <div class="flex f-column" ref="results">
          <router-link
            v-for="(trip, i) in searchResults"
            :key="i"
            @mousedown.prevent="searchResultsVisible == true"
            :class="{ 'has-background-white-ter': i == highlightedIndex }"
            to="/detail"
            class="flex row px-3 py-2"
          >
            <div class="flex f-column">
              <span class="is-family-sans-serif has-text-black-bis is-size-5">{{
                trip.name
              }}</span>
              <span class="is-family-primary has-text-grey is-size-6">{{
                trip.summary
              }}</span>
              <span class="is-size-7">{{ trip.location }}</span>
            </div>
          </router-link>
        </div>
        <div class="my-1" v-if="searchResults.length === 0">
          <p
            class="has-text-grey has-text-centered is-size-6 has-text-weight-semibold has-text-center"
          >
            No results for <span class="has-text-primary">{{ search }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    dta: Array
  },
  data() {
    return {
      term: "",
      search: "",
      searchResultsVisible: false,
      searchResults: [],
      highlightedIndex: 0,
      options: {
        // shouldSort: true,
        // includeMatches: true,
        // threshold: 0.6,
        // location: 0,
        // distance: 100,
        // maxPatternLength: 32,
        // minMatchCharLength: 3,
        keys: ["category", "name"]
      }
    };
  },
  methods: {
    reset() {
      this.search = "";
    },
    softReset() {
      this.searchResultsVisible = true;
    },
    focusSearch(e) {
      if (e.key === "/") {
        this.$refs.search.focus();
      }
    },
    performSearch() {
      this.$search(this.search, this.dta, this.options).then(results => {
        console.log("performing search", results);
        this.searchResults = results;
      });
    },
    highlightPrevious() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1;
        this.scrollIntoView();
      }
    },
    highlightNext() {
      if (this.highlightedIndex < this.searchResults.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1;
        this.scrollIntoView();
      }
    },
    scrollIntoView() {
      this.$refs.results
        .children(this.highlightedIndex)
        .scrollIntoView({ block: "nearest" });
    }
  }
};
</script>

<style lang="scss" scoped>
.searchResults {
  img {
    border-radius: 5px;
    object-fit: cover;
  }

  &:hover {
    div:first-child a {
      background-color: whitesmoke;
    }
  }
  div {
    padding: 10px 15px;
  }
  div a span:first-child {
    font-size: 1.5rem;
    color: color(green, 4);
    text-decoration: none;
    font-weight: 700;
    display: block;
  }
  div a > span:nth-child(2) {
    font-size: 0.95rem;
    font-weight: light;
    color: whitesmoke;
    padding: 0.65em;
    border-radius: 5px;
    background-color: transparent !important;
  }
  div a > span:nth-child(3) {
    font-weight: normal;
    font-size: 1.1rem;
    color: color(typography, 4);
    h5 {
      font-size: 1.2rem;
      color: color(green, 3);
      margin: 0 !important;
    }
  }
}
</style>
