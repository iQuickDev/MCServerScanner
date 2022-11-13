import { defineStore } from 'pinia'
import API from '../services/api.js'

export const useStore = defineStore('servers', {
    state: () => ({
        API: new API(),
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