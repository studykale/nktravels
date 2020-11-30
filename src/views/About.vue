<template>
  <div>
    <NavClient />
    <div class="my-4">
      <div class="container mx-a">
        <div class="mx-4">
          <h2
            class="has-text-weight-semibold is-family-sans-serif my-3 is-size-4"
          >
            Why Choose Us?
          </h2>
          <p class="w-75">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            eveniet sapiente consequuntur aperiam aspernatur neque provident?
            Accusantium, expedita quos enim est ducimus voluptatibus magni odio,
            illo praesentium excepturi iure. Accusantium!
          </p>
          <p class="my-3 w-75">
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
                style="object-position: top"
                src="../assets/team1.jpg"
                alt="Team one"
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
          <p class="my-3 w-75">
            The Safaris team is never left behind, we have fun by going out,
            eating out. We believe in building teamwork from the great outdoors.
          </p>
          <masonry
            :cols="{ default: 4, 1000: 3, 700: 2, 400: 1 }"
            :gutter="{ default: '30px', 700: '15px' }"
          >
            <div class="card">
              <div class="card-content">
                <img src="../assets/rhino.jpeg" alt="Rhino" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/team5.jpeg" alt="Team five" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/van.jpg" alt="Forest" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/team4.jpg" alt="Jungle" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/team3.jpg" alt="Safari" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/team2.jpg" alt="Forest" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/man.jpeg" alt="Desert" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/team.jpeg" alt="The team" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/nissan.jpeg" alt="Nissan" />
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <img src="../assets/birds.jpeg" alt="Nissan" />
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

.w-75 {
  width: 75%;

  @media screen and (max-width: 520px) {
    width: 100%;
  }
}

.team {
  height: 400px;

  img {
    height: calc(400px - 3rem);
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
