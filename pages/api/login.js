let mysql = require('mysql');
let Database = require('../config/keys.js');
let connection = mysql.createConnection(Database);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function isUser(name,password,callback){
    let query = `SELECT * FROM user WHERE username="${name}"`;
    let secretToken = Database.password;
    connection.query(query,async (err,result,fields)=>{
            if (err) throw err;
            if(result.length === 0){
                callback({status:0,msg:"user dosen't exist"});
            }else{
                let userIsValid = await bcrypt.compare(password,result[0].password);
                if(userIsValid){
                    const token = jwt.sign({ username: name }, secretToken);
                    callback({status:1,msg:"user varified and logged in",token:token,name:name});
                }else{
                    callback({status:0,msg:"username and password not maching",token:null,name:null});
                }
            }
    })
}

export default function handler(req, res) {
    isUser(req.body.data.email,req.body.data.password,(status)=>{
        console.log(status)
        res.send(status);
    });

}