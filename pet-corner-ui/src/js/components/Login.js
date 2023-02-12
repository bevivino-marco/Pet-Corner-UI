import React from 'react';
import callAjax from '../lib/Ajax';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../lib/Path';

export default function Login({success, setSuccess, setContent, setLoggedIn, setUsername}) {
    const [error, setError] = React.useState("");

    const ref_email = React.createRef();
    const ref_password = React.createRef();    

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

    return (
        <>
            {success !== '' && <div className='success'>{success}</div> }
            {error !== '' && <div className='error'>{error}</div> }
            <h2>Login</h2>
            <div className="login-container">
                <label htmlFor="email"><b>Email</b></label>
                <div>
                    <input type="text" ref={ref_email} placeholder="Inserisci Email" name="email" id="email" required />
                </div>   
                <label htmlFor="psw"><b>Password</b></label>
                <div>                    
                    <input type="password" ref={ref_password} placeholder="Inserisci Password" name="psw" id="psw" required />
                </div>                
                <button className="btn btn-outline-dark" onClick={() => {LoginClick();}}>Login</button>
                <p onClick={() => { setContent("Registration")}}>Non sei ancora registrato? Iscriviti <b>qui</b></p>
                <div className='other-login-container'>
                    <h6>Oppure</h6>
                    <a className="btn btn-outline-dark" href={GOOGLE_AUTH_URL} role="button">
                        <img width="20px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        Login with Google
                    </a>
                    <a className="btn btn-outline-dark" href={FACEBOOK_AUTH_URL} role="button">
                        <img width="20px" alt="Facebook sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/900px-Facebook_logo_%28square%29.png" />
                        Login with Facebook
                    </a>
                </div>
            </div>
        </>        
    );
}