import Express from "express";
import { promises as fs } from "fs";

const { readFile } = fs;
const router = Express.Router();

const sortAsc = (a, b) => a.models.length - b.models.length
const sortDsc = (a, b) => b.models.length - a.models.length

const getAllSorted = async (req, res, next) => {
    try {
        const {sort} = req.query
        const data = JSON.parse( await readFile('data/car-list.json'))
        if (sort === 'asc') {
            res.send(data.sort(sortAsc))
            return
        } else if (sort === 'dsc') {
            res.send(data.sort(sortDsc))
            return
        }
        res.send(data)
    } catch (err) {
        next(err)
    }
}

const getMinCars = async (req, res, next) => {
    try {
        const minNumber = Number(req.params.number)
        const data = JSON.parse( await readFile('data/car-list.json'))
        res.send(data.filter(brandModel => brandModel.models.length > minNumber).sort(sortAsc))
    } catch (err) {
        next(err)
    }
}

const getMaxCars = async (req, res, next) => {
    try {
        const MaxNumber = Number(req.params.number)
        const data = JSON.parse( await readFile('data/car-list.json'))
        res.send(data.filter(brandModel => brandModel.models.length < MaxNumber).sort(sortAsc))
    } catch (err) {
        next(err)
    }
}

const getModelByBrand = async (req, res, next) => {
    try {
        const { brand }= req.params
        const data = JSON.parse( await readFile('data/car-list.json'))
        const brandData = data.find(item => item.brand.toLowerCase() === brand.toLowerCase())
        if (brandData) {
            res.send(brandData.models)
        }
        res.send([])
    } catch (err) {
        next(err)
    }
}

router.get('/', getAllSorted)
router.get('/min-cars/:number', getMinCars)
router.get('/max-cars/:number', getMaxCars)
router.get('/brand/:brand', getModelByBrand)
router.use((err, req, res, next) => {
    res.status(400).send({error: err.message})
}) 

export default router;
