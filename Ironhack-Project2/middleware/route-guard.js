const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/login')
        return
    }
    next()
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', {
        errorMessage: `Desautorizado, solo rol ${admittedRoles}`
    })
}
module.exports = {
    isLoggedIn, checkRole
}