const Router = require('express')
const router = new Router()
const deivceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), deivceController.create)
router.get('/', deivceController.getAll)
router.get('/:id', deivceController.getOne)

module.exports = router