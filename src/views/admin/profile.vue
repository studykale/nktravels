<template>
  <div class="pt-2">
    <div class="container mx-2">
      <h2
        class="has-text-weight-semibold has-text-black-bis is-size-5 is-family-primary"
      >
        Profile
      </h2>
      <hr />
      <div class="p-card flex f-column">
        <img src="../../assets/elephant.jpg" alt="" />
        <div class="p-content mt-3">
          <div>
            <h2 class="has-text-weight-semibold is-size-5">John Doe</h2>
            <p class="is-size-6 has-text-grey">Administrator</p>
          </div>
          <b-tooltip label="Edit your profile" position="is-top">
            <b-button class="mt-3">Edit</b-button>
          </b-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile"
};
</script>

<style lang="scss">
.p-card {
  width: 400px;

  @media screen and (max-width: 520px) {
    flex-direction: column;
    width: 300px;

    img {
      margin-bottom: 1em;
      margin-right: 0 !important;
      border-radius: 10px;
    }
  }
  img {
    margin-right: 1em;
  }

  .p-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px;

    button {
      color: grey;
    }
  }
}
</style>
