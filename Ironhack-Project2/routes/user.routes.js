const router = require("express").Router()
const Dog = require("../models/Dog.model")
const User = require('./../models/User.model')
const { isLoggedIn, checkRole, checkSameUser } = require('./../middleware/route-guard')
const { isOwner, isCare, isAdmin, isSameUser } = require('./../utils/index')
const apiHandler = require('./../api-handlers/dog-search-handler')
const dogSearch = new apiHandler()
const { response } = require("express")
const fileUploader = require('../config/cloudinary.config');


//Perfil


router.get('/profile', isLoggedIn, (req, res, next) => {

    Dog
        .find({ owner: req.session.currentUser._id })
        .then(dogs => res.render('user/profile', { dogs, isOwner: isOwner(req.session.currentUser), user: req.session.currentUser }))
        .catch(err => console.log(err))

})

// Editar perfil Ususario


router.get('/profile/:id/edit', isLoggedIn, checkSameUser, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('user/edit-profile', {
            user,

        }))
        .catch(err => console.log(err))
})


router.post('/profile/:id/edit', isLoggedIn, checkSameUser, (req, res, next) => {

    const { id } = req.params
    const { username, email, phone, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, phone, description }, { new: true })
        .then((user) => {
            req.session.currentUser = user
            res.redirect('/profile')
        })
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


//Buscar perros




// Lista de Cares


router.get('/care', isLoggedIn, checkRole('OWNER', 'ADMIN'), (req, res, next) => {
    User
        .find({ role: 'CARE' })
        .then(cares => res.render('user/care-list', { cares }))
        .catch(err => console.log(err))
})

// AQUÍ EL ENDPOINT DE VER LOS DETALLES DEL CARE

router.get('/profile/contact/:id', isLoggedIn, checkRole("OWNER"), (req, res, next) => {

    const {id} = req.params

    
  
    User
        .findById(id)
        .then(user => res.render('user/care-details', user))
        .catch(err => console.log(err))
})






// nos falta el endpoint para ver cada uno de los perfiles de un care
// ese endpoint va a renderizar una vista con la info del care
// con las reseñas de ese care
// y con un formulario para dejar una review
// ese form va a llevar al endpoint de crear una reseña
// en ese endpoint de crear una reseña (que va en review.routes)
// crearemos una reseña con la info que nos viene del form etc. 
// y luego redirigimos a la misma página en la que deberá aparecer ya la reseña nueva

module.exports = router