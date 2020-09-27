<template>
  <div class="mb-7">
    <form @submit.prevent="createCompany">
      <div class="columns">
        <div class="column is-one-half-tablet is-full-mobile">
          <b-field
            label="Company name"
            :message="nameErrors"
            :type="{ 'is-danger': nameErrors.length > 0 }"
          >
            <b-input
              type="text"
              placeholder="Enter company name."
              required
              v-model.trim="$v.name.$model"
            >
            </b-input>
          </b-field>
          <h2 class="is-size-7 has-text-weight-semibold mb-3">Description</h2>
          <ckeditor
            :editor="editor"
            v-model="description"
            :config="editorConfig"
          ></ckeditor>
          <b-field
            class="mt-3"
            label="Email"
            :message="emailErrors"
            :type="{ 'is-danger': emailErrors.length > 0 }"
          >
            <b-input
              type="email"
              placeholder="Enter company email."
              required
              v-model.trim="$v.email.$model"
            >
            </b-input>
          </b-field>
          <b-field label="Contact Info">
            <b-input
              type="text"
              placeholder="Enter company contact info."
              required
              v-model.trim="contactInfo"
            >
            </b-input>
          </b-field>
          <b-field label="Location">
            <b-input
              type="text"
              placeholder="Enter company location"
              required
              v-model.trim="location"
            >
            </b-input>
          </b-field>
          <b-field
            label="Website"
            :message="websiteErrors"
            :type="{ 'is-danger': websiteErrors.length > 0 }"
          >
            <b-input
              type="text"
              placeholder="Enter company website url."
              required
              v-model.trim="$v.website.$model"
            >
            </b-input>
          </b-field>
        </div>
        <div class="column is-one-half-desktop is-full-mobile">
          <b-field v-if="imageUrl == null">
            <b-upload v-model="companyProfile" @input="displayPhoto" drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <upload-cloud-icon
                      size="3x"
                      class="custom-class"
                    ></upload-cloud-icon>
                  </p>
                  <p>Drop company photo here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </b-field>
          <div class="flex f-column" v-else>
            <div v-if="uploadingImage" class="my-2">
              <b-progress v-if="uploadingImage" size="is-small"></b-progress>
            </div>
            <div v-else>
              <edit-3-icon @click="deleteImage" size="1.5x"></edit-3-icon>
              <img class="preview" :src="imageUrl" alt="Preview" />
            </div>
          </div>
        </div>
      </div>
      <button
        :disabled="uploadingImage"
        class="button is-warning is-light"
        type="submit"
        :class="{ 'is-loading': isSubmitting }"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { UploadCloudIcon, Edit3Icon } from "vue-feather-icons";

const {
  required,
  minLength,
  email,
  maxLength,
  url
} = require("vuelidate/lib/validators");
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  storageRef,
  TaskState,
  TaskEvent,
  Timestamp,
  companyCollection
} from "../../../db";

