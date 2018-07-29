const express = require("express")

const router = express.Router()

let burger = require("../models/burger.js");

router.get("/", (req, res) => {
    burger.all((data) => {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", (req, res) => {
    console.log(req.body)
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], (data) => {
        res.redirect("/");
    });
});

router.put("/:id", (req, res) => {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        "devoured": req.body.devoured
    }, condition, () => {
        res.redirect("/");
    });
});

router.delete("/:id", (req, res) => {
    let condition = "id = " + req.params.id;

    burger.delete(condition, function() {
        res.redirect("/");
    });
});

module.exports = router;