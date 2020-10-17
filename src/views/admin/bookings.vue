<template>
  <div class="pt-2">
      <div class="container mx-4">
          <h2 class="is-family-primary is-size-5 has-text-black-bis has-text-weight-semibold">
              Uzima Springs
          </h2>
          <hr>
          <div>
              <div class="flex f-column">
                <h2 class="is-size-6 is-family-primary has-text-weight-bold">
                    Bookings
                </h2>
                <div class="mt-3">
                    <button :disabled="!selected" @click="() => selected = null" class="button is-primary">
                        Clear selected
                    </button>
                </div>
              </div>
              
              <br>
              <b-table
                    paginated
                    :per-page="perPage"
                    :current-page="currentPage"
                    :data="data"
                    :columns="columns"
                    :selected.sync="selected"
                    focusable>
                </b-table>
          </div>
          <br>
          <h2 class="is-size-6 is-family-primary has-text-weight-semibold">
              Contacts
          </h2>
          <hr>
          <div class="mb-7">
              <b-collapse
                class="card my-4"
                animation="slide"
                v-for="(collapse, index) of collapses"
                :key="index"
                :open="isOpen == index"
                @open="isOpen = index">
                <div
                    slot="trigger"
                    slot-scope="props"
                    class="card-header"
                    role="button">
                    <p class="card-header-title">
                        {{ collapse.title }}
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>
                <div class="card-content">
                    <div class="content">
                        {{ collapse.text }}
                    </div>
                </div>
            </b-collapse>
          </div>
      </div>
  </div>
</template>

<script>

        
export default {
    name: "Bookings",
    data() {
        const data = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
            ]
        return {
            perPage: 5,
            currentPage:1,
            bookings: [],
            data,
            isOpen: 0,
                collapses: [
                {
                    title: 'Title 1',
                    text: 'Text 1'
                },
                {
                    title: 'Title 2',
                    text: 'Text 2'
                },
                {
                    title: 'Title 3',
                    text: 'Text 3'
                }
                ],
            selected: data[1],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'first_name',
                        label: 'First Name',
                    },
                    {
                        field: 'last_name',
                        label: 'Last Name',
                    },
                    {
                        field: 'date',
                        label: 'Date',
                        centered: true
                    },
                    {
                        field: 'gender',
                        label: 'Gender',
                    }
                ]
        }
    },
    methods: {
        deleteBooking() {
            console.log("deleted booking");
        }
    },
    created() {

    }
}
</script>

<style>

</style>