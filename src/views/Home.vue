<template>
  <div class="home">
    <div class="landing-header">
      <div class="nav">
        <NavClient />
      </div>
      <div class="overlay"></div>
      <div class="landing-content">
        <div class="container">
          <div class="columns">
            <div class="column is-two-fifths">
              <h3>Make your next trip to remember way more fun</h3>
              <p class="has-text-white-ter is-size-5">
                Are you hopping to your next trip? Well, Make it more safe and
                memorable by using our trip services.
              </p>
              <b-button
                tag="router-link"
                to="/find-trip"
                class="mt-4 has-text-white is-medium book-btn"
                type="is-primary"
                >Find your trip</b-button
              >
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    </div>
    <section class="landing-header-mobile">
      <div class="nav-m-wrapper">
        <NavClient />
      </div>
      <img src="../assets/van.jpg" alt="NK travels van" />
      <div class="content flex centered f-column has-text-centered">
        <div class="mt-5">
          <h2 class="is-size-5 has-text-white is-family-sans-serif">
            Make your next trip worth another
          </h2>
          <br />
          <p class="has-text-white is-family-primary">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
            fugiat nemo reprehenderit quasi minus porro!
          </p>
          <router-link class="button is-primary mt-4" to="/find-trip"
            >Book a trip</router-link
          >
        </div>
      </div>
    </section>
    <section>
      <div class="container"></div>
    </section>
    <section class="has-background-white pb-6 pt-6">
      <div class="container">
        <div class="columns mx-2">
          <div class="column">
            <h2
              class="has-text-black-ter is-size-3 pb-3 has-text-center-mobile is-capitalized has-text-weight-semibold is-family-sans-serif"
            >
              Our Services
            </h2>
            <div class="divider rounded mb-2"></div>
            <p
              class="has-text-grey-dark has-text-center-mobile is-family-primary"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              consectetur architecto suscipit? Magnam voluptatem accusantium id
              harum quo delectus autem!
            </p>
          </div>
          <div class="column"></div>
        </div>
        <div class="columns mt-5 mx-2">
          <div class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="../assets/care.jpg" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <h4
                  class="has-text-weight-semibold is-size-5  is-family-sans-serif mb-3 has-text-yellow-ter is-capitalized"
                >
                  Awesome support
                </h4>
                <p class="has-text-black-ter is-family-primary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  vitae libero sit sed, eum atque!
                </p>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-image p-3">
                <figure class="image is-4by3">
                  <img src="../assets/zebras.jpg" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content p-3">
                <h4
                  class="has-text-weight-semibold is-size-5  is-family-sans-serif mb-3 has-text-yellow-ter is-capitalized"
                >
                  Captivating
                </h4>
                <p class="has-text-black-ter is-family-primary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  vitae libero sit sed, eum atque!
                </p>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="../assets/beach.jpg" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <h4
                  class="has-text-weight-semibold is-size-5 is-family-sans-serif mb-3 has-text-yellow-ter is-capitalized"
                >
                  Ease and Comfort
                </h4>
                <p class="has-text-black-ter is-family-primary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  vitae libero sit sed, eum atque!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="aboutus mt-3 mb-3 ">
      <div class="container">
        <div class="columns mx-2">
          <div class="column is-two-fifths">
            <h4
              class="is-text-black-ter has-text-weight-semibold is-family-sans-serif is-size-3"
            >
              About Us
            </h4>
            <h5
              class="is-text-black-ter is-family-primary is-size-5-desktop mb-3"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h5>
            <p class="mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium tempore explicabo dolorem ducimus. Magnam, deleniti.
            </p>
            <div class="flex items-center">
              <span class="mr-2">
                <router-link
                  to="/about"
                  class="has-text-weight-semibold is-family-sans-serif"
                >
                  Read More
                </router-link>
              </span>
              <span>
                <a
                  href="#"
                  class="is-text-danger mt-5 has-text-weight-semibold is-family-sans-serif"
                  ><arrow-right-icon
                    size="2x"
                    class="custom-class"
                  ></arrow-right-icon
                ></a>
              </span>
            </div>
          </div>
          <div class="column details">
            <div class="bg-svg"></div>
            <div class="bg-desert"></div>
            <div class="bg-video"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="has-background-white my-3">
      <div class="container">
        <div class="popular-places mx-2">
          <div class="mb-3">
            <h2 class="is-family-sans-serif has-text-weight-semibold is-size-4">
              Popular places
            </h2>
          </div>
          <b-tabs class="mt-3" v-model="activeTab">
            <b-tab-item label="Wild Safari">
              <div class="flex scrollWrapper" v-dragscroll.nochildren.x="true">
                <TripCard :image="tab1Image" />
                <TripCard :image="tab1Image" />
                <TripCard :image="tab1Image" />
                <TripCard :image="tab1Image" />
                <TripCard :image="tab1Image" />
                <TripCard :image="tab1Image" />
              </div>
            </b-tab-item>
            <b-tab-item label="Africa Nature">
              <div class="flex scrollWrapper" v-dragscroll.nochildren.x="true">
                <TripCard :image="tab2Image" />
                <TripCard :image="tab2Image" />
                <TripCard :image="tab2Image" />
                <TripCard :image="tab2Image" />
                <TripCard :image="tab2Image" />
                <TripCard :image="tab2Image" />
              </div>
            </b-tab-item>
            <b-tab-item label="Animal Adventure">
              <div class="flex scrollWrapper" v-dragscroll.nochildren.x="true">
                <TripCard :image="tab3Image" />
                <TripCard :image="tab3Image" />
                <TripCard :image="tab3Image" />
                <TripCard :image="tab3Image" />
                <TripCard :image="tab3Image" />
                <TripCard :image="tab3Image" />
              </div>
            </b-tab-item>
            <b-tab-item label="Jungle Africa">
              <div class="flex scrollWrapper" v-dragscroll.nochildren.x="true">
                <TripCard :image="tab4Image" />
                <TripCard :image="tab4Image" />
                <TripCard :image="tab4Image" />
                <TripCard :image="tab4Image" />
                <TripCard :image="tab4Image" />
                <TripCard :image="tab4Image" />
              </div>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </section>
    <section class="has-background-warning my-3">
      <div class="container">
        <div class="columns mx-2 py-5">
          <div class="column is-two-thirds">
            <h2
              class="has-text-weight-semibold is-family-sans-serif has-text-white is-size-3 mb-4"
            >
              Newsletter
            </h2>
            <p class="mb-2 is-family-primary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
              minus vel odit doloribus quia vero cupiditate itaque sed, quisquam
              tempore quibusdam sequi placeat explicabo culpa ipsa? Eum quas
              quaerat voluptatem.
            </p>
            <b-field class="mt-3">
              <b-input
                placeholder="Enter your email address."
                type="email"
                icon="phone"
              >
              </b-input>
              <p class="control">
                <button class="button is-primary">Contact Us</button>
              </p>
            </b-field>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </section>
    <section class="has-background-black-der main-footer">
      <FooterClient />
    </section>
  </div>
