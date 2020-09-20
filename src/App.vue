<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@700;800&family=Montserrat:wght@400;500&family=Opensans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;600&display=swap");
@import "~bulma/sass/utilities/_all";

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

  &.centered {
    justify-content: center;
  }

  &.j-between {
    justify-content: space-between;
  }
}

.card.max-300 {
  max-width: 320px;
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
$button-color: white;
$input-hover-color: white;
$input-hover-border-color: #ffc11e;
$button-hover-color: #414042;
$input-focus-box-shadow-color: none;
$input-focus-border-color: none;
$radius: 5px;
$card-radius: 10;
$tabs-border-bottom-width: 5px;
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

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
