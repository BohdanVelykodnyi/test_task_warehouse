const {Router} = require('express');
const User = require('../models/Keys');
const  router = Router();

// /api/add_key

router.post('/add_key', async (req, res)=>{

    try {
        const {key , warehouse} = req.body;

        const candidate = await  User.findOne({ key });

        if(candidate){
            res.status(400).json({ message: "Такий ключ вже існує" })
        }

        const new_key = new User({ key, warehouse });

        await new_key.save();

        res.status(201).json({ message: 'Ключ добавлено!'})

    } catch (error) {
        res.status(500).json({ message: "Что то пошлю не так, попробуйте снова", error});
        console.log(error)
    }
});

module.exports = router;