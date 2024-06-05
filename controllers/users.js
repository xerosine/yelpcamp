const User = require('../models/User')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const newUser = await User.register(user, password)
        req.login(newUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds')
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) next(err)
        req.flash('success', 'Successfully logged out!')
        res.redirect('/campgrounds')
    })
}