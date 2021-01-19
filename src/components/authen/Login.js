import React from 'react';
import { Link } from "react-router-dom";


function Login() {
    return (
        <div className="authen-container">
             <h1>Login</h1>
         <Link to="dashboard">Đăng nhập</Link>
        
        </div>
    )
}

export default Login
