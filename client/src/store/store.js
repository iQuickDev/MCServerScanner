import { defineStore } from 'pinia'

export const useStore = defineStore('servers', {
    state: () => ({
        servers: []
    }),
    actions: {
        clear() {
            this.servers = []
        },
        add(server) {
            this.servers.unshift(server)
        }
    }
})