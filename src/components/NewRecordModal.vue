<template>
    <svg data-bs-toggle="modal" data-bs-target="#newRecordModal" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" height="44px" viewBox="0 0 24 24" width="44px" fill="rgb(77, 92, 231)"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    <!-- Modal -->
    <div class="modal fade" id="newRecordModal" tabindex="-1" aria-labelledby="newRecordModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="newRecordModalLabel">Modal title</h5>
                    <button id="close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div v-for="(row, index) in formRows" :key="index" class="d-flex flex-wrap gap-3 py-2" novalidate>
                        <div class="form-floating flex-fill">
                            <input v-model="names[index]" type="text" class="form-control" :id="`floatingName${index}`" placeholder="i.e., Asad, Shahzad .." style="padding-bottom: ;">
                            <label :for="`floatingName${index}`">Name</label>
                        </div>
                        <div class="form-floating flex-fill">
                            <input v-model="donations[index]" type="number" class="form-control" :id="`floatingDonation${index}`" placeholder="Password">
                            <label :for="`floatingDonation${index}`">Donation</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="btn-group" role="group">
                        <button @click="removeRow" type="button" class="btn btn-outline-primary" :disabled="flag">Remove Last Row</button>
                        <button @click="addRow" type="button" class="btn btn-outline-primary">Add New Row</button>
                    </div>
                    <button @click="submitNewDonations" v-show="!loading" type="button" class="btn btn-primary">
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
    data: () => ({
        names: [''],
        donations: [null],
        formRows: 0,
        flag: true
    }),
    mounted() {
        this.formRows = this.names.length
    },
    methods: {
        removeRow() {
            this.names.pop()
            this.donations.pop()
            this.formRows = this.names.length
            console.log(this.formRows)
            if (this.formRows > 1) {
                this.flag = false
            } else {
                this.flag = true
            }
        },
        addRow() {
            this.names.push('')
            this.donations.push(null)
            this.formRows = this.names.length
            console.log(this.formRows)
            if (this.formRows > 1) {
                this.flag = false
            } else {
                this.flag = true
            }
        },
        submitNewDonations() {
            // 'if (this.records.length <= 1 && this.records[0][0] === "" || this.records[0][1] === null) {
            //     alert('Nothing to Save\nYou are required to enter something inside input feilds')
            //     return
            // }'
            var data = []
            var row = []
            for (var i = 0; i < this.formRows; i++) {
                row.push(this.names[i])
                row.push(this.donations[i])
                console.log(row)
                data.push(row)
                row = []
            }
            this.$store.dispatch('addNewDonation', data)
            this.names = ['']
            this.donations = [null]
            this.formRows = this.names.length
        }
    },
    computed: {
        ...mapGetters({
            loading: 'GET_LOADING'
        })
    },
    watch: {
        loading(newValue, oldValue) {
            if (!newValue) {
                const closeBtn = document.getElementById('close')
                closeBtn.click()
            }
        }
    }
}
</script>

<style>
button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}
</style>