<template>
  <div class="mb-7">
    <form @submit.prevent="addNewTrip">
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
          <section>
            <b-field label="Upload Images">
              <b-upload v-model="dropFiles" multiple drag-drop>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <upload-cloud-icon size="3x"></upload-cloud-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>
            <div class="tags">
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
              <b-field label="Code">
                <b-input
                  placeholder="Package code"
                  v-model="p.code"
                  required
                ></b-input>
              </b-field>
              <b-field label="Package detail">
                <b-input
                  placeholder="Add package detail"
                  maxlength="200"
                  type="textarea"
                  v-model="p.detail"
                ></b-input>
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
              <button @click="deletePackage(i)" class="button is-danger">
                <trash-icon size="1x" class="has-text-white"></trash-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button class="button is-warning" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, minLength, maxLength } = require("vuelidate/lib/validators");
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UploadCloudIcon, TrashIcon } from "vue-feather-icons";

export default {
  name: "TripForm",
  mixins: [validationMixin],
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
      packages: [
        {
          code: "",
          name: "",
          detail: "",
          cost: "",
          numberOfPeople: 1
        }
      ]
    };
  },
  validations: {
    name: {
      required,
      min: minLength(3),
      max: maxLength(15)
    }
  },
  methods: {
    addNewTrip() {},
    deletePackage(p) {
      this.packages.splice(p, 1);
    },
    addPackage() {
      this.packages.push({
        name: "",
        code: "",
        detail: "",
        cost: "",
        numberOfPeople: 1
      });
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    }
  },
  computed: {
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
  }
};
</script>

<style lang="scss">
.mb-7 {
  margin-bottom: 8em;
}
</style>
