var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movieController');

/**
 * Muestra el listado de peliculas
 */
router.get('/', movieController.listMovie);

router.get('/new', movieController.newMovie);

router.post('/add', movieController.addMovie);

router.get('/edit/:movieId', movieController.editMovie);

router.post('/edit/:movieId', movieController.saveEditMovie);

router.get('/delete/:movieId', movieController.deleteMovie);

router.get('/search', movieController.search);

module.exports = router;
