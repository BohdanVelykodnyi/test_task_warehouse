const {Router} = require('express');
const Key = require('../models/Keys');
const  router = Router();

// /api/my_keys

router.get('/my_keys', async  (req, res) => {
   try{
       const filter = {};
       const all = await Key.find();
       res.status(201).json({ your_keys: all})

   } catch (error) {
       res.status(500).json({ message: "Щось пішло не так, попробуйте знов", error});
       console.log(error)
   }
});

// /api/add_key

router.post('/add_key', async (req, res)=>{

    try {
        const {key , warehouse} = req.body;

        const candidate = await  Key.findOne({ key });

        if(candidate){
            res.status(400).json({ message: "Такий ключ вже існує" })
        }

        const new_key = new Key({ key, warehouse });

        await new_key.save();

        res.status(201).json({ message: 'Ключ добавлено!'})

    } catch (error) {
        res.status(500).json({ message: "Щось пішло не так, попробуйте знов", error});
        console.log(error)
    }
});

// /api/swipe_key

router.put('/swipe_key', async (req, res)=>{
    try {
        const {key , warehouse} = req.body;

        await  Key.updateOne({key: key }, {warehouse: warehouse}, function(err, result){

            if(err) return console.log(err);
            console.log(result);
        });

        res.status(201).json({ message: 'Cклад змінено!'})

    } catch (error) {
        res.status(500).json({ message: "Щось пішло не так, попробуйте знов", error});
        console.log(error)
    }
});

module.exports = router;
