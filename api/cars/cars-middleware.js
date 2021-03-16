const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try{
    const car = await Cars.getById(req.params.id)
    if(!car){
      res.status(404).json({ message: `car with id ${req.params.id} is not found` })
    } else {
      req.car = car
      next()
    }
  } catch(err){
    next(err)
  }
}

const checkCarPayload = async (req, res, next) => {
  try{
    if(!req.body.vin){
      res.status(400).json({ message: "vin is missing" })
    } else if(!req.body.make){
      res.status(400).json({ message: "make is missing" })
    } else if(!req.body.model){
      res.status(400).json({ message: "model is missing" })
    } else if(!req.body.mileage){
      res.status(400).json({ message: "mileage is missing" })
    } else {
      next()
    }
  } catch(err){
    next(err)
  }
}

const checkVinNumberValid = async (req, res, next) => {
  try{
    const isVinValid = vinValidator.validate(req.body.vin)

    if(!isVinValid){
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const existingVin = await Cars.getAll()
    const result = existingVin.filter(car => {
      if(car.vin === req.body.vin){
        return car
      }
    })

    if(result.length > 0){
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }
  } catch(err){
    next(err)
  }
}


module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }
