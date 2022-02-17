const router = require("express").Router()
const Dog = require("../models/Dog.model")
const User = require('./../models/User.model')
const { isLoggedIn, checkRole, checkSameUser } = require('./../middleware/route-guard')
const { isOwner, isCare, isAdmin, isSameUser } = require('./../utils/index')
const apiHandler = require('./../api-handlers/dog-search-handler')
const dogSearch = new apiHandler()

router.get('/search', (req, res) => {
    req.app.locals.bgColor = 'violet'
    dogSearch

        .getOneDog(req.query.breed)
        .then(response => {
            const dog = response.data[0]
            res.render('user/search-dog', dog)
        })
        .catch(err => console.log(err))

})

module.exports = router