</template>

<script>
import { ArrowRightIcon } from "vue-feather-icons";
import TripCard from "@/components/customs/trip-card.vue";
import { dragscroll } from "vue-dragscroll";
import NavClient from "@/components/utilities/nav.vue";
import FooterClient from "@/components/utilities/footer.vue";

const customIconConfig = {
  customIconPacks: {
    uil: {
      sizes: {
        default: "is-size-5",
        "is-small": "",
        "is-medium": "is-size-3",
        "is-large": "is-size-1"
      },
      iconPrefix: "uil-",
      internalIcons: {
        check: "check",
        information: "information",
        "check-circle": "checkmark-circle",
        alert: "exclamation",
        "alert-circle": "exclamation-circle",
        "arrow-up": "arrow-up",
        "chevron-right": "angle-right",
        "chevron-left": "angle-left",
        "chevron-down": "arrow-down",
        eye: "eye",
        "eye-off": "eye-slash",
        "menu-down": "angle-down",
        "menu-up": "angle-up",
        "close-circle": "times-circle"
      }
    }
  }
};

export default {
  name: "Home",
  components: {
    ArrowRightIcon,
    TripCard,
    NavClient,
    FooterClient
  },
  directives: {
    dragscroll: dragscroll
  },
  data() {
    return {
      activeTab: 0,
      tab1Image: "https://source.unsplash.com/daily?savanna",
      tab2Image: "https://source.unsplash.com/weekly?hiking",
      tab3Image: "https://source.unsplash.com/weekly?forest",
      tab4Image: "https://source.unsplash.com/weekly?jungle"
    };
  },
  created() {
    this.$buefy.config.setOptions(customIconConfig);
  }
};
</script>

