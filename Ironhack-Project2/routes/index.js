const router = require("express").Router();
const { response } = require("express");
const ApiHandler = require('./../api-handlers/dog-facts-handler')
const dogsFacts = new ApiHandler()
/* GET home page */
router.get("/", (req, res, next) => {
 

  dogsFacts
    .getFact()
    .then(response => res.render('index', {facts:response.data}))
    .catch(err => console.log(err))

});


module.exports = router;