export default {
  name: "CompanyForm",
  mixins: [validationMixin],
  components: {
    UploadCloudIcon,
    Edit3Icon
  },
  data() {
    return {
      companyProfile: "",
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "fontSize",
          "bulletedList",
          "numberedList",
          "blockQuote"
        ],
        fontSize: {
          options: ["tiny", "default", "big"]
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph"
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1"
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2"
            }
          ]
        }
      },
      name: "",
      description: "<p>Company description.</p>",
      location: "",
      email: "",
      website: "",
      contactInfo: "",
      fileUploaded: false,
      uploadingImage: null,
      imageUrl: null,
      uploadImage: null,
      imageName: null,
      isSubmitting: false
    };
  },
  methods: {
    createCompany() {
      let data = {
        name: this.name,
        description: this.description,
        location: this.location,
        contact: this.contactInfo,
        website: this.website,
        email: this.email,
        imageUrl: this.uploadImage,
        archived: false,
        created: Timestamp.now()
      };

      this.isSubmitting = true;

      companyCollection
        .add(data)
        .then(result => {
          this.isSubmitting = false;
          console.log("company", result);
          this.$router.push("/admin/manage-companies");
        })
        .catch(error => {
          this.isSubmitting = false;
          console.log("error", error);
          this.$buefy.snackbar.open({
            message: "Company creation failed.",
            type: "is-danger"
          });
        });
    },
    displayPhoto(f) {
      if (f.size / (1024 * 1024) < 2) {
        this.imageName = f.name;
        this.fileUploaded = true;
        this.uploadingImage = true;
        this.imageUrl = URL.createObjectURL(f);
        this.uploadFiles(f, "company")
          .then(result => {
            this.uploadingImage = false;
            this.uploadImage = result;
          })
          .catch(error => {
            console.log("error", error);
            this.uploadingImage = false;
            this.$buefy.snackbar.open(
              "We were unable to upload the company photo. Please try again or contact customer support"
            );
          });
      } else {
        this.$buefy.toast.open({
          type: "is-warning",
          message: "You file exceeded 3mb"
        });
      }
    },
    deleteImage() {
      let deleteRef = storageRef.child(`company/${this.imageName}`);
      deleteRef
        .delete()
        .then(() => {
          this.imageUrl = null;
          this.uploadImage = null;
        })
        .catch(error => {
          console.log("error", error);
          this.$buefy.snackbar.open(
            `Sorry we could not delete the company photo. Please try again.`
          );
        });
    },
    uploadFiles(file, dir) {
      // let progress, status;
      return new Promise((resolve, reject) => {
        let uploadTask = storageRef
          .child(`${dir}/${file.name}`)
          .put(file, { contentType: file.type });

        uploadTask.on(
          TaskEvent.STATE_CHANGED,
          snapshot => {
            this.uploadProgess =
              snapshot.bytesTransferred / snapshot.totalBytes;
            // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // //('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case TaskState.PAUSED: // or 'paused'
                // //('Upload is paused');
                break;
              case TaskState.RUNNING: // or 'running'
                // //('Upload is running');
                break;
              case TaskState.SUCCESS:
                // status = "complete";
                break;
            }
          },
          error => {
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                // //("You dont have permmission")
                error = "unauthorized";
                reject(new Error("No permission"));
                break;

              case "storage/canceled":
                // User canceled the upload
                // //("error cancelled")
                error = "cancelled";
                reject(new Error("Process cancelled"));
                break;

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                error = "Error occurred";
                reject(new Error("Error occured. Unknown"));
                // //("error unknown")

                break;
            }
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
              // //("url", url)
              resolve(url);
              // //("files", filesUrl)
            });
          }
        );
      });
    }
  },
  validations: {
    name: {
      required,
      min: minLength(3),
      max: maxLength(15)
    },
    description: {
      required,
      max: maxLength(500)
    },
    email: {
      email,
      required
    },
    website: {
      url
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) {
        return errors;
      } else if (!this.$v.email.email) {
        errors.push("Please enter a valid email address");
      } else if (!this.$v.email.required) {
        errors.push("Email is required");
      }
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }

      return errors;
    },
    websiteErrors() {
      const errors = [];
      if (!this.$v.website.$dirty) {
        return errors;
      }

      if (!this.$v.website.url) {
        errors.push("Please enter a valid url");
      }
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      if (!this.$v.name.required) {
        errors.push("Please enter a company name.");
      }
      if (!this.$v.name.min) {
        errors.push("Company name is too short.");
      }

      if (!this.$v.name.max) {
        errors.push("Company name is too long");
      }

      return errors;
    }
  }
};
</script>

<style lang="scss" scoped>
.ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
.ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
  font-size: small !important;
}

.ck-content .text-tiny {
  font-size: 0.7em;
}

.ck-content .text-small {
  font-size: 0.85em;
}

.ck-content .text-big {
  font-size: 1.4em;
}

.ck-content .text-huge {
  font-size: 1.8em;
}

.mb-7 {
  margin-bottom: 4em;
}

.ck-editor {
  .ck-content p {
    font-size: 0.85rem !important;
  }
}

.preview {
  height: 200px;
  max-width: 250px;
  margin-top: 2em;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
}
</style>
