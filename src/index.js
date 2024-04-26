const express = require("express")
const messageRouter = require("./routers/messagesRouter")
const whatsappclient = require('./services/WhatsappClient')

whatsappclient.startClient();

const app = express()
app.use(express.json())
app.use(messageRouter)

app.listen(300, () => console.log(`Server is ready in on port 3000`))