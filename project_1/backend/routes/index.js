const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const {body} = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");

const router = new Router();

router.post("/registration", 
	body("email").isEmail(),
	body("password").isLength({min: 8, max: 32}),
	userController.registration);

router.post("/update",	
	body("email").isEmail(),
	body("phone").isLength({min: 12, max:12})
				 .matches(/\+7[0-9]{10}$/),
	body("surname").exists({checkFalsy: true}),
	body("name").exists({checkFalsy: true}),
 	userController.update);

router.post("/updatePassword",
	body("password").isLength({min: 8, max: 32}),
 	userController.updatePassword);

router.post("/logIn", userController.logIn)
router.post("/logOut", userController.logOut);
router.post("/activation", userController.activation);
router.get("/mainPage", userController.getRooms);
router.get("/roomsPage", userController.getOneRoom);
router.get("/userCheck", userController.userCheck);
router.get("/refresh", userController.refresh);
router.get("/activation/:link");

module.exports = router;
