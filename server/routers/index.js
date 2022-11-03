const router = require('express').Router()
const Controller = require('../controllers/index')
const errorHandler = require('../midldleware/errorHandlingMiddleware')
const authenticationMiddleWare = require('../midldleware/authenticationMiddleWare')

router.get('/',(req, res) => {
    res.status(200).json({
        message: 'home'
    })
})

router.post('/api/users', Controller.register)
router.post('/api/login', Controller.userLogin)
router.use(authenticationMiddleWare)
router.get('/api/users', Controller.showAllUser)
router.get('/api/users/:id', Controller.showUserDetail)
router.delete('/api/users/:id', Controller.deleteUser)
router.use(errorHandler)

module.exports = router