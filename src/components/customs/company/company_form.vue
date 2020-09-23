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
            <edit-3-icon @click="imageUrl = null" size="1.5x"></edit-3-icon>

            <img class="preview" :src="imageUrl" alt="Preview" />
          </div>
        </div>
      </div>
      <button class="button is-warning is-light" type="submit">
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
      imageUrl: null
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
        email: this.email
      };

      console.log("company", data);
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
