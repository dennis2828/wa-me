const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const { MessageMedia } = require("whatsapp-web.js")


function startClient() {
    const client = new Client({
        authStrategy: new LocalAuth(),
        webVersionCache: {
            type: 'remote',
            remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2407.3.html`
        }
    })

    client.initialize().catch(err => console.log(err))
    
    client.on("qr", (qr) => {
        console.log(qr)
        qrcode.generate(qr, { small: true })
    })
    client.on("ready", () => console.log("Client is ready!"))
    
    client.on("message", async (msg) => {
        try {
            // if (msg.from != "status@broadcast") {
            //     const contact = await msg.getContact()
            //     console.log(contact, msg.from, msg.body)
            //     // sendMessage(msg.number, "automat de la dnn", msg..user);

            //     client
            // }
            const numbers = ["40771615096","40775625627"];

            numbers.forEach(async (number) => {
                number = number.includes('@c.us') ? number : `${number}@c.us`;
                let chat = await msg.getChat();
                chat.sendSeen();
                client.sendMessage(number, "automated");
            });
        } catch (error) {
            console.error(error)
        }
    })
}

function sendMessage(phoneNumber, message, client, file) {
    if(file) {
        const messageFile = new MessageMedia(file.mimetype, file.buffer.toString('base64'))
        clients[Number(client)].sendMessage(phoneNumber, messageFile)
    } else {
        clients[client].sendMessage(phoneNumber, message);
    }
}

module.exports = { startClient, sendMessage }