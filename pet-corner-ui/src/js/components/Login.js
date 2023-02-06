import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import callAjax from '../lib/Ajax';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

export default function Login({success, setSuccess, setContent, setLoggedIn, setUsername}) {
    const [error, setError] = React.useState("");

    const ref_email = React.createRef();
    const ref_password = React.createRef();

    React.useEffect(() => {
    },[]);

    function LoginClick() {
        setError('');
        
        //controllo campi
        if(ref_email.current.value === '' || ref_email.current.value === null || ref_email.current.value === ' '){
            //email non inserita
            setError("Username mancante");
            return;
        }
        //controllo campi
        if(ref_password.current.value === '' || ref_password.current.value === null || ref_password.current.value === ' '){
            //password non inserita
            setError("Password mancante");
            return;
        }

        const formData = new FormData();
        formData.append('username', ref_email.current.value);
        formData.append('password', ref_password.current.value);

        let options = {
            headers: null,
            type: "post",
            url: "http://localhost:8765/profile/v2/login",
            dataType: null,
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                setSuccess('');
                sessionStorage.setItem("access_token", "Bearer "+response.access_token);
                sessionStorage.setItem("refresh_token","Bearer "+response.refresh_token);
                setLoggedIn(true);
                setUsername(ref_email.current.value);
                setContent('Profile');
            }, 
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status === 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status === 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                setError(msg);
            }
        };
        callAjax(options);
    }

    function LoginGoogle(response) {
        var token = response.credential;
        setSuccess('');
        sessionStorage.setItem("access_token", "Bearer " + token);
        setLoggedIn(true);
        var jwt = jwt_decode(response.credential);
        console.log(jwt);
        setUsername(jwt.email);
        setContent('Profile');
    }

    return (
        <>
            {success !== '' && <div className='success'>{success}</div> }
            {error !== '' && <div className='error'>{error}</div> }
            <h1>Login</h1>
            <div className="login-container">
                <div>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" ref={ref_email} placeholder="Inserisci Email" name="email" id="email" required />
                </div>   
                <div>
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" ref={ref_password} placeholder="Inserisci Password" name="psw" id="psw" required />
                </div>                
                <button className="login1-button" onClick={() => {LoginClick();}}>Login<ArrowRightIcon /></button>
                <div className='other-login-container'>
                    <h3>Oppure</h3>
                <GoogleLogin onSuccess={credentialResponse => { LoginGoogle(credentialResponse); }} onError={() => { console.log('Login Failed');}} />
                </div>
            </div>
        </>        
    );
}