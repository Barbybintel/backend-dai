import pkg from 'pg';
import config from '../../db.js'
import 'dotenv/config'


const productoTable=process.env.DB_TABLA_PRODUCTO;
const productoDisTable=process.env.DB_TABLA_PODUCTOXDESORDEN;
const disorderTable=process.env.DB_TABLA_DESORDEN;

const { Pool } = pkg;
const pool = new Pool(
    {
        connectionString: process.env.DB_SERVER,
        ssl: {
            rejectUnauthorized: false
        }
    })

export class ProductoService{

    getAllProductos=async()=>{
        console.log('This is a function on the service');
        const { Pool } = pkg;
        const pool = new Pool(
            {
                connectionString: process.env.DB_SERVER,
                ssl: {
                    rejectUnauthorized: false
                }
            })

        let result = await pool.query(`SELECT * 
                                        FROM "${productoTable}"`);

        return result.rows;
    }


    createProducto = async (producto) => {
        console.log('This is a function on the service');
        await pool.connect();
        let result = await pool.query(`INSERT INTO "${productoTable}" ("productoname","productoimage")
                                        VALUES ('${producto.productoName}', '${producto.productoImage}')`);

        return result.rowCount;
    }

    updateProductoById = async (id, producto) => {
        console.log('This is a function on the service');
        console.log(producto)
        await pool.connect();
        let result = await pool.query(`UPDATE "${productoTable}" 
                                       SET "productoname" = '${producto.productname}', "productoimage" = '${producto.productoimage}'
                                       WHERE "idproducto"='${id}'`)
        return result.rowCount;
    }

    deleteProductoById = async (id) => {
        console.log('This is a function on the service');
        await pool.connect();
        let result = await pool.query(`DELETE FROM "${productoTable}"
                                        WHERE "idproducto"='${id}'`);
        return result.rowCount;
    }

    addDisorderByIdProducto = async (idProducot,idDisorder)=>{
        console.log('This is a function on the service');
        await pool.connect();
        let result = await pool.query(`INSERT INTO "${productoDisTable}"
                                        ("idproducto","iddisorder")
                                        VALUES
                                        ('${idProducto}','${idDisorder}')`)
        return result.rowCount;
    }

    deleteDisorderByIdProduct = async (idProduct,idDisorder) => {
        console.log('This is a function on the service');
        await pool.connect();
        let result = await pool.query(`DELETE FROM "${productoDisTable}" 
                                        WHERE idproducto='${idProducto}' 
                                        AND iddisorder='${idDisorder}'`);
        console.log(response)
        return result.rowCount;
    }

    getDisorderByProductoId = async (idProducto)=>{
        await pool.connect();
        let result = await pool.query(`SELECT p."productoname", d."namedisorder"
                                       FROM "${productTable}" p
                                       INNER JOIN "${productoDisTable}" pd ON p."idproducto"=pd."idproducto"
                                       INNER JOIN "${disorderTable}" d ON  d."iddisorder"=pd."iddisorder"
                                       WHERE p."idproducto"=${idProducto}`)
        return result.rows;
    }

    getProductoByName=async(productoName)=>{
        console.log('This is a function on the service');
        console.log(productoName)
        await pool.connect();
        let result = await pool.query(`SELECT * 
                                       FROM "${productoTable}" 
                                       WHERE LOWER ("productoname") = LOWER ('${productoName}')`);
                                       
        return result.rows;
    }
}