import {io} from 'socket.io-client'
import { useStore } from '../store/store.js'

export class API
{
    store = useStore()
    socket = new io("127.0.0.1", 6969)

    constructor()
    {
        this.socket.on('new-server', (server) =>
        {
            this.store.push(server)
        })
    }

    scan(network, netmask, range, delay)
    {
        this.socket.emit('scan', network, netmask, range, delay)
    }

    stop()
    {
        this.socket.emit('stop')
    }
}