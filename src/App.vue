<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "NK travel safaris",
    titleTemplate: "%s | NK"
  }
};
</script>

<style lang="scss">
// @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@700;800&family=Montserrat:wght@400;500&family=Opensans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;600&display=swap");
@import "~bulma/sass/utilities/_all";

html {
  padding-bottom: -2em;
}

body {
  margin-bottom: -2em !important;
}

.header-title {
  font-family: "Fira Sans", sans-serif;
}

.title {
  font-family: "Montserrat", sans-serif;
}

.flex {
  display: flex;

  &.items-center {
    align-items: center;
  }

  &.row {
    flex-direction: row;
  }

  &.column {
    flex-direction: column;
  }

  &.f-column {
    flex-direction: column;
  }

  &.centered {
    justify-content: center;
  }

  &.j-between {
    justify-content: space-between;
  }

  &.j-right {
    justify-content: flex-end;
  }

  &.wrap {
    flex-wrap: wrap;
  }
}

.has-shadow {
  box-shadow: 0 10 15px rgba(0, 0, 0, 0.25);
}

.card.max-300 {
  max-width: 320px;
}

.mx-a {
  margin: 0 auto;
}

// Set your colors
$primary: #ffa776;
$danger: #ff685e;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$family-sans-serif: "Montserrat", sans-serif;
$family-primary: "Open sans", sans-serif;
$weight-bold: 800;
$weight-semibold: 700;
$input-shadow: none;
$button-shadow: none;
$input-background-color: #fff;
$button-focus-box-shadow-color: none;
$body-background-color: #fafaf2;
$button-border-color: none;
$button-hover-border-color: none;
$input-hover-color: white;
$input-hover-border-color: #ffc11e;
$button-hover-color: #414042;
$input-focus-box-shadow-color: none;
$input-focus-border-color: none;
$radius: 5px;
$card-radius: 10;
$tabs-border-bottom-width: 5px;
$size-normal: 0.85rem;
$sidebar-width: 350px;
$sidebar-background: #ffffff;
// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

.has-text-center {
  text-align: center;
}

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
