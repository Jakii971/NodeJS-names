const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
})

let instance = null;

connection.connect((err) => {
    if (err){
        console.log(err.message);
    }
    // console.log('db' + connection.state);
})

class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(){loadHTMLTable
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = 'SELECT * FROM names;';

                connection.query(query, (err,result) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(result); //!ini baru ditambah
                });
            });
            return response;
        } catch(error){
            console.log(error);
        }
    }
    async insertNewName(name){
        try{
            const dateAdded = new Date();
            const result = await new Promise((resolve, reject) =>{
                const query = 'INSERT INTO names (name, date_added) VALUES (?,?)';

                connection.query(query, [name, dateAdded],(err,result) => {
                    if(err) reject(new Error(err.message));
                    // resolve(result.insertId);
                    resolve(result);
                })
            });
            return { insertId: result.insertId, name: name, dateAdded: dateAdded };
            // return {
            //     id: insertId,
            //     name: name,
            //     dateAdded: dateAdded
            // }
        } catch(error){
            console.log(error);
            return null;
        }
    }
    async deleteRowById(id){
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) =>{
                const query = 'DELETE FROM names WHERE id = ?';

                connection.query(query, [id], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows > 0);
                    // resolve(result);
                })
            });
            return response;
            // return response === 1 ? true : false;
        } catch(error){
            console.log(error);
            return false;
        }
    }
    async updateNameById(id, name){
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) =>{
                const query = 'UPDATE names SET name = ? WHERE id = ?';

                connection.query(query, [name, id], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows > 0);
                    // resolve(result.affectedRows);
                })
            });
            // return response === 1 ? true : false;
            return response;
        } catch(error){
            console.log(error);
            return false;
        }
    }
    async searchByName(name){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = 'SELECT * FROM names WHERE name = ?;';

                connection.query(query, [name], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch(error){
            console.log(error);
            return null;
        }
    }

}

module.exports = DbService;