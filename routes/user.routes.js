const router = require("express").Router()
const Dog = require("../models/dog.model")
const User = require('./../models/User.model')
const { isLoggedIn, checkRole, checkSameUser } = require('./../middleware/route-guard')
const { isOwner, isCare, isAdmin, isSameUser } = require('./../utils/index')
const apiHandler = require('./../api-handlers/dog-search-handler')
const dogSearch = new apiHandler()
const { response } = require("express")
const fileUploader = require('../config/cloudinary.config');




router.get('/profile', isLoggedIn, (req, res, next) => {
    req.app.locals.bgColor = 'violet'
    Dog
        .find({ owner: req.session.currentUser._id })
        .then(dogs => res.render('user/profile', { dogs, isOwner: isOwner(req.session.currentUser), user: req.session.currentUser }))
        .catch(err => next(err))

})



router.get('/profile/:id/edit', isLoggedIn, checkSameUser, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/edit-profile', {
            user,

        }))
        .catch(err => next(err))
})


router.post('/profile/:id/edit', isLoggedIn, checkSameUser, (req, res, next) => {

    const { id } = req.params
    const { username, phone, description } = req.body

    User
        .findByIdAndUpdate(id, { username, phone, description }, { new: true })
        .then((user) => {
            req.session.currentUser = user
            res.redirect('/profile')
        })
        .catch(err => next(err))
})




router.get('/profile/:id/edit/dog/:dog_id', isLoggedIn, checkSameUser, checkRole('OWNER'), (req, res, next) => {

    const { dog_id } = req.params

    Dog
        .findById(dog_id)
        .then(dog => res.render('user/edit-dog', { user: req.session.currentUser, dog }))
        .catch(err => next(err))
})

router.post('/profile/:id/edit/dog/:dog_id', isLoggedIn, checkSameUser, checkRole('OWNER'), (req, res, next) => {

    const { dog_id } = req.params
    const { name, age, description } = req.body

    Dog
        .findByIdAndUpdate(dog_id, { name, age, description })
        .then(() => res.redirect('/profile'))
        .catch(err => next(err))
})



router.post('/profile/:id/delete', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/register'))
        .catch(err => next(err))
})



router.get('/care', isLoggedIn, checkRole('OWNER', 'ADMIN'), (req, res, next) => {
    req.app.locals.bgColor = 'blue'
    User
        .find({ role: 'CARE' })
        .then(cares => res.render('user/care-list', { cares }))
        .catch(err => next(err))
})


router.get('/profile/contact/:id', isLoggedIn, checkRole("OWNER"), (req, res, next) => {
    req.app.locals.bgColor = 'brown'
    const { id } = req.params


    User
        .findById(id)
        .then(user => res.render('user/care-details', user))
        .catch(err => next(err))
})



module.exports = router