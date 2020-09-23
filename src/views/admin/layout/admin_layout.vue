<template>
  <div class="h-100">
    <div class="w-100 has-background-light py-2 px-5 is-hidden-mobile">
      <div class="container flex j-right">
        <div class="nav-admin flex items-center">
          <div class="mr-8">
            <b-tooltip
              type="is-dark"
              label="Add new destination"
              :delay="1000"
              position="is-bottom"
            >
              <plus-icon
                @click="goto('add-trip')"
                size="1.5x"
                class="mr-3"
              ></plus-icon>
            </b-tooltip>
            <b-tooltip
              type="is-dark"
              label="Search destinations"
              :delay="1000"
              position="is-bottom"
            >
              <search-icon
                @click="goto('search')"
                size="1.5x"
                class="mr-3"
              ></search-icon>
            </b-tooltip>
          </div>
          <b-dropdown aria-role="list" position="is-bottom-left">
            <user-icon size="1.5x" slot="trigger" role="button"></user-icon>
            <b-dropdown-item @click="goto('profile')" aria-role="listitem"
              >Edit profile</b-dropdown-item
            >
            <b-dropdown-item
              @click="goto('create-company')"
              aria-role="listitem"
              >Add company</b-dropdown-item
            >
            <b-dropdown-item @click="goto('settings')" aria-role="listitem"
              >Settings</b-dropdown-item
            >
            <b-dropdown-item @click="logout" aria-role="listitem"
              >Log Out</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </div>
    <div class="columns">
      <div
        class="column px-5 py-5 has-background-grey-dark is-hidden-mobile is-one-quarter-desktop is-one-quarter-tablet"
      >
        <div class="slinks-wrapper flex f-column">
          <div class="side-top flex f-column">
            <router-link
              to="dashboard"
              class="side-link flex items-center active"
            >
              <span class="flex icon"
                ><home-icon size="1.5x" class="custom-class"></home-icon
              ></span>
              <span class="ml-3">Trips</span>
            </router-link>
            <router-link to="archives" class="side-link mt-3 flex items-center">
              <span class="flex"
                ><archive-icon size="1.5x" class="custom-class"></archive-icon
              ></span>
              <span class="ml-3">Archive</span>
            </router-link>
            <router-link
              to="manage-companies"
              class="side-link mt-3 flex items-center"
            >
              <span class="flex"
                ><users-icon size="1.5x" class="custom-class"></users-icon
              ></span>
              <span class="ml-3">Manage users</span>
            </router-link>
          </div>
          <div class="side-bottom flex f-column">
            <small class="has-text-grey-light">Account</small>
            <router-link to="profile" class="side-link flex items-center">
              <span class="flex"
                ><user-icon size="1.5x" class="custom-class"></user-icon
              ></span>
              <span class="ml-3">Profile</span>
            </router-link>
            <router-link to="settings" class="side-link mt-3 flex items-center">
              <span class="flex"
                ><settings-icon size="1.5x" class="custom-class"></settings-icon
              ></span>
              <span class="ml-3">Settings</span>
            </router-link>
            <button class="mt-3 flex items-center">
              <span class="mr-3 flex"
                ><log-out-icon
                  size="1.5x"
                  class="has-text-primary"
                ></log-out-icon
              ></span>
              <span class="has-text-primary">Log Out</span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="column has-background-white is-three-quarters-desktop is-full-mobile is-three-quarters-tablet px-5 main-content"
      >
        <menu-icon
          size="1.5x"
          @click="openSide = !openSide"
          class="has-text-grey-dark my-4 is-hidden-tablet"
        ></menu-icon>
        <b-sidebar fullheight type="is-light" v-model="openSide">
          <div class="px-5 py-5">
            <b-menu>
              <b-menu-list label="Menu">
                <b-menu-item
                  @click="goto('/admin/add-trip')"
                  icon="information-outline"
                  label="Add new Trip"
                ></b-menu-item>
                <b-menu-item
                  @click="goto('/admin/create-company')"
                  icon="information-outline"
                  label="Create company"
                ></b-menu-item>
                <b-menu-item
                  @click="goto('/admin/trips')"
                  icon="information-outline"
                  label="Trips"
                ></b-menu-item>
                <b-menu-item
                  @click="goto('/admin/archives')"
                  icon="information-outline"
                  label="Archives"
                ></b-menu-item>
                <b-menu-item
                  @click="goto('/admin/manage-destinations')"
                  icon="information-outline"
                  label="Manage Users"
                ></b-menu-item>
              </b-menu-list>
              <b-menu-list label="Actions">
                <b-menu-item
                  @click="goto('/admin/profile')"
                  label="Profile"
                ></b-menu-item>
                <b-menu-item
                  @click="goto('/admin/settings')"
                  label="Settings"
                ></b-menu-item>
                <b-menu-item @click="logout" label="Logout"></b-menu-item>
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MenuIcon,
  LogOutIcon,
  SettingsIcon,
  HomeIcon,
  UserIcon,
  ArchiveIcon,
  UsersIcon,
  PlusIcon,
  SearchIcon
} from "vue-feather-icons";

export default {
  name: "Layout",
  components: {
    MenuIcon,
    HomeIcon,
    PlusIcon,
    SearchIcon,
    ArchiveIcon,
    UsersIcon,
    UserIcon,
    SettingsIcon,
    LogOutIcon
  },
  data() {
    return {
      openSide: false
    };
  },
  methods: {
    goto(link) {
      if (link) {
        this.$router.push(link);
      }
      if (this.openSide) this.openSide = false;
    },
    logout() {
      console.log("logged out");
    }
  }
};
</script>

<style lang="scss" scoped>
.w-100 {
  margin-bottom: 0.75em;
}
.h-25 {
  height: 25px;
  width: 100%;
}

.h-100 {
  overflow: hidden;
  height: 100vh;
  width: 100%;
}

.columns {
  .main-content {
    overflow: scroll;
    height: calc(100vh + 0.75em);
  }
}

.slinks-wrapper {
  height: calc(100% - 8.25em);
  justify-content: space-between;
  width: 80%;
  margin-left: auto;

  .side-bottom {
    margin-top: auto;

    small {
      margin-left: 0.85em;
      margin-bottom: 1em;
    }

    button {
      padding: 0.75em;
      text-align: left;
      border-radius: 5px;
      outline: none;
      border: none;
    }
  }

  .side-link {
    margin: 2px 0;
    padding: 2.5px 10px;

    .icon {
      margin: 0.25em;
    }

    &.active {
      border-radius: 5px;
      color: #ffd20b;
      background: rgba(0, 0, 0, 0.308);
    }

    &:hover {
      color: whitesmoke;
      border-radius: 5px;
      transition: all ease-in-out 200ms;
    }
  }
}
</style>
