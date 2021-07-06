<template>
    <button data-bs-toggle="modal" data-bs-target="#editRecordModal" type="button" class="btn btn-sm btn-outline-light ms-2 d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(24, 175, 49)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
        <span class="hidden d-md-inline-block text-success ms-2 text-uppercase">Edit</span>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="editRecordModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="d-flex flex-wrap gap-3 py-2">
                        <div class="form-floating flex-fill">
                            <input v-model="name" type="text" class="form-control" :id="`floatingEditName${index}`" placeholder="i.e., Asad, Shahzad .." style="padding-bottom: ;">
                            <label :for="`floatingEditName${index}`">Name</label>
                        </div>
                        <div class="form-floating flex-fill">
                            <input v-model="donation" type="number" class="form-control" :id="`floatingEditDonation${index}`" placeholder="Password">
                            <label :for="`floatingEditDonation${index}`">Donation</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="updateDonations" v-show="!loading" type="button" class="btn btn-primary">
                        <span>Save changes</span>
                    </button>
                    <div v-show="loading" class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: ['index'],
    data: () => ({
        name: '',
        donation: null
    }),
    methods: {
        updateDonations() {
            if (this.name === "" || this.donation === null) {
                alert('Nothing to Save\nYou are required to enter something inside input feilds')
                return
            }
            this.$store.dispatch('updateDonation', {
                "data": [[ this.name, toString(this.donation) ]],
                "query": "Sheet1!A1:B1"
            })
        }
    },
    computed: {
        ...mapGetters({
            loading: 'GET_LOADING'
        })
    }
}
</script>