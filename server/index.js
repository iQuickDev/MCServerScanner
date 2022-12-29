const { Netmask } = require('netmask')
const { Server } = require('socket.io')
const mcutil = require('minecraft-server-util')
const Evilscan = require('evilscan')
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.listen(8787, () => console.log("Server is listening on 0.0.0.0:8787"))
const io = new Server(6969, {
    cors: {
        origin: '*'
    }
})

let stopped = false

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)

    socket.on('scan', (network, netmask, range, delay, rate) => {
        scan(network, netmask, range, delay, rate)
    })

    socket.on('stop', () =>
    {
        stopped = true
    })
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function scan(network, netmask, range = [], delay, rate) {
    range.sort((a, b) => a - b)
    if (range.length > 2)
        return "Too many arguments in range"
    else if (range.length == 1)
        range[1] = range[0]


    logScan(network, netmask, range, delay, rate)
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
            console.log("Client stopped the scan")
            return
        }
        new Evilscan({
            target: addresses[i],
            port: `${range[0]}-${range[1]}`,
            status: 'O',
            banner: true,
            concurrency: rate
        }, async (err, scan) => {
            if (err) console.error(err)
            scan.on('result', async data => {
                let { ip, port } = data
                try {
                    let info = await mcutil.status(ip, port)
                    // if ((info.players.online == info.players.sample.length) && info.favicon)
                    // {
                        console.log(`[HIT] ${ip}:${port} (${((scanned/scanCount) * 100).toFixed(2)}%)`)
                        io.sockets.emit('new-server', {ip, port, info})
                    //}
                } catch (e) { }
            })

            scan.on('done', () => {
                scanned++
                io.sockets.emit('progress', (scanned / scanCount) * 100)
            })
            scan.run()
        })
        await sleep(delay * 1000)
    }
}

function logScan(network, netmask, range, delay, rate)
{
    console.log(
    `Client requested the following scan:
    Network: ${network}/${netmask}
    Ports range: ${range.toString().replace(',', ' - ')}
    Checking on ${rate} ports per second
    with a ${delay} seconds delay between each iteration`
    )
}