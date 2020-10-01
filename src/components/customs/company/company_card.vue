<template>
  <div class="c-card">
    <img
      v-if="company.imageUrl"
      class="mb-3"
      :src="company.imageUrl"
      alt="Zebra photo"
    />
    <img v-else src="../../../assets/zebras.jpg" alt="Zebras" />
    <div class="c-content">
      <h3 class="is-family-sans-serif has-text-weight-semibold is-size-5 mb-2">
        {{ company.name }}
      </h3>
    </div>
    <div class="c-foot flex j-right">
      <b-dropdown position="is-top-right" aria-role="list">
        <more-horizontal-icon
          slot="trigger"
          size="1.5x"
          class="has-text-black"
        ></more-horizontal-icon>

        <b-dropdown-item @click="unarchive" aria-role="listitem">
          <airplay-icon size="1x" class="mr-2 items-center"></airplay-icon>
          <span>
            Unarchive
          </span>
        </b-dropdown-item>
        <b-dropdown-item @click="edit" aria-role="listitem">
          <edit-2-icon size="1x" class="mr-2"></edit-2-icon>
          <span>Edit</span>
        </b-dropdown-item>
        <b-dropdown-item @click="remove" aria-role="listitem">
          <trash-2-icon size="1x" class="mr-2"></trash-2-icon>
          <span>Delete</span>
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import {
  MoreHorizontalIcon,
  AirplayIcon,
  Edit2Icon,
  Trash2Icon
} from "vue-feather-icons";
import { companyCollection, storageRef } from "../../../db";

export default {
  name: "CompanyCard",
  props: {
    company: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  components: {
    MoreHorizontalIcon,
    AirplayIcon,
    Edit2Icon,
    Trash2Icon
  },
  methods: {
    unarchive() {
      companyCollection.doc(this.id).set({ archive: false }, { merge: true });
    },
    remove() {
      this.$buefy.dialog.confirm({
        title: "Delete company",
        message:
          "Are you sure you want to delete the company?. Any destination associated with the company will be lost. This operation can not be undone.",
        confirmText: "Delete",
        onConfirm: () => companyCollection.doc(this.id).delete()
      });
    },
    edit() {
      console.log("editing");
    },
    deleteCompany() {
      companyCollection
        .doc(this.id)
        .get()
        .then(result => {
          if (result.exists) {
            companyCollection
              .doc(result.id)
              .collection("destinations")
              .get()
              .then(destinations => {
                if (destinations.empty) {
                  if (result.data().imageUrl) {
                    console.log("deleted images");
                    storageRef.storage
                      .refFromURL(result.data().imageUrl)
                      .delete();
                  }
                  companyCollection.doc(result.id).delete();

                  this.$buefy.snackbar.open({
                    type: "is-success",
                    position: "is-bottom-right",
                    message: "Company deleted successfully."
                  });
                } else {
                  destinations.forEach(d => {
                    let destination = d.data();
                    if (destination.images.length > 0) {
                      destination.images.forEach(i => {
                        storageRef.storage
                          .refFromURL(i)
                          .delete()
                          .then(() => {
                            companyCollection.doc(this.id).delete();
                            this.$buefy.snackbar.open({
                              type: "is-success",
                              position: "is-bottom-right",
                              message: "Company deleted successfully."
                            });
                          });
                      });
                    }
                  });
                }
              })
              .catch(error => {
                this.$buefy.snackbar.open(
                  "Company delete failed. " + error.message
                );
              });
          } else {
            this.$buefy.snackbar.open("Company delete failed.");
          }
        })
        .catch(error => {
          this.$buefy.snackbar.open({
            message: "Company delete failed. " + error.message,
            type: "is-warning",
            position: "is-bottom-right"
          });
        });
      // companyCollection.doc(this.id).collection("destinations")
      // .get()
      // .then(result => {
      //   if(result.empty) {

      //   } else {
      //     result.forEach(dest => {
      //     let destinations = dest.data();
      //     if(destinations.images.length > 0) {
      //       destinations.images.forEach(i => {
      //         storageRef.storage.refFromURL(i).delete()
      //         .then(() => {
      //           companyCollection.doc(this.id).delete();
      //         })
      //       })
      //     }
      //   })
      //   }
      // })
      // .catch(error => {
      //   this.$buefy.snackbar.open({
      //     message: "Company delete failed. " + error.message,
      //     type: "is-warning",
      //     position: "is-bottom-right"
      //   })
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
.ellipses {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.c-card {
  max-width: 220px;
  height: auto;
  display: inline-flex;
  flex-direction: column;

  margin-right: 10px;

  img {
    border-radius: 4px;
    object-fit: cover;
    object-position: center;
  }

  .c-content,
  .c-foot {
    padding: 0.3em;
  }
}
</style>
