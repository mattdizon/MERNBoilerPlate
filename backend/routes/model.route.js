const express = require(`express`)
    //middleware for express
const router = express.Router()
const Obj = require(`../models/Object.model`)

//Get all subs
router.get(`/`, async(req,res) =>{
    try{
    // await since async method
        const objects = await Obj.find()
        res.json(objects)
    } catch(err){
        //set status so user knows the error
        res.status(500).json({message:err.message})
    }

})
//Get one sub
router.get(`/:id`,getObject,(req,res) =>{
    res.json(res.obj)
})
//Create sub
router.post(`/`,async(req,res) =>{
    const obj = new Obj({
        name: req.body.name
    })
    try{
        const newObj = await obj.save()
        res.status(201).json(newObj)
    }catch(err){
        // 400 error since it is a user err
        res.status(400).json({message:err.message})
    }
})
//Update sub
router.patch(`/:id`,getObject,async(req,res) =>{
    if(req.body.name != null){
        res.obj.name = req.body.name
    }
    try {
        const updatedObj = await res.subscriber.save()
        res.json(updatedObj)
    } catch (e) {
        res.status(400).json({message: e.message})
    }

})
//Delete Sub
router.delete(`/:id`,getObject, async (req,res) =>{
    try {
        await res.obj.remove()
        res.json({message: 'Deleted User'})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

// crete a middleware function to get subcriber for the id functions
async function getObject(req, res, next){
    let obj
    try {
        obj = await Obj.findById(req.params.id)
        if(obj == null)
        return res.status(404).json({message:'user not found'})
    } catch (e) {
        return res.status(500).json({message:e.message})
    }
    res.obj = obj
    next()
}
module.exports = router
