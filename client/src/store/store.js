import { defineStore } from 'pinia'

export const useStore = defineStore('servers', {
    state: () => {
        servers: []
    },
    getters: {
        servers: (state) => servers
    },
    actions: {
        clear() {
            servers = []
        },
        push(server) {
            
        }
    }
})