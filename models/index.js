// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// product tag references tag models id (tag_id)
// product tag references product models id (product_id)
// product references category models id (category_id)

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: "category_id",
    // onDelete:'CASCADE'
});

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
    through: ProductTag,
    // as: "product_tag",
    foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    // as: "product_tag", why didn't this work?? based on module, "voted_posts"
    foreignKey: "tag_id",
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};
