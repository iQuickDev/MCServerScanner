const { Netmask } = require('netmask')
const { Server } = require('socket.io')
const mcutil = require('minecraft-server-util')
const Evilscan = require('evilscan')
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.listen(8787)
const io = new Server(6969, {
    cors: {
        origin: '*'
    }
})

let stopped = false

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)

    socket.on('scan', (network, netmask, range) => {
        scan(network, netmask, range)
    })

    socket.on('stop', () =>
    {
        stopped = true
    })
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function scan(network, netmask, range = [], delay = delay*1000) {
    range.sort((a, b) => a - b)
    if (range.length > 2)
        return "Too many arguments in range"
    else if (range.length == 1)
        range[1] = range[0]

    let addresses = []
    let scanCount
    let scanned = 0
    new Netmask(`${network}/${netmask}`).forEach(addr => {
        addresses.push(addr)
        scanCount = addresses.length
    })
    for (let i = 0; i < addresses.length; i++) {
        if (stopped)
        {
            stopped = false
            return
        }
        new Evilscan({
            target: addresses[i],
            port: `${range[0]}-${range[1]}`,
            status: 'O',
            banner: true,
            concurrency: 256
        }, async (err, scan) => {
            if (err) console.error(err)
            scan.on('result', async data => {
                let { ip, port } = data
                try {
                    io.sockets.emit('new-server', {ip, port, info: await mcutil.status(ip, port)})
                } catch (e) { console.error(e) }
            })

            scan.on('done', () => {
                io.sockets.emit('progress', (scanned / scanCount) * 100)
                scanned++
            })

            scan.run()
        })

        await sleep(delay)
    }
}

scan("185.116.157.0", 24, [17000, 18000], 5)