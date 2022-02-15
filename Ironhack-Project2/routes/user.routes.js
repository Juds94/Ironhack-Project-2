const router = require("express").Router()
const Dog = require("../models/Dog.model")
const User = require('./../models/User.model')
const {isLoggedIn, CheckRole, checkRole} = require('./../middleware/route-guard')
const {isOwner, isCare, isAdmin, isSameUser} = require('./../utils/index')

router.get('/profile', isLoggedIn, (req, res, next) =>{
   
    res.render('user/profile', { user: req.session.currentUser})
})

router.get('/profile/:id/edit', isLoggedIn, (req, res, next)=>{

    const {id} = req.params

    User
    .findById(id)
    .then(user => res.render('user/edit-profile',{
        user,
        isSameUser:isSameUser(id, req.session.currentUser._id),
    }))
    .catch(err => console.log(err))
})


// router.post('/profile/:id/edit', isLoggedIn, (req, res, next)=>{
//    const{id}=req.params
//    const{phone,description,}
//    User.findById(id)
//        .then(user => res.render('user/edit-profile',{user}))
// }


//Eliminar

router.post('/profile/:id/delete', isLoggedIn, checkRole('ADMIN'),(req,res,next)=>{
    const {id}=req.params

    User
    .findByIdAndDelete(id)
    .then(()=>res.redirect('/register'))
    .catch(err=>console.log(err))
})

module.exports = router