const aedes = require('aedes')()
const mqttServer = require('net').createServer(aedes.handle)

// fired when a client connects
aedes.on('clientConnect', function (client) {
    console.log('Client Connected: ' + (client ? client.id : client))
})
// fired when a client disconnects
aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: ' + (client ? client.id : client))
})

function publish(topic, payload) {
    aedes.publish({ topic, payload })
}

// fired when a message is published
aedes.on('publish', async function (packet, client) {
    // const payload = JSON.parse(packet.payload.toString())
    // console.log(packet.topic, ': ', payload)
    if(packet.topic === 'gate') {
        publish('gate_data', packet.payload.toString());
        //if (packet.payload.plateString) <- per il DEBUG
        //if (packet.payload.plate) <- per la PROD 
        //let datetime
        //let plate
        //db.addLog
    } else if(packet.topic === 'parklot') {
        publish('parklot_data', packet.payload.toString());
        //let parkNumber = packet.payload.number
        //let isFree = packet.payload.isFree
        // try {
        //     db.changeParkingStatus(parkingId, req.body.isFree)
        // } catch (err) {
        //     console.error(err)
        // }
    }
})

module.exports = mqttServer
