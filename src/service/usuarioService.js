import pkg from 'pg';
import config from '../../db.js'
import 'dotenv/config'

const { Pool } = pkg;
const userTable=process.env.DB_TABLA_USUARIO;
const userDisTable=process.env.DB_TABLA_USUARIOXDESORDEN

const pool = new Pool(
    {
        connectionString: process.env.DB_SERVER,
        ssl: {
            rejectUnauthorized: false
        }
    })

export class UserService{
    
    getAllUsers=async()=>{
        console.log('This is a function on the service');
        await pool.connect();

        let result = await pool.query()(`SELECT * 
                        FROM "${userTable}"`);

        return result.rows;
    }

    getUserById = async (id) => {
        console.log('This is a function on the service');

        await pool.connect();

        let result = await pool.query()(`SELECT *
                        FROM "${userTable}"
                        WHERE "idUser"='${id}'`)
        return result.rows;
    }


    createUser = async (user) => {
        console.log('This is a function on the service');
        await pool.connect();

        let result = await pool.query()(`INSERT INTO ${userTable}
                                         ("userName","userPassword","mail")
                                         VALUES
                                         ('${user.userName}','${user.userPassword}','${user.mail}')`);

        return result.rowCount;
    }

    updateUserById = async (id, user) => {
        console.log('This is a function on the service');

        await pool.connect();

        let result = await pool.query()(`UPDATE ${userTable} 
                                        SET "userName" = '${user.userName}', 
                                        "userPassword" ='${user.userPassword}', 
                                        "mail" = '${user.mail}' 
                                        WHERE "idUser"='${id}'`);
        
        return result.rowCount;
    }

    deleteUserById = async (id) => {
        console.log('This is a function on the service');

        await pool.connect();

        let result = await pool.query()(`DELETE FROM ${userTable} 
                                        WHERE "idUser"='${id}'`);
        
        return result.rowCount;
    }

    addDisorderByIdUser = async (idUser,idDisorder)=>{
        console.log('This is a function on the service');

        await pool.connect();

        let result = await pool.query()(`INSERT INTO ${userDisTable}
                                        ("idUser","idDisorder")
                                        VALUES
                                        ('${idUser}','${idDisorder}')`)
        return result.rowCount;
    }

    getDisorderByIdUser = async (idUser)=>{
        console.log('This is a function on the service');

        await pool.connect();

        let result = await pool.query(`SELECT idDisorder
                    FROM ${userDisTable}
                    WHERE ${userDisTable}.idUser='${idUser}'`)

        return result.rows;
    }

    deleteDisorderByIdUser = async (idUser,idDisorder) => {
        console.log('This is a function on the service');
        console.log(idUser,idDisorder)
        await pool.connect();

        let result = await pool.query()(`DELETE FROM ${userDisTable} 
                                        WHERE "idUser"='${idUser}' 
                                        AND "idDisorder"='${idDisorder}'`);
        return result.rowCount;
    }

    ableUserLogIn=async(mail,password)=>{
        console.log('This is a function on the service');
        await pool.connect();
        let result = await pool.query(`SELECT * 
                                    FROM ${userTable}
                                    WHERE mail=${mail} AND userPassword=${password}`);

        return result.rowCount;
    }
}