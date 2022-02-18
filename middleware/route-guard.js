const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/login')
        return
    }
    next()
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login', {
        errorMessage: `Solo puedes ver la lista de cuidadores si estás registrado con un perfil de dueño`
    })
}

const checkSameUser = (req, res, next) => {
    if (req.session.currentUser._id != req.params.id) {
        res.redirect('/login')
        return
    }
    next()

}
module.exports = {
    isLoggedIn, checkRole, checkSameUser
}