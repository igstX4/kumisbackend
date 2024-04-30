import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import jwt from "jsonwebtoken"
import checkAuth from './checkAuth.js'
import NumberModal from './NumberModal.js'

mongoose.connect
('mongodb+srv://artem057kharkiv1love:pSBdju5A8Wa9S5cT@cluster0.3ut5kuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB ok'))
    .catch((e) => console.log('DB err', e))

const router = express()

router.use(express.json())
router.use(cors())

router.listen(4000, () => {
    console.log('Server OK')
})


router.post("/login", async (req, res) => {
    const {password} = req.body

    if (password !== "Fhg12gasf1FF") {
        return res.status(500).json({message: "Нет доступа"})
    }
    const token = jwt.sign({
        admin : true,
    }, "secret1337", {expiresIn: '30d'})
    res.status(200).json({token,})
})
router.get('/me', checkAuth, async (req, res) => {
    if (!req.admin) {
        return res.json(500).json({message: "нет доступа"})
    }

    res.json({admin: true})
})
router.post("/createRequest", async (req, res) => {
    const {number} = req.body

    const doc = new NumberModal({number,})

    const newDoc = await doc.save()

    res.json(newDoc)
})
router.get('/all', checkAuth, async (req, res) => {
    const numbers = await NumberModal.find()

    res.json(numbers)
})

router.delete('/:id', checkAuth, async (req, res) => {
    const {id} = req.params

    const deletedObj = await NumberModal.deleteOne({_id: id})

    res.json(deletedObj)
})