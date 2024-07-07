import express from "express";
const router = express.Router({ mergeParams: true });

router.get("/1", (req,res) => {
    res.render('blogs/natas/1')
})

router.get("/2",(req,res) => {
    res.render('blogs/natas/2')
})

export {router}