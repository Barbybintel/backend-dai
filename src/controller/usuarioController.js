import { Router } from 'express';
import { UsuariorService } from '../services/usuarioService.js';

const router=Router();
const usuarioService = new UsuarioService();

router.get("/",async(req,res)=>{
    console.log(`This is a get operation`);

    const users=await usuarioService.getAllUsers();
    return res.status(200).json(users);
})

router.get('/:id', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);
  
    const user = await usuarioService.getUserById(req.params.id);
  
    return res.status(200).json(user);
});

router.get('/disorders/:id', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);
  
    const disorders = await usuarioService.getDisorderByIdUser(req.params.id);
  
    return res.status(200).json(disorders);
});

router.get('/logIn', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);
  
    const disorders = await userService.ableUserLogIn(req.params.mail,req.params.password);
  
    return res.status(200).json(disorders);
});

router.post('/:id', async (req, res) => {
    console.log(`This is a get operation`);
  
    const user = await userService.addDisorderByIdUser(req.params.id,req.query.idDisorder);
  
    return res.status(200).json(user);
});

router.post('', async (req, res) => {
    console.log(`This is a post operation`);

    const user = await userService.createUser(req.body);
    return res.status(200).json(user)
  
});

router.put('/:id', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);
  
    const user = await userService.updateUserById(req.params.id, req.body);
  
    return res.status(200).json(user);
});

router.delete('/:id', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);
  
    const user = await userService.deleteUserById(req.params.id);
  
    return res.status(200).json(user);
});

router.delete('/:idUser/:idDisorder', async (req, res) => {
    console.log(`This is a delete operation`);
    console.log(req.params.idUser,req.query.idDisorder)
    const user = await userService.deleteDisorderByIdUser(req.params.idUser,req.params.idDisorder);
  
    return res.status(200).json(user);
});

export default router