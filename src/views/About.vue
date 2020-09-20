<template>
  <div>
    <NavClient :type="primary" />
    <div class="my-4">
      <div class="container mx-a">
        <div class="mx-4">
          <h2
            class="has-text-weight-semibold is-family-sans-serif my-3 is-size-4"
          >
            Why Choose Us?
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            eveniet sapiente consequuntur aperiam aspernatur neque provident?
            Accusantium, expedita quos enim est ducimus voluptatibus magni odio,
            illo praesentium excepturi iure. Accusantium!
          </p>
          <p class="my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            beatae eius quibusdam odio praesentium minus, dolorem libero hic
            consequuntur ratione dicta repellendus ipsam, cum vel velit
            similique. Pariatur dolor provident, eius optio quae tempora, nemo
            beatae quisquam officiis voluptatibus, vel nesciunt odio! Distinctio
            maiores perspiciatis recusandae quam asperiores deserunt quod!
          </p>
          <br />
          <div class="card team">
            <div class="card-content">
              <img
                src="https://source.unsplash.com/weekly?guides"
                alt="Water"
              />
            </div>
          </div>
          <br />
          <h2
            id="gallery"
            class="my-5  is-family-sans-serif has-text-weight-semibold is-size-4"
          >
            Our Gallery
          </h2>
          <p class="my-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
            laboriosam voluptate ex id omnis numquam modi, asperiores error
            officiis repellat?
          </p>
          <masonry
            :cols="{ default: 4, 1000: 3, 700: 2, 400: 1 }"
            :gutter="{ default: '30px', 700: '15px' }"
          >
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/weekly?water"
                  alt="Water"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/weekly?beach"
                  alt="Beach"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/weekly?forest"
                  alt="Forest"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/weekly?jungle"
                  alt="Jungle"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/weekly?safari"
                  alt="Safari"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/daily?forest"
                  alt="Forest"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/weekly?desert"
                  alt="Desert"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/weekly?mountains"
                  alt="skiing"
                />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img
                  src="https://source.unsplash.com/weekly?pyramids"
                  alt="Egypt"
                />
              </div>
            </div>
          </masonry>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavClient from "@/components/utilities/nav.vue";

export default {
  components: {
    NavClient
  }
};
</script>

<style lang="scss" scoped>
.columns img {
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}

.card {
  margin: 0.75em 0;
}

.h-25 {
  height: 25%;
}

.h-50 {
  height: 50%;
}

.team {
  height: 300px;

  img {
    height: calc(300px - 3rem);
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
