
// USING EXPRESS
const express = require("express")
const app = express()
const PORT = 3000
app.get("/", (req, res) => {
    res.send({ "message": `Message from express server ${process.pid} & PORT ${PORT}` })
})

app.listen(PORT, () => {
    console.log(`Server is running @ ${PORT}`)
})