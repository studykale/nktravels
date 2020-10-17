<template>
  <div class="has-background-white">
    <div class="flex centered content-center 404 container px-3">
      <div class="my-10">
        <div class="flex justify-center mb-5 mt-3">
          <img class="h-48 w-48" src="../assets/404.svg" alt="404 Icon" />
        </div>
        <div class="p-3">
          <h2
            class="text-left is-size-3 has-text-weight-semibold is-family-sans-serif "
          >
            We are sorry something happenend on our end...
          </h2>
          <p class="is-text-grey-dark">
            We might have encountered some headwind.
            <span class="ml-2 inline-block"
              ><img src="../assets/wind.svg" class="h-5" alt="Wind"
            /></span>
          </p>
        </div>
        <div class="mt-3 leading-9 py-3 px-3">
          <h5 class="is-family-primary has-text-weight-semibold is-size-6">
            What could have caused this?.
          </h5>
          <ul>
            <li class="mb-2">
              You tried accessing the dashboard without signing in
            </li>
            <li class="mb-2">You entered a url that does not exist</li>
            <li>
              Your internet might be down. Please check your internet
              connection..
            </li>
          </ul>
        </div>
        <div class="flex justify-start my-5">
          <router-link
            class="px-5 py-3 border border-indigo-300 text-indigo-800 shadow-sm rounded-sm"
            to="/"
            >Go Home</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.h-100 {
  height: 100vh !important;
}

.h-48 {
  height: 300px;
}

.w-48 {
  width: 300px;
}

p img {
  height: 25px;
  width: 25px;
}
</style>
