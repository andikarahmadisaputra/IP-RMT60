const CategoryController = require("../controllers/CategoryController");
const router = require("express").Router();
const cors = require("cors");
router.use(cors());

router.post("/categories", CategoryController.createCategory);
router.put("/categories/:id", CategoryController.updateCategoryById);

module.exports = router;
