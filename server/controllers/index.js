const {User} = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwtHelper')

class Controller {

  static register(req, res, next){
    const{ name, email, password, role } = req.body
    User.create({
        name, email, password, role
    })
    .then((data) => {
        res.status(201).json({id: data.id, email: data.email})
    })
    .catch((err) => {
        console.log(err);
    })
  }

  static userLogin(req, res, next){
        const { email, password } = req.body
        User.findOne({ where : { email }})
        .then((user) => {
            if(!email || !password) throw { name : 'BadRequest'}
            if(!user) throw { name : "Unauthorized" }
            const compareResult = comparePassword(password, user.password)
            if (!compareResult) throw { name : "Unauthorized" }

            const accesstoken = sign({ id : user.id, email : user.email })
            const { role } = user.dataValues
            res.status(200).json({ accesstoken, role, email : user.dataValues.email })
        })
        .catch((err) => {
            next(err)
            console.log(err);
        })

  }

  static showAllUser(req, res, next){
      User.findAll({ order : [['id','ASC']], attributes: { exclude: ['password']}})
      .then((data) => {
          res.status(200).json({ user: data })
      })
      .catch((err) => {
          next(err)
      })
  }

  static showUserDetail(req, res, next){
    User.findOne({ 
        where: { id: req.params.id },
         attributes: { exclude: ['password']}
    })
    .then((data) => {
        if(!data) throw { name: 'Not Found'}
        res.status(200).json(data)
    })
    .catch((err) => {
      next(err)
    })
  }
  
  static deleteUser(req, res, next){
    let dataDeleted = {}
    let roleUser = req.user.role
    User.findByPk(req.params.id)
    .then((dataUser) => {
        dataDeleted = dataUser
        if(!dataUser) throw { name : 'Not Found'}
        if(roleUser !== 'admin') throw { name : 'Forbidden' }
        return User.destroy({ where: { id: req.params.id } } )
    })
    .then((data) => {
        if(!data) throw { name: 'Not Found'}
        res.status(200).json({ message : `${dataDeleted.name} success deleted`})
    })
    .catch((err) => {
        next(err)
    })
  }
}

module.exports = Controller