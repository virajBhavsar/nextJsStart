const jwt = require('jsonwebtoken');
let Database = require('../config/keys.js');

const tokenCheck = (token) => {
    console.log(token);
    try{
        const verified = jwt.verify(token,Database.password);
        return ({done:true,data:verified.username});
    }catch(err){
    	console.log(err);
    }
    return ({done:false,data:'invalid token'});
    
}

module.exports = tokenCheck;