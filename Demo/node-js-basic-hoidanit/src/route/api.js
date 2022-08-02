import express from 'express';
import APIcontroller from '../controller/APIcontroller';

let router = express.Router();

const initAPIRoute = (app) =>{
    router.get('/users', APIcontroller.getAllUsers); // method get -> READ data
    router.post('/create-user',APIcontroller.createUser); //method post -> CREATE user
    router.delete('/delete-user/:id',APIcontroller.deleteUser); //method delete -> DELETE user
    router.put('/update-user',APIcontroller.updateUser); //method put -> UPDATE user

    return app.use('/api/v1/', router);
}

export default initAPIRoute;