<template>
  <div class="pt-2">
    <div class="container mx-2">
      <h2
        class="is-family-primary has-text-black-bis has-text-weight-semibold is-size-5"
      >
        Manage Companies
      </h2>
      <hr />
      <b-table
        :data="data"
        ref="table"
        paginated
        per-page="5"
        detailed
        detail-key="id"
        @details-open="
          row => $buefy.toast.open(`Expanded ${row.user.first_name}`)
        "
        :show-detail-icon="showDetailIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column
          field="name"
          label="Company name"
          sortable
          v-slot="props"
        >
          <template v-if="showDetailIcon">
            {{ props.row.name }}
          </template>
          <template v-else>
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

        <template slot="detail" slot-scope="props">
          {{ props.row.description }}
          <!-- <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="/static/img/placeholder-128x128.png">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>
                                <small>@{{ props.row.user.first_name }}</small>
                                <small>31m</small>
                                <br>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                                Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                            </p>
                        </div>
                    </div>
                </article> -->
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageCompanies",
  data() {
    return {
      data: [
        {
          id: 6,
          name: "Company info",
          email: "Company info",
          website: "Company info",
          contact: "Company info",
          description: "Company info and description.",
          profile: "Company info",
          location: "Company info"
        },
        {
          id: 5,
          name: "Company info",
          email: "Company info",
          website: "Company info",
          contact: "Company info",
          description: "Company info and description.",
          profile: "Company info",
          location: "Company info"
        },
        {
          id: 1,
          name: "Company info",
          email: "Company info",
          website: "Company info",
          contact: "Company info",
          description: "Company info and description.",
          profile: "Company info",
          location: "Company info"
        },
        {
          id: 8,
          name: "Company info",
          email: "Company info",
          website: "Company info",
          contact: "Company info",
          description: "Company info and description.",
          profile: "Company info",
          location: "Company info"
        }
      ]
    };
  }
};
</script>

<style></style>
