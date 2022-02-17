const router = require("express").Router()
const User = require('./../models/User.model')
const Review = require('./../models/Review.model')
const { isLoggedIn, checkRole, checkSameUser } = require('./../middleware/route-guard')
const { isOwner, isCare, isAdmin, isSameUser } = require('./../utils/index')
const { response } = require("express")






// AQUÍ EL ENDPOINT DE CREAR UNA RESEÑA
// en todos los enlaces que pongáis en als vistas o en redirects
// o olvideis poner /review/wahteverrr

router.get('/create/:careId', isLoggedIn, checkRole('OWNER'), (req, res, next) => {

    const { careId } = req.params

    res.render('user/create-review', { careId })
})

router.post('/create/:careId', isLoggedIn, checkRole('OWNER'), (req, res, next) => {

    const owner = req.session.currentUser._id
    const { careId } = req.params
    const { text, rating } = req.body

    console.log(owner, careId, text, rating)

    if (rating > 10) {
        res.render('user/create-review', { errorMessage: 'Por favor, la puntuación máxima debe ser 10' })
    }

    Review
        .create({ owner, text, rating, receiver: careId })
        .then(() => res.redirect('/care'))// mirar ¿como podemos postear en el perfil del CARE?
        .catch(err => console.log(err))
})


router.get('/:careId', isLoggedIn, (req, res, next) => {

    const { careId } = req.params

    console.log(careId)

    Review
        .find({ receiver: careId })
        .populate('owner')
        .then(reviews => res.render('user/care-reviews', { reviews }))
        .catch(err => console.log(err))

})

// Editar Reviews

// router.get('/edit/:id', isLoggedIn, checkRole('OWNER', 'ADMIN'), (req, res, next) => {

//     const {id} = req.params

//     Review
//     .findById(id)
//     .then(review =>)
// })






//delete solo el Admin

// router.post('/profile/:id', isLoggedIn,checkRole('ADMIN'),(req,res,next)=>{
// //necesitamso la info del perfil del Care para localizar el ID y poder accodeer a sus valores


// })

module.exports = router