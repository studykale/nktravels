<template>
  <div class="c-card">
    <img class="mb-3" src="../../../assets/zebras.jpg" alt="Zebra photo" />
    <div class="c-content mb-2">
      <h3 class="is-family-sans-serif has-text-weight-semibold is-size-5 mb-2">
        Mzima Springs
      </h3>
      <h5
        class="is-family-sans-serif has-text-weight-light is-size-6 mb-1 has-text-primary"
      >
        5 packages
      </h5>
      <p class="has-text-grey-dark is-size-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, velit!
      </p>
    </div>
    <div class="c-foot flex j-right">
      <b-dropdown position="is-top-right" aria-role="list">
        <more-horizontal-icon
          slot="trigger"
          size="1.5x"
          class="has-text-black"
        ></more-horizontal-icon>

        <b-dropdown-item aria-role="listitem">
          <airplay-icon size="1x" class="mr-2 items-center"></airplay-icon>
          <span>
            Unarchive
          </span>
        </b-dropdown-item>
        <b-dropdown-item aria-role="listitem">
          <edit-2-icon size="1x" class="mr-2"></edit-2-icon>
          <span>Edit</span>
        </b-dropdown-item>
        <b-dropdown-item aria-role="listitem">
          <trash-2-icon size="1x" class="mr-2"></trash-2-icon>
          <span>Delete</span>
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import {
  MoreHorizontalIcon,
  AirplayIcon,
  Edit2Icon,
  Trash2Icon
} from "vue-feather-icons";

export default {
  name: "CompanyCard",
  components: {
    MoreHorizontalIcon,
    AirplayIcon,
    Edit2Icon,
    Trash2Icon
  }
};
</script>

<style lang="scss" scoped>
.c-card {
  max-width: 300px;
  height: auto;
  display: inline-flex;
  flex-direction: column;

  img {
    border-radius: 4px;
    object-fit: cover;
    object-position: center;
  }

  .c-content,
  .c-foot {
    padding: 0.3em;
  }
}
</style>
