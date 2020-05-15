const {Router} = require('express');
const bcrypt =  require('bcryptjs');
const User = require('../models/User');
const config = require(("config"));
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const {check, validationResult} = require(('express-validator'));
const  router = Router();

// /tes

router.get('/test', async(req , res)=>{
    res.status(201).json({ message: '200 request is ' })
});


// /testPost

router.post('/test_post',async (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    try {
        const email = req.body;
        console.log(email);
        res.status(200).json({ message: "done", email});
    } catch (e) {
        console.log(e)
    }
});

// /api/auth/register

router.post('/register',
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Некоректный password').isLength({min:6}),
    ],
    async (req, res)=>{

    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Некоректные данные"
            })
        }

        const {email , password} = req.body;

        const candidate = await  User.findOne({ email });

        if(candidate){
            res.status(400).json({ message: "Такой пользователь уже существует" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'User created'})

    } catch (error) {
        res.status(500).json({ message: "Что то пошлю не так, попробуйте снова", error});
        console.log(error)
    }
});

// /api/auth/login

router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите password').exists(),
    ],
    async (req, res)=>{
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоректные данные"
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({ email });

            if(!user){
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch){
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            res.json({token , userId: user.id})

        } catch (error) {
            res.status(500).json({ message: "Что то пошлю не так, попробуйте снова"})
        }
});

module.exports = router;