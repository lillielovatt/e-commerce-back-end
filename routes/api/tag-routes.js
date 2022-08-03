const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET /api/tags
router.get("/", (req, res) => {
    Tag.findAll({
        include: {
            model: Product,
            // attributes: ["id", "product_name", "price", "stock", "category_id"],
            through: ProductTag,
        },
    })
        .then((dbTagData) => res.json(dbTagData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/tags/1
router.get("/:id", (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: Product,
            // attributes: ["id", "product_name", "price", "stock", "category_id"],
            through: ProductTag,
        },
    }).then((dbTagData) => {
        if (!dbTagData) {
            res.status(404).json({ message: "No tag found with this id" });
            return;
        }
        res.json(dbTagData);
    });
});

// POST /api/tags
router.post("/", (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name,
    })
        .then((dbTagData) => res.json(dbTagData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/tags/1
router.put("/:id", (req, res) => {
    Tag.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((dbTagData) => {
            if (!dbTagData[0]) {
                res.status(400).json({ message: "No tag found with this id" });
                return;
            }
            res.json(dbTagData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/tags/1
router.delete("/:id", (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbTagData) => {
            if (!dbTagData) {
                res.status(400).json({ message: "No tag found with this id" });
                return;
            }
            res.json(dbTagData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
