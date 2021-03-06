const express = require('express');
// const router = require('./productRoutes');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')

// router.get('/fakeuser',async(req,res)=>{
//     const user=new User({
//         username:'Tushar',
//         email:"tushar@gmail.com"
//     })

//     const newuser=await User.register(user,"tushar12");
//     res.send(newuser);

// });

router.get('/register', (req, res) => {
    res.render('auth/signup');
})
router.post('/register', async (req, res) => {
    try {
        const { username, email, password,number } = req.body;
        const user = new User({
            username: username,
            email: email,
            number:number
        })

        const newuser = await User.register(user, password);
        req.flash('success', `Welcome ${username} Please login to continue`);
        res.redirect('/login');
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }

})
router.get('/login', (req, res) => {
    res.render('auth/login');
})
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res) => {
        const { username } = req.user;
        req.flash('success', `Welcome back ${username}`)
        res.redirect('/products');
    });

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out successfully');
    res.redirect('/login');

})

module.exports = router;
