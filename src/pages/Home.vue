<template>
    <div class="container-md table-responsive" style="overflow: hidden; max-width: 800px;">
        <div class="pt-5 pb-3 d-flex justify-content-between align-items-end">
            <h1 class="display-2">Donations</h1>
            <new-rocord-modal />
        </div>
        <div v-if="donationIsEmpty">
            <h1 class="h5 fw-light text-secondary">There is no donation to show yet</h1>
            <div v-show="loading" class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <table v-else class="table table-bordered">
            <thead>
                <tr class="table-light text-secondary">
                    <th scope="col" class="text-center px-3" style="width: 1px;">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" class="px-sm-5 text-sm-center" style="width: 1px;">Donation</th>
                    <th scope="col" class="text-end fit">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-secondary" v-for="(donation, index) in donations" :key="index">
                    <th scope="row" class="text-center text-secondary border-1 table-light">{{ index + 1 }}</th>
                    <td>{{ donation.name }}</td>
                    <td class="px-sm-5 text-sm-center" style="width: 1px;">{{ donation.donation }}</td>
                    <td class="d-flex justify-content-end">
                        <button @click="deleteRecord(index)" type="button" class="btn btn-sm btn-outline-light d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(255, 100, 100)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                            <span class="d-none d-md-inline-block text-danger ms-2 text-uppercase">Delete</span>
                        </button>
                        <!-- <edit-record-modal :index="index" /> -->
                    </td>
                </tr>
                <tr class="text-secondary">
                    <td colspan="2"> <strong>Total Donation</strong> </td>
                    <td colspan="1" class="px-sm-5 text-sm-center" style="width: 1px;"> <strong>{{ total }}</strong> </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import EditRecordModal from '../components/EditRecordModal.vue'
import NewRocordModal from '../components/NewRecordModal.vue'

export default {
    components: {
        NewRocordModal,
        // EditRecordModal
    },
    computed: {
        ...mapGetters({
            donations: 'GET_DONATIONS',
            loading: 'GET_LOADING',
            total: 'GET_TOTAL_DONATION'
        }),
        donationIsEmpty() {
            return this.donations.length === 0
        }
    },
    methods: {
        deleteRecord(index) {
            this.$store.dispatch('deleteDonation', index)
        }
    }
}
</script>

<style>
tr {
    vertical-align: middle;
    color: rgb(77, 92, 231);
}
</style>