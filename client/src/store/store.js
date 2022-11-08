import { defineStore } from 'pinia'

export const useStore = defineStore('servers', {
    state: () => ([]),
    getters: {
        all: (state) => state
    },
    actions: {
        clear() {
            state = []
        },
        push(server) {
            state.push(server)
        }
    }
})