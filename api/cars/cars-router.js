const express = require('express')
const Cars = require('./cars-model')
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
        const allCars = await Cars.getAll()
        res.status(200).json(allCars)
    } catch(err){
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    try{
        const car = await Cars.getById(req.params.id)
        res.status(200).json(car)
    } catch(err){
        next(err)
    }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try{
        const addCar = await Cars.create(req.body)
        res.status(201).json(addCar)
    } catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
    res.status(500).json({
      message: 'something went wrong inside the accounts router',
      errMessage: err.message,
    })
  })

module.exports = router