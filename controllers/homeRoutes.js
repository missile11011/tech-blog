const router = require("express").Router();

router.get("/", async (req, res) =>{
    try {
        res.render("homepage", {
    })
    } catch(e){
        res.status(500).json(e)
    }
    
})

module.exports = router;