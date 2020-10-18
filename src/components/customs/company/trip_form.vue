<template>
  <div class="mb-7">
    <form v-if="availableCompanies.length > 0" @submit.prevent="addNewTrip">
      <div class="columns">
        <div class="column is-half-tablet">
          <b-field
            label="Trip name"
            :message="nameErrors"
            :type="{ 'is-danger': nameErrors.length > 0 }"
          >
            <b-input
              type="text"
              placeholder="Enter trip name."
              required
              v-model.trim="$v.name.$model"
            >
            </b-input>
          </b-field>
          <ckeditor
            :editor="editor"
            v-model="description"
            :config="editorConfig"
          ></ckeditor>
          <b-field class="mt-3" label="Choose company">
            <b-select
              v-model="company"
              placeholder="Choose trip category"
              required
            >
              <option
                v-for="company in availableCompanies"
                :key="company.id"
                :value="company.id"
                >{{ company.name }}</option
              >
            </b-select>
          </b-field>
          <b-field label="Destination location">
            <b-input
              type="text"
              placeholder="Enter destination location."
              required
              v-model.trim="location"
            >
            </b-input>
          </b-field>
          <b-field class="mt-3" label="Add trip tag">
            <b-taginput
              v-model="tags"
              autocomplete
              allow-new
              :allow-duplicates="false"
              :open-on-focus="false"
              icon="tag"
              placeholder="Add a tag"
            >
            </b-taginput>
          </b-field>
          <b-field class="mt-3" label="Add destination amenities">
            <b-taginput
              v-model="popularAmenities"
              autocomplete
              allow-new
              :allow-duplicates="false"
              :open-on-focus="false"
              icon="tag"
              placeholder="Add an amenity"
            >
            </b-taginput>
          </b-field>
          <b-field label="Choose category">
            <b-select
              v-model="category"
              placeholder="Choose trip category"
              required
            >
              <option value="honeymoon">Africa Nature</option>
              <option value="hiking">Adventure</option>
              <option value="safaris">Wild Safari</option>
              <option value="Hotels">Beach</option>
              <option value="Hotels">Jungle Africa</option>
              <option value="camping">Camping and Hike</option>
            </b-select>
          </b-field>
          <section>
            <b-field label="Upload Images">
              <b-upload
                @input="getInput"
                v-model="dropFiles"
                multiple
                drag-drop
              >
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <upload-cloud-icon size="3x"></upload-cloud-icon>
                    </p>
                    <p>Drop your images here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>
            <div class="my-2">
              <b-progress v-if="uploadingImages" size="is-small"></b-progress>
            </div>
            <div v-if="!uploadingImages && !editing" class="tags">
              <span
                v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary"
              >
                {{ file.name }}
                <button
                  class="delete is-small"
                  type="button"
                  @click="deleteDropFile(index)"
                ></button>
              </span>
            </div>
            <div
              class="flex row wrap editImages"
              v-if="!uploadingImages && editing"
            >
              <img
                class="is-rounded"
                v-for="(i, k) in images"
                :key="k"
                :src="image"
                alt="Destination image"
              />
            </div>
          </section>
        </div>
        <div class="column is-half-tablet is-full-mobile">
          <div class="flex j-between">
            <h4 class="mb-2 has-text-black-bis is-size-6">Package details</h4>
            <b-button
              @click="addPackage"
              type="is-info is-light"
              size="is-small"
              >Add Package</b-button
            >
          </div>
          <div v-for="(p, i) in packages" :key="i">
            <div class="mb-3">
              <p
                class="has-text-weight-semibold is-size-6 pt-2 pb-2 px-3 rounded mb-2 has-background-grey has-text-white"
              >
                {{ i + 1 }}
              </p>
              <b-field label="Name">
                <b-input
                  placeholder="Package name"
                  v-model="p.name"
                  required
                ></b-input>
              </b-field>
              <b-field label="Package description">
                <b-input
                  placeholder="Enter package description."
                  v-model="p.description"
                  maxlength="200"
                  type="textarea"
                ></b-input>
              </b-field>
              <b-field label="Package Cost">
                <b-numberinput
                  min="1000"
                  max="500000"
                  placeholder="Enter package cost"
                  v-model="p.cost"
                ></b-numberinput>
              </b-field>
              <b-field label="Number of days">
                <b-numberinput
                  min="1"
                  max="15"
                  placeholder="Enter number of days for this package."
                  v-model="p.noOfDays"
                ></b-numberinput>
              </b-field>
              <b-field label="Number of people">
                <b-slider
                  size="is-small"
                  :min="1"
                  :max="10"
                  ticks
                  v-model="p.numberOfPeople"
                >
                </b-slider>
              </b-field>
              <button
                :disabled="uploadingImages"
                @click="deletePackage(i)"
                class="button is-danger"
              >
                <span class="mr-2">
                  Delete
                </span>
                <trash-icon size="1x" class="has-text-white"></trash-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        :disabled="uploadingImages"
        class="button is-warning"
        :class="{ 'is-loading': isSubmitting }"
        type="submit"
      >
        Save
      </button>
    </form>
    <div v-else>
      <div class="card">
        <div class="card-content">
          <h2 class="has-text-black-bis is-size-4">Create company</h2>
          <p class="has-text-grey is-size-6">
            Please add a company before creating a trip
          </p>
          <hr />
          <b-button type="is-success" @click="goto">Add company</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, minLength, maxLength } = require("vuelidate/lib/validators");
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UploadCloudIcon, TrashIcon } from "vue-feather-icons";
import {
  TaskEvent,
  TaskState,
  storageRef,
  companyCollection
} from "../../../db";

