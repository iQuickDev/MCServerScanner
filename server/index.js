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
io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function scan(network, netmask, range = []) {
    range.sort((a, b) => a - b)
    if (range.length > 2)
        return "Too many arguments in range"
    else if (range.length == 1)
        range[1] = range[0]

    let addresses = []
    new Netmask(`${network}/${netmask}`).forEach(addr => addresses.push(addr))
    for (let i = 0; i < addresses.length; i++) {
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
                    io.sockets.emit('new-server', await mcutil.status(ip, port))
                } catch (e) { console.error(e) }
            })

            scan.run()
        })

        await sleep(5000)
    }

}

//scan("185.116.157.0", 24, [17000, 18000])