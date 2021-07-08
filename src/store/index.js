import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state: () => ({
        donations: [],
        admin: {},
        loading: false,
        totalDonation: 0,
    }),
    getters: {
        GET_DONATIONS(state) {
            return state.donations
        },
        GET_LOADING(state) {
            return state.loading
        },
        GET_TOTAL_DONATION(state) {
            return state.totalDonation
        }
    },
    mutations: {
        SAVE_NEW_DONATION(state, payload) {
            state.donations.push(payload)
        },
        EDIT_DONATIONS(state, payload, index) {
            state.donations[index] = payload
        },
        DELETE_NOTATION(state, index) {
            // delete mutation code
        },
        SET_LOADING(state, payload) {
            return state.loading = payload
        },
        SET_TOTAL_DONATION(state, payload) {
            state.totalDonation = payload
        }
    },
    actions: {
        async getAllDonations({ commit, state }) {
            commit('SET_LOADING', true)
            await axios.get('https://shazad-donation-project-api.herokuapp.com/get/donations')
            .then(response => {
                var list = response.data
                state.donations = []
                list.forEach(item => {
                    commit('SAVE_NEW_DONATION', {
                        'name': item[0],
                        'donation': item[1]
                    })
                })
                commit('SET_LOADING', false)
            })
            .catch((error) => {
                console.log(error)
                commit('SET_LOADING', false)
            })
        },
        async getTotalDonations({ commit, state }) {
            commit('SET_LOADING', true)
            await axios.get('https://shazad-donation-project-api.herokuapp.com/get/total/donations')
            .then(response => {
                console.log(response)
                commit('SET_TOTAL_DONATION', response.data.total)
                commit('SET_LOADING', false)
            })
            .catch((error) => {
                commit('SET_LOADING', false)
            })
        },
        async addNewDonation({ commit, dispatch }, payload) {
            commit('SET_LOADING', true)
            await axios.post('https://shazad-donation-project-api.herokuapp.com/add/donation', {
                "values": payload
            })
            .then(response => {
                console.log(response)
                dispatch('getTotalDonations')
                dispatch('getAllDonations')
                commit('SET_LOADING', false)
            })
            .catch((error) => {
                console.log(error)
                commit('SET_LOADING', false)
            })
        },
        async updateDonation({ commit, dispatch }, payload) {
            commit('SET_LOADING', true)
            console.log(payload.data[0])
            await axios.post('https://shazad-donation-project-api.herokuapp.com/update/donation', {
                'values': [
                    [ payload.data[0][0], payload.data[0][1] ]
                ],
                'traget': payload.query
            })
            .then(response => {
                console.log(response)
                dispatch('getTotalDonations')
                dispatch('getAllDonations')
                commit('SET_LOADING', false)
            })
            .catch((error) => {
                console.log(error)
                commit('SET_LOADING', false)
            })
        },
        async deleteDonation({ dispatch }, index) {
            await axios.post(`https://shazad-donation-project-api.herokuapp.com/delete/donation=${index}`)
            .then(response => {
                console.log(response)
                dispatch('getTotalDonations')
                dispatch('getAllDonations')
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
})

export default store