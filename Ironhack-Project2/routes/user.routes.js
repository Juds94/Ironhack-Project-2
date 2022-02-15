const router = require("express").Router()
const Dog = require("../models/Dog.model")
const User = require('./../models/User.model')
const {isLoggedIn, CheckRole, checkRole} = require('./../middleware/route-guard')
const {isOwner, isCare, isAdmin, isSameUser} = require('./../utils/index')
const { response } = require("express")





router.get('/profile/:id/edit', isLoggedIn, checkSameUser, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/edit-profile', {
            user,

        }))
        .catch(err => console.log(err))
})
//care list
router.get('/care',isLoggedIn,checkRole('OWNER','ADMIN'),(req,res,next)=>{
    User
    .find({role:'CARE'})
    .then(cares=> res.render('care-list',{cares}))
    .catch(err=>console.log(err))
})

router.post('/profile/:id/edit', isLoggedIn, checkSameUser, (req, res, next) => {

    const { id } = req.params
    const { username, email, phone, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, phone, description })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log(err))
})



// Editar Perro

router.get('/profile/:id/edit/dog/:dog_id', isLoggedIn, checkSameUser, checkRole('OWNER'), (req, res, next) => {

    const { dog_id } = req.params

    Dog
        .findById(dog_id)
        .then(dog => res.render('user/edit-dog', { user: req.session.currentUser, dog }))
        .catch(err => console.log(err))
})

router.post('/profile/:id/edit/dog/:dog_id', isLoggedIn, checkSameUser, checkRole('OWNER'), (req, res, next) => {

    const { dog_id } = req.params
    const { name, age, description } = req.body

    Dog
        .findByIdAndUpdate(dog_id, { name, age, description })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log(err))
})


//Eliminar

router.post('/profile/:id/delete', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/register'))
        .catch(err => console.log(err))
})



module.exports = router