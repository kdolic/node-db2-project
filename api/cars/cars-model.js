const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars')
    .where('id', id)
    .first()
}

const create = async (car) => {
  const [id] = await db('cars').insert(car, ['id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission'])
  return getById(id)
}

module.exports = { getAll, getById, create }