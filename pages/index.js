import Head from 'next/head';
import Link from 'next/link'
import {useState} from 'react';
import axios from 'axios';
import Router from 'next/router';

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
      let response = await axios.post("http://localhost:3000/api/login",{data:{email:email,password:password}});
      console.log(response.data);
      if(response.data.status === 0){
        setError(response.data.msg);
      }else{
        window.localStorage.setItem('nextToken',response.data.token);
        window.localStorage.setItem('nextUser',response.data.name);
        Router.push("/home");
      }


    }
    const Errors = () =>{
      return <p className="error-red">{error}</p>
    }

  return (
    <div>
    <Head><title>login</title></Head>
      <form className="auth-form" method="POST" onSubmit={handleSubmit}>
        <h1>login to your accout</h1>
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
        don't have an account 
        <Link href='/register'> register</Link>
      </p>
    </div>
  )
}


