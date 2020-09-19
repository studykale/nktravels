<template>
  <div class="h-100 w-100">
    <div class="columns">
      <div class="column flex items-center">
        <div v-if="authType == 'reset'">
          <ResetPass />
        </div>
        <div v-else-if="authType == 'signup'">
          <SignUp />
        </div>
        <div v-else>
          <SignIn />
        </div>
        <div></div>
      </div>
      <div class="column is-desktop"></div>
    </div>
  </div>
</template>

<script>
import SignIn from "@/components/customs/auth/signin.vue";
import SignUp from "@/components/customs/auth/signup.vue";
import ResetPass from "@/components/customs/auth/resetpass.vue";

export default {
  components: {
    SignIn,
    SignUp,
    ResetPass
  },
  data() {
    return {
      authType: "signin"
    };
  },
  methods: {
    switchAuth(type) {
      if (type == "resetpass") {
        this.authType = "resetpass";
      } else if (type == "signup") {
        this.authType = "signup";
      } else {
        this.authType = "signin";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.h-100 {
  height: 100vh;
}

.w-100 {
  width: 100%;
}
</style>
