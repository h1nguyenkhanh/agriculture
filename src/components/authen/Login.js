import React from 'react'
import { BrowserRouter as Router, Switch, Route,Link  } from "react-router-dom";


function Login() {
    return (
        <>
         <h1>Login</h1>
         <Link to="dashboard">Dashboard</Link>
        </>
    )
}

export default Login
