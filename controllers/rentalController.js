/**
 * 
 * Rental controller: funcionalidad de alquilera
 * 
 **/
const connection = require('../config/db.js');

let rentalController = {};

/**
 * Muestra el listado de los usuarios
 * router.get('/', userController.userList);
 */
rentalController.listRental = (_req, res) =>{
    let queryRentalFilms = `select rent.rent_id,DATE_FORMAT(rent.rent_data, '%d-%m-%Y')as date ,customer.name, customer.last_name, customer.user_id, movie.movie_id, movie.title from rent, customer, movie where rent.user_id = customer.user_id and rent.movie_id = movie.movie_id order by rent.rent_id DESC`;

    console.log('---------- GET => /rentals ----------------');

    connection.query(queryRentalFilms, (err, dataRental) =>{
        if (err) throw err;

        let queryAllFilm = `select movie_id, title from movie order by title`;
        connection.query(queryAllFilm, (err, dataMovie) =>{
            if (err) throw err;
            let queryAllUser = `select user_id, name, last_name from customer order by name`;
            connection.query(queryAllUser, (err, dataUser) =>{
                if (err) throw err;
                
            res.render('rental/rentalList',{dataRental, dataOneRental : 'null', dataMovie, dataUser });
        }) 
    })
})
}

/**
 * Añadir un nuevo alquiler o actualiza
 * router.post('/add', rentalController.addRental);
 */
rentalController.addRental = (req, res) =>{

    console.log('---------------- POST => /rentals/add ----------');
    console.log(req.body);
    var queryInsertMovie = '';
    var dataMovie = [];

    if(req.body.rental_id != ''){
        //actualiza
        queryInsertMovie = `UPDATE rent set user_id=?, movie_id=? WHERE rent_id =?`
        dataMovie = [req.body.user, req.body.film, req.body.rental_id];
    }
    else{
        //inserta
        queryInsertMovie = `INSERT INTO rent(user_id, movie_id) VALUES(?,?)`
        dataMovie = [req.body.user, req.body.film];
    }

    connection.query(queryInsertMovie,dataMovie,(err,_result) =>{
        if (err) throw err;
        res.redirect('/rentals');
    })
}

/**
 * Carga los datos en el formario de aquiler para poder editarlo
 * router.post('/', rentalController.editRental2);
 */
rentalController.editRental2 = (req, res) =>{
    
    console.log('POST => /rentals' + req.body.rental_id);

    let queryRentalFilms = `select rent.rent_id,DATE_FORMAT(rent.rent_data, '%d-%m-%Y')as date ,customer.name, customer.last_name, customer.user_id, movie.movie_id, movie.title from rent, customer, movie where rent.user_id = customer.user_id and rent.movie_id = movie.movie_id order by rent.rent_id DESC`;

    connection.query(queryRentalFilms,(err,dataRental) =>{
        if (err) throw err;
        let queryOneRental = `select * from rent where rent_id = ${req.body.rental_id}`;  

        connection.query(queryOneRental,(err,dataOneRental) =>{
            if (err) throw err;
            let queryAllFilm = `select movie_id, title from movie order by title`;
            connection.query(queryAllFilm, (err, dataMovie) =>{
                if (err) throw err;
                let queryAllUser = `select user_id, name, last_name from customer order by name`;
                connection.query(queryAllUser, (err, dataUser) =>{
                    if (err) throw err;
                    console.log(dataOneRental);
                    console.log(dataRental);
                    console.log(dataMovie);
                    res.render('rental/rentalList',{dataOneRental : dataOneRental[0], dataRental, dataMovie, dataUser});
                }) 
            })
        })
    })
}

/**
 * Elimina un alquiler pasado por parametro
 * router.get('/delete', userController.deleteRental);
 */
rentalController.deleteRental = (req, res) => {

    console.log('---------- POST => /rentals/delete  ---------');

    let queryDeleteRental = `delete from rent where rent_id = ${req.body.rental_id}`;
    connection.query(queryDeleteRental, (err, _result) =>{
        if (err) throw err;
        res.redirect('/rentals'); 
    })
  
}

module.exports = rentalController;