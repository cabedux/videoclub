var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.userList);

router.get('/new',userController.newUser);

router.post('/add', userController.addUser);

router.get('/edit/:userid', userController.viewUser);

router.post('/update/:userid', userController.updateUser);

router.get('/delete/:userid', userController.deleteUser);








module.exports = router;