<style lang="scss">
.landing-header-mobile {
  position: relative;

  @media screen and (min-width: 520px) {
    display: none;
  }

  .nav-m-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    mix-blend-mode: overlay;
    height: 50vh;
    object-fit: cover;
    object-position: left;
  }

  .content {
    background: #000000a1;
    height: 50vh;
    align-items: center;
    padding: 3em 1em;
  }
}

.landing-header {
  height: calc(100vh - 8rem);
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("../assets/safari.jpg");
  background-size: cover;

  @media screen and (min-width: 520px) {
    background-size: cover;
  }

  @media screen and (max-width: 520px) {
    height: calc(100vh - 4rem);
    display: none;
  }

  .nav {
    position: absolute;
    width: 100%;
  }

  .overlay {
    background: rgba(116, 67, 3, 0.61);
    height: inherit;
    width: 100%;

    @media screen and (max-width: 520px) {
      background: rgba(255, 166, 0, 0.534);
      background-repeat: no-repeat;
    }
  }

  .landing-content {
    position: absolute;
    height: inherit;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 0 2em;

    @media screen and (min-width: 1020px) {
      padding: 0;
    }
  }

  .landing-content h3 {
    font-family: "Montserrat", sans-serif;
    color: white;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.55em;
    text-align: center;

    @media screen and (min-width: 520px) {
      text-align: left;
      font-size: 2.2rem;
    }

    @media screen and (min-width: 720px) {
      text-align: left;
    }
  }

  .landing-content p {
    font-family: "Open sans", sans-serif;
    color: whitesmoke;
    font-size: 1rem;
    text-align: center;

    @media screen and (min-width: 520px) {
      text-align: left;
      font-size: 1.2rem;
    }

    @media screen and (min-width: 720px) {
      text-align: left;
    }
  }

  .landing-content .book-btn {
    @media screen and (max-width: 520px) {
      margin: 10px auto !important;
      display: flex;
    }
  }
}

.divider {
  background: #ffc11e;
  height: 5px;
  width: 20%;
}

.rounded {
  border-radius: 2px;
}

.card {
  &.trip {
    max-width: 320px;
    min-height: 350px;
    min-width: 300px;
    margin-right: 15px;

    .card-image {
      padding: 0;
    }

    .card-image img {
      object-fit: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .card-image figure {
      position: relative;
    }

    .card-image figure .tagWrapper {
      position: absolute;
      z-index: 10;
      top: 10px;
      left: 10px;

      .rating span {
        display: flex;
      }
    }
  }
  border-radius: 10px;

  .card-image {
    padding: 20px;
  }

  .card-image img {
    border-radius: 10px;
    object-fit: cover;
  }
}

.aboutus {
  .columns {
    @media screen and (min-width: 520px) {
      padding: 8em 0;
    }
  }

  .details {
    position: relative;
    height: 600px;

    @media screen and (max-width: 520px) {
      height: 400px;
    }

    .bg-svg {
      background-color: transparent;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23f30c0c' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      height: 250px;
      width: 250px;
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 20px;
      padding: 1em;

      @media screen and(max-width: 520px) {
        top: 0;
        left: 0;
      }
    }

    .bg-video {
      background: url("../assets/team.jpg") no-repeat center;
      background-size: cover;
      height: 150px;
      width: 250px;
      position: absolute;
      top: 0;
      right: 0;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.18);
      border-radius: 10px;
    }

    .bg-desert {
      background: url("../assets/elephant.jpg") center no-repeat;
      background-size: cover;
      height: 400px;
      width: 450px;
      position: absolute;
      top: 15%;
      left: 25%;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.18);
      border-radius: 10px;

      @media screen and (max-width: 520px) {
        display: none;
      }
    }
  }
}

.popular-places {
  padding: 4em 0;
  @media screen and (min-width: 520px) {
    padding: 8em 0;
  }
}

.scrollWrapper {
  padding: 2em 15px;
  overflow: hidden;
}
</style>
