/**
 * 
 * Usuario controller: funcionalidad de usuarios
 * 
 **/
const connection = require('../config/db.js');

let userController = {};

/**
 * Muestra el listado de los usuarios
 * router.get('/', userController.userList);
 */
userController.userList = (_req, res) =>{
    let queryUser = `select * from customer`;

    console.log('---------- GET => /users ----------------');

    connection.query(queryUser, (err, dataUsers) =>{
        if (err) throw err;
        res.render('user/listUsers',{dataUsers});
    })

}

/**
 * Muestra la vista del formulario de registro nuevo user
 * router.get('/new',userController.newUser);
 */
userController.newUser = (_req,res) => {
    console.log('------------- GET => /users/new ---------------');

    res.render('user/newUser');
}

/**
 * Añade nuevo usuario 
 * router.post('/add',  userController.addUser);
 */
userController.addUser = (req,res) => {

    console.log('------------------- POST => /users/add ---------------');

    let queryNewUser =  `insert into customer(name, last_name, dni, address, phone) 
    values(?,?,?,?,?)`;
    let data = [req.body.name, req.body.lastName, req.body.dni, req.body.address, req.body.phone ];

    connection.query(queryNewUser, data, (err, result)=>{
        if (err) throw err;
        res.redirect('/users');
    })
}

/**
 * Muestra la vista con los datos de un usuario
 * router.get('/edit/:userid', userController.viewUser);
 */
userController.viewUser = (req, res) =>{

    console.log('---------- GET => /users/edit/' + req.params.userid +' ---------');

    let queryUser =  `select * from customer where user_id = '${req.params.userid}'`;

    connection.query(queryUser, (err, dataUser) =>{
        if(err) throw err;
        console.log(dataUser[0]);
        res.render('user/editUser', {dataUser : dataUser[0]})
    })
}

/**
 * Actualiza los datos de un usuario
 * router.post('/update/:userid', userController.updateUser);
 */
userController.updateUser = (req, res) => {
  
    console.log('---------- POST => /users/update/' + req.params.userid +' ---------');
    
    let queryUpdateUser = `update customer set name=?, last_name=?, dni=?, phone=?, address=?  where user_id =?`;
    let dataUser = [req.body.name, req.body.lastName,req.body.dni, req.body.phone,req.body.address, req.params.userid]; 

    connection.query(queryUpdateUser, dataUser, (err,_result) => {
        if (err) throw err;
        res.redirect('/users');
    })    
    
}

/**
 * Elimina un usuario pasado por parametro
 * router.get('/delete/:userid', userController.deleteUser);
 */
userController.deleteUser = (req, res) => {

    console.log('---------- GET => /users/delete/' + req.params.userid +' ---------');

    let queryDeleteUser = `delete from customer where user_id = ${req.params.userid}`;
    connection.query(queryDeleteUser, (err, _result) =>{
        if (err) throw err;
        res.redirect('/users'); 
    })
  
}

module.exports = userController;