export default {
  name: "TripForm",
  mixins: [validationMixin],
  props: ["destination"],
  components: {
    UploadCloudIcon,
    TrashIcon
  },
  data() {
    return {
      name: "",
      dropFiles: [],
      description: "<p>Trip description.</p>",
      editor: ClassicEditor,
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
      tags: [],
      images: [],
      popularAmenities: [],
      category: "",
      company: "",
      companies: [],
      isSubmitting: false,
      checkIn: null,
      checkOut: null,
      isAmPm: false,
      location: "Nairobi",
      packages: [
        {
          description: "",
          name: "",
          detail: "",
          cost: "",
          noOfDays: 1,
          numberOfPeople: 1
        }
      ],
      uploadingImages: null,
      uploadedImages: [],
      uploadProgess: 0,
      availableCompanies: [],
      editing: false
    };
  },
  validations: {
    name: {
      required,
      min: minLength(3),
      max: maxLength(30)
    }
  },
  methods: {
    goto() {
      this.$router.push("/admin/create-company");
    },
    getInput(f) {
      this.uploadingImages = true;
      Promise.all(f.map(e => this.uploadFiles(e, "trips")))
        .then(result => {
          this.uploadingImages = false;
          if (this.editing) {
            this.uploadedImages.push(result);
          } else {
            this.uploadedImages = result;
          }
        })
        .catch(() => {
          this.uploadingImages = false;
          this.$buefy.snackbar.open(
            `Upload failed please try again or contact support`
          );
        });
    },
    addNewTrip() {
      let tripData = {
        name: this.name,
        description: this.description,
        images: this.uploadedImages,
        packages: this.packages,
        category: this.category,
        tags: this.tags,
        amenities: this.popularAmenities,
        location: this.location
      };
      this.isSubmitting = true;

      if (this.editing) {
        companyCollection
          .doc(this.destination.compantId)
          .get()
          .then(result => {
            if (result.exists) {
              companyCollection
                .doc(result.id)
                .collection("destinations")
                .doc(this.destination.tripId)
                .set(tripData, { merge: true });
            }
          })
          .catch(error => {
            console.log("error updating", error);
            this.$buefy.snackbar.open({
              position: "is-bottom-right",
              type: "is-warning",
              message: "Destination update failed. "
            });
          });
      } else {
        companyCollection
          .doc(this.company)
          .collection("destinations")
          .add(tripData)
          .then(result => {
            this.isSubmitting = false;
            this.$buefy.snackbar.open({
              message: "Added trip",
              type: "is-success",
              position: "is-top-right"
            });
            console.log("company", result);
          })
          .catch(error => {
            console.log("error", error);
            this.$buefy.snackbar.open({
              message: "Failed to add destination",
              type: "is-danger",
              position: "is-top-right"
            });
          });
      }
    },
    deletePackage(p) {
      this.packages.splice(p, 1);
    },
    addPackage() {
      this.packages.push({
        description: "",
        name: "",
        detail: "",
        cost: "",
        noOfDays: 1,
        numberOfPeople: 1
      });
    },
    deleteDropFile(index) {
      let fileName = this.dropFiles[index].name;
      let deleteRef = storageRef.child(`trips/${fileName}`);

      deleteRef
        .delete()
        .then(() => {
          this.dropFiles.splice(index, 1);
          this.uploadedImages.splice(index, 1);
        })
        .catch(() => {
          this.$buefy.snackbar.open(`Failed to delete file`);
        });
      console.log("file", this.dropFiles[index].name);
    },
    initTrip(destination) {
      this.editing = true;
      // destination has companyId and tripId for updates
      (this.name = destination.name),
        (this.description = destination.description),
        (this.uploadedImages = destination.images),
        (this.packages = destination.packages),
        (this.category = destination.category),
        (this.tags = destination.tags);
      this.popularAmenities = destination.amenities;
      this.checkIn = destination.checkIn;
      this.checkOut = destination.checkOut;
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
  firestore: {
    availableCompanies: companyCollection
  },
  computed: {
    format() {
      return this.isAmPm ? "12" : "24";
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) {
        return errors;
      }
      if (!this.$v.name.required) {
        errors.push("Please enter a trip name.");
      }
      if (!this.$v.name.min) {
        errors.push("Trip name is too short.");
      }

      if (!this.$v.name.max) {
        errors.push("Trip name is too long");
      }

      return errors;
    }
  },
  created() {
    if (this.destination) {
      this.initTrip(this.destination);
    }
  }
};
</script>

<style lang="scss">
.mb-7 {
  margin-bottom: 8em;
}

.editImages img {
  img {
    height: 100px;
    width: 100px;
    object-fit: center;
  }
}
</style>
