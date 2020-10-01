<template>
  <div class="pt-2">
    <div class="container mx-2">
      <h2
        class="is-family-primary has-text-black-bis has-text-weight-semibold is-size-5"
      >
        Manage Companies
      </h2>
      <hr />
      <div>
        <div class="flex row mb-3 wrap">
          <b-button
            :disabled="!selected"
            class="mr-3 mt-2"
            @click="clearSelected"
            type="is-danger is-light"
            >Clear selected</b-button
          >
          <b-button
            :disabled="companies.length <= 0"
            class="mr-3 mt-2"
            type="is-info"
            @click="goto('add-trip')"
            >Add trip</b-button
          >
          <b-button
            :disabled="!selected"
            class="mr-3 mt-2"
            type="is-warning"
            @click="archive"
            >Archive</b-button
          >
          <b-button
            :disabled="!selected"
            type="is-danger"
            class="mt-2"
            @click="remove"
            >Delete company</b-button
          >
        </div>
        <b-table
          :data="companies"
          ref="table"
          :selected.sync="selected"
          focusable
          paginated
          per-page="7"
          detailed
          detail-key="id"
          show-detail-icon
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            field="name"
            label="Company name"
            sortable
            v-slot="props"
          >
            <template>
              <a @click="toggle(props.row)">
                {{ props.row.name }}
              </a>
            </template>
          </b-table-column>

          <b-table-column
            field="location"
            label="Location"
            sortable
            v-slot="props"
          >
            {{ props.row.location }}
          </b-table-column>

          <b-table-column
            field="email"
            label="Email"
            sortable
            centered
            v-slot="props"
          >
            {{ props.row.email }}
          </b-table-column>

          <b-table-column
            field="contact"
            label="Contact Info"
            sortable
            centered
            v-slot="props"
          >
            {{ props.row.contact }}
          </b-table-column>

          <b-table-column
            field="archived"
            label="Archived"
            sortable
            v-slot="props"
          >
            {{ props.row.archive || "false" }}
          </b-table-column>

          <b-table-column
            field="created"
            label="Date created"
            centered
            v-slot="props"
          >
            <span class="tag is-success">
              {{ props.row.created.toDate() | moment("dddd, MMMM Do YYYY") }}
            </span>
          </b-table-column>

          <template slot="detail" slot-scope="props">
            <!-- {{ props.row.description }} -->
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="props.row.imageUrl" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <span v-html="props.row.description"></span>
                  <!-- <p>
                    {{ props.row.description }}
                  </p> -->
                </div>
              </div>
            </article>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import { companyCollection } from "../../db";

export default {
  name: "ManageCompanies",
  data() {
    return {
      companies: [],
      selected: null
    };
  },
  firestore: {
    companies: companyCollection
  },
  methods: {
    goto(r) {
      this.$router.push(`/admin/${r}`);
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    archive() {
      companyCollection.doc(this.selected.id).set(
        {
          archive: true
        },
        { merge: true }
      );
    },
    remove() {
      this.$buefy.dialog.confirm({
        title: "Delete?",
        message: "Are you sure youb want to delete? This can not be undone!",
        cancelText: "Disagree",
        confirmText: "Agree",
        onConfirm: () => this.deleteCompany
      });
    },
    clearSelected() {
      if (this.selected) {
        this.selected = null;
      }
    },
    deleteCompany() {
      alert("deleted");
    }
  }
};
</script>

<style></style>
