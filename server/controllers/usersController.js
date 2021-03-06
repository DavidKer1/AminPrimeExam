const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');
const Users = require('../models/Users');
require('dotenv').config({path:'.env'})

exports.registerUser = async (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const user = req.body
  
  try {
    await Users.create(user)
    res.status(200).json({msg : 'Usuario Creado Correctamente'});
  } catch (error) {
    const sequelizeErrors = error.errors.map(err => err.message);
    res.json({errors: {msg: 'Usuario ya registrado'}})
  }
}

exports.loginUser = async (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await Users.findOne({where:{username: req.body.username}})
  if(!user){
    res.status(200).json({errors: {msg: "Contraseña incorrecta o usuario no encontrado"}})
  }

  if(!user.validatePassword(req.body.password)){
    res.json({errors: {msg: 'Password Incorrecto'}})
  } 

  const token = jwt.sign({
    nombre: user.nombre,
    username: user.username,
    id: user.id
  },
  process.env.JWT_KEY,
  {
    expiresIn: '24h'
  }
  )
  res.json({token})

}