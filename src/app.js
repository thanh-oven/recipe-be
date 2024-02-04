const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

let FruitBox = [];

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', function(req, res) {
    const result = {
        status: 200,
        message: "Welcome to recipe backend!!!"
    }
    res.send(JSON.stringify(result))
})

router.get("/ping", async (req, res) => {
    const result = { incomming : 'ping ', resonse : 'pong '}
    res.send(JSON.stringify(result))
});

router.get("/craw-pages", async (req, res) => {
    res.send(JSON.stringify(FruitBox))
});

router.get("/craw-pages/:item", async (req, res) => {
    const item = parseInt(req.params.item)
    res.send(JSON.stringify(FruitBox[item]))
});

router.post('/craw-pages', async (req, res) => {
    let result
    try{
        const fruitName = req.body.fruitName;
        const qty = req.body.qty;
        const item = { fruit: fruitName, qty : qty}
        FruitBox.push(item)
        result = FruitBox
        res.status(200)
    }catch(e){
        console.log(e)
        result = { errorMessage : 'Ensure your POST body conatains both a fruitName and a qty and content type is application/json '}
        res.status(500);
    }
    res.send(result)
})

app.use('/', router)

module.exports = app