import Head from 'next/head';
import Link from 'next/link'
import {useState} from 'react';
import axios from 'axios';
const bcrypt = require('bcryptjs');
import Router from 'next/router'


export default function Home() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    
    const alreadyLoggedIn = () => {
      if (typeof window !== "undefined") {
            if(window.localStorage.getItem('nextToken') !== null && window.localStorage.getItem('nextUser') !==null){
                Router.push("/home");
            }
      }
    }
    alreadyLoggedIn();
    
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }
    const handleSubmit = async(event) => {
      event.preventDefault();
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt)
      let response = await axios.post("http://localhost:3000/api/register",{data:{email:email,password:hashPassword}});
      console.log(response.data);
      if(response.data.status === 0){
        setError(response.data.msg);
      }else{
        Router.push("/");
      }
    }

    const Errors = () =>{
      return <p className="error-red">{error}</p>
    }


  return (
    <div>
    <Head><title>register</title></Head>
      <form className="auth-form" method="POST" onSubmit={handleSubmit}>
        <h1>Create new Account</h1>
        <div className="input-box">
          <input onChange={handleEmailChange} value={email} type="text" autoComplete="off" name="email" required />
          <label className="label">
            <span className="span">Email Id / Phone Number</span>
          </label>
        </div>
        <div className="input-box">
          <input onChange={handlePasswordChange} value={password} type="password" autoComplete="off" name="password" required />
          <label className="label">
            <span className="span">password</span>
          </label>
        </div>
          <input id="submit" type="submit"/>
    </form>
    <p className="other-link">
        Already have an account 
        <Link href='/'> Login</Link>
      </p>
    </div>
  )
}


