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
        <img :src="loggedInUser.photoURL" alt="" />
        <div class="p-content mt-3">
          <div>
            <h2 class="has-text-weight-semibold is-size-5">
              {{ loggedInUser.username }}
            </h2>
            <p class="is-size-6 has-text-grey">Administrator</p>
          </div>
          <b-tooltip label="Edit your profile" position="is-top">
            <b-button @click="openModal" class="mt-3">Edit</b-button>
          </b-tooltip>
        </div>
      </div>
      <b-modal
        :active.sync="showModal"
        trap-focus
        aria-role="dialog"
        :destroy-on-hide="true"
        @close="closeModal"
      >
        <div class="card mx-auto">
          <div class="card-header px-2 py-2">
            <h3 class="subtitle">Update profile</h3>
          </div>
          <div class="card-content">
            <form @submit.prevent="updateProfile">
              <div v-if="imageUrl == null">
                <b-upload v-model="file" @input="displayPhoto" drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <upload-cloud-icon size="4x"></upload-cloud-icon>
                      </p>
                      <p>Drop your files here or click to upload</p>
                    </div>
                  </section>
                </b-upload>
              </div>
              <div v-else>
                <img :src="imageUrl" alt="Preview" />
              </div>
              <button
                :disabled="!fileUploaded"
                class="button is-fullwidth is-primary mt-2"
                type="submit"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { UploadCloudIcon } from "vue-feather-icons";
export default {
  name: "Profile",
  components: {
    UploadCloudIcon
  },
  data() {
    return {
      showModal: false,
      file: null,
      fileUploaded: false,
      uploading: false
    };
  },
  methods: {
    ...mapActions("user", ["updateUserProfile"]),
    openModal() {
      if (this.showModal) {
        this.showModal = false;
      } else {
        this.showModal = true;
      }
    },
    updateProfile() {
      let data = {
        type: "photo",
        image: this.file
      };
      this.updateUserProfile(data);
      this.showModal = false;
      this.file = null;
      this.username = "";
      this.fileUploaded = false;
      this.imageUrl = false;
      this.$buefy.toast.open({
        position: "is-top-right",
        message: "We are uploading please wait",
        duration: 5000,
        type: "is-info"
      });
    },
    closeModal() {
      this.imageUrl = null;
      this.file = null;
      this.fileUploaded = null;
      this.$buefy.toast.open("You did not upload the image...");
    },
    displayPhoto(f) {
      if (f.size / (1024 * 1024) < 2) {
        this.fileUploaded = true;
        this.imageUrl = URL.createObjectURL(f);
      } else {
        this.$buefy.toast.open({
          type: "is-warning",
          message: "You file exceeded 3mb"
        });
      }
    }
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.user.user
    })
  }
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 300px;
  margin: auto;
}

.p-card {
  width: 400px;

  @media screen and (max-width: 520px) {
    flex-direction: column;
    width: 300px;

    img {
      margin-bottom: 1em;
      margin-right: 0 !important;
      border-radius: 10px;
      object-fit: cover;
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
