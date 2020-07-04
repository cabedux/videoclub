const connection = require('../config/db.js');

let movieController = {};

movieController.listMovie = (_req, res) => {
    console.log('GET => /movies');
    
    let queryAllMovies = `select * from movie `;

    connection.query(queryAllMovies, (err, dataMovie) => {
        if (err) console.log(err);
        res.render('movie/movielist', {dataMovie});
    })
}

movieController.newMovie = (_req, res) =>{
    console.log('GET => /movies/newMovie');
    
    res.render('movie/newMovie');
}

movieController.addMovie = (req, res) =>{
    console.log('POST => /movies/add');
    let queryInsertMovie = `INSERT INTO movie(title, description, release_date, gender) VALUES(?,?,?,?)`
    let dataMovie = [req.body.title, req.body.description, req.body.date, req.body.gender];
    connection.query(queryInsertMovie,dataMovie,(err,_result) =>{
        if (err) throw err;
        res.redirect('/movies');
    })
}

movieController.editMovie = (req, res) =>{
    let movieId = req.params.movieId;

    console.log('GET => /movies/edit/' + movieId);

    let queryOneMovie = `select * from movie where movie_id = ${movieId}`;
;
    connection.query(queryOneMovie,(err,dataMovie) =>{
        if (err) throw err;
        res.render('movie/editMovie',{dataMovie : dataMovie[0]});
    })
}

movieController.saveEditMovie = (req, res) =>{
    let movieId = req.params.movieId;

    console.log('POST => /movies/edit/' + movieId);

    let queryUpdateMovie = `update movie set title=?, description=?,  release_date=?, gender=? where movie_id = ${movieId}`;
    let dataMovie = [req.body.title, req.body.description, req.body.date,req.body.gender];
;
    connection.query(queryUpdateMovie, dataMovie, (err,_result) =>{
        if (err) throw err;
        res.redirect('/movies');
    })
}

movieController.deleteMovie = (req, res) =>{
    let movieId = req.params.movieId;

    console.log('GET => /movies/delete/' + movieId);

    let queryDeleteMovie = `Delete from movie where movie_id = ${movieId}`;

    connection.query(queryDeleteMovie, (err,_result) =>{
        if (err) throw err;
        res.redirect('/movies');
    })
}

//http://localhost:3000/movies/title?search=kkk
movieController.search = (req, res) =>{ 

    let querySearchMovie = `select * from movie where title like '%${req.query.search}%' or gender like '%${req.query.search}%' or description like '%${req.query.search}%' or release_date like '%${req.query.search}%'`;
    connection.query(querySearchMovie, (err,dataSearch) =>{
        if (err) throw err;
        res.render('movie/searchMovie',{dataSearch});
    })
}

module.exports = movieController;