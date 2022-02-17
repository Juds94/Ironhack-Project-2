const router = require("express").Router()
const User = require('./../models/User.model')
const Review = require('./../models/Review.model')
const { isLoggedIn, checkRole, checkSameUser } = require('./../middleware/route-guard')
const { isOwner, isCare, isAdmin, isSameUser } = require('./../utils/index')
const { response } = require("express")




// router.post('/profile/:id', isLoggedIn, checkRole("OWNER"), (req, res, next) => {

// })


// AQUÍ EL ENDPOINT DE CREAR UNA RESEÑA
// en todos los enlaces que pongáis en als vistas o en redirects
// o olvideis poner /review/wahteverrr

// /create

module.exports = router