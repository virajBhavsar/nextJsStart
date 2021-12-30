let mysql = require('mysql');
let Database = require('../config/keys.js');
let connection = mysql.createConnection(Database);
const jwt = require('jsonwebtoken')
import tokenCheck from './tokenCheck';

const getData = (token,callback) => {
    console.log(token);
    let tokenResponse = tokenCheck(token);
    
    console.log(tokenResponse);
    
    if(tokenResponse.done){
        let query = `SELECT * FROM students`;
        connection.query(query,async (err,result,fields)=>{
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
}

export default function handler(req, res) {
    console.log(req.body)
    getData(req.body.data.token,(result) => {
        res.send(result);
    });
}