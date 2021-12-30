import Head from 'next/head';
import {useState, useEffect, Component} from 'react';
import { withRouter } from 'next/router'
import axios from 'axios';
import { useCookies } from "react-cookie"
import Router from 'next/router';

class Home extends Component{
  state = {
    user : null,
    token: null
  }
  
  
  render(){
  return(<h1>adbjask</h1>)}
}


export default withRouter(Home)