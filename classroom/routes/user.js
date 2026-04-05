const express=require("express");
const router=express.Router();

//Index
router.get("/",(req,res)=>{
    res.send("GET for user");
})

router.get("/:id",(req,res)=>{
    res.send("GET for user id");
})

router.post("/",(req,res)=>{
    res.send("GET for user");
})

router.delete("/user/:id",(req,res)=>{
    res.send("Delete for user id");
})

module.exports=router;