const router = require("express").Router();
const ApiHandler = require('./../api-handlers/dog-facts-handler')
const dogsFacts = new ApiHandler()


router.get("/", (req, res, next) => {
 

  dogsFacts
    .getFact()
    .then(response => res.render('index', {facts:response.data}))
    .catch(err => console.log(err))

});


module.exports = router
