var express = require('express');
var router = express.Router();
const rentalController = require('../controllers/rentalController');

/**
 * Listado de los alquileres
 */
router.get('/', rentalController.listRental);

router.post('/add', rentalController.addRental);

router.post('/', rentalController.editRental2);

router.post('/delete', rentalController.deleteRental);





module.exports = router;
