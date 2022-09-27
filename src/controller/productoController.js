import { Router } from 'express';
import { ProductoService } from '../service/productoService.js';

const router=Router();
const productoService = new ProductoService();


// GET REQUESTS
router.get("/getAll",async(req,res)=>{
    console.log(`This is a get operation`);
    console.log("1")
    const productos=await productoService.getAllProducts();
    return res.status(200).json(productos);
})


router.get('/:productName', async (req, res) => {
    console.log(`Request URL Param: ${req.params.productName}`);
    console.log(`This is a get operation`);
    console.log("2")
    const product = await productoService.getProductByName(req.params.productName);
  
    return res.status(200).json(product);
});

router.get('',async(req,res)=>{
    console.log(`Request URL Param: ${req.query.idProduct}`);
    console.log(`This is a get operation`);
    console.log("3")
  
    return res.status(200).json(product);
})


// POST REQUESTS
router.post('', async (req, res) => {
    console.log(`This is a post operation`);

    const product = await productoService.createProduct(req.body);
    return res.status(200).json(product)
  
});

router.post('/:id', async (req, res) => {
    console.log(`This is a get operation`);
    console.log(req.params.id,req.query.idDisorder)
    const user = await productoService.addDisorderByIdProduct(req.params.id,req.query.idDisorder);
  
    return res.status(200).json(user);
});


// PUT REQUESTS
router.put('/:id', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);
  
    const product = await productoService.updateProductById(req.params.id, req.body);
  
    return res.status(200).json(product);
});

// DELETE REQUESTS
router.delete('/:id', async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);
  
    const product = await productoService.deleteProductById(req.params.id);
  
    return res.status(200).json(product);
});

router.delete('/:idProduct/:idDisorder', async (req, res) => {
    console.log(`This is a delete operation`);
    console.log(req.params.idProduct,req.query.idDisorder)
    const user = await productoService.deleteDisorderByIdProduct(req.params.idProduct,req.params.idDisorder);
  
    return res.status(200).json(user);
});

export default router