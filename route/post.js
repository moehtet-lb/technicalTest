const express = require('express')

const router = express.Router()

// import controller methods
const { create, list, read, update, remove, signup } = require('../controllers/post')
const {requireSignin} = require('../controllers/auth');

router.post('/post', requireSignin, create); //* mean any endpoint *
router.get('/posts', list);
router.get('/post/:slug', read); //
router.put('/post/:slug',requireSignin, update); //
router.delete('/post/:slug',requireSignin, remove); //
router.post('/signup', signup)

router.get('/secret', requireSignin, (req, res) => {

    res.json({
        data: req.body
    });
});
module.exports = router;