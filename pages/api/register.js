let mysql = require('mysql');
let Database = require('../config/keys.js');
let connection = mysql.createConnection(Database);

function isUser(name,password,callback){
    let query = `SELECT username FROM user WHERE username="${name}"`;
    connection.query(query,(err,result,fields)=>{
            if (err) throw err;
            console.log(result);
            if(result.length === 0){
                enjectData(name,password);
                callback({status:1,msg:"inserting Data"});
            }else{
                callback({status:0,msg:"already exist"});
                console.log("already exist");
            }
    })
}

function enjectData(name,password){
    let query = `INSERT INTO user VALUES("${name}","${password}")`
        connection.query(query,(err,result,fields)=>{
            if (err) throw err;
            console.log(result);
        }) 
}

export default function handler(req, res) {
    isUser(req.body.data.email,req.body.data.password,(status)=>{
        console.log(status)
        res.send(status);
    });

}