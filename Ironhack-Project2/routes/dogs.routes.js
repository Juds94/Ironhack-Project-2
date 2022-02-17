const router = require("express").Router()
const Dog = require("../models/Dog.model")
const User = require('./../models/User.model')
const { isLoggedIn, checkRole, checkSameUser } = require('./../middleware/route-guard')
const { isOwner, isCare, isAdmin, isSameUser } = require('./../utils/index')
const apiHandler = require('./../api-handlers/dog-search-handler')
const dogSearch = new apiHandler()

router.get('/search', (req, res) => {

    if (!req.query.breed) {
        res.render('user/search-dog')
    } else {

        const dogPromise = dogSearch.getOneDog(req.query.breed)
        const allDogsPromise = dogSearch.getAllDogs()

        Promise.all([dogPromise, allDogsPromise])
            .then(data => {
                const dog = data[0].data[0]
                const allDogs = data[1].data

                const desiredDogFromArray = allDogs.filter(elm => {
                    return elm.reference_image_id === dog.reference_image_id
                })

                const desiredDog = desiredDogFromArray[0]

                res.render('user/search-dog', desiredDog)
                
            })
            .catch(err => next(err))

    }


})

module.exports = router