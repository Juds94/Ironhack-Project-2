const router = require("express").Router()
const bcrypt = require('bcrypt')
// const res = require("express/lib/response")
const Dog = require("../models/Dog.model")
const User = require('./../models/User.model')
const saltRounds = 10

//  SignUp Care


router.get('/register', (req, res, next) => res.render('auth/select-profile'))
router.get('/register/:role', (req, res, next) => {

    const { role } = req.params

    if (role === 'owner') {
        res.render('auth/signup-owner', { errorMessage: 'Por favor, rellena todos los campos requeridos' })
    } else if (role === 'care') {
        res.render('auth/signup-care', { errorMessage: 'Por favor, rellena todos los campos requeridos' })
    }

})


router.post('/register/:role', (req, res, next) => {

    const { role } = req.params
    const { username, password, description, email, phone } = req.body

    // console.log('REQ BODY ==>', req.body)

    if (!username || !password || !description || !email || !phone)
        res.redirect(`/register/${role}`)

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword, role: role.toUpperCase() }))
        .then(createdUser => {
            req.session.currentUser = createdUser
            if (createdUser.role === 'OWNER') {
                res.redirect('/dog/create')}
             else if (createdUser.role==='CARE'){
                res.redirect('/profile')
            }

        })
        .catch(error => next(error))
})

router.get('/dog/create', (req, res, next)=>{
    res.render('user/create-dog')
})
router.post('/dog/create',(req,res,next)=>{

    const id = req.session.currentUser._id
    const{name,age,size,description} = req.body

    Dog
        .create({ name, age, size, description, owner: id})
        .then(()=>res.redirect('/profile'))
        .catch(err=> console.log(err))
})
//Log In

router.get('/login', (req, res, next) => res.render('auth/login'))
router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/profile')
            }
        })
        .catch(error => next(error))
})

//log Out

router.post('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/login'))
})



module.exports = router
