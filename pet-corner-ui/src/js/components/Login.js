import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import callAjax from '../lib/Ajax';

export default function Login() {
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
        
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: "post",
            url: "http://localhost:9000/api/v1/login",
            dataType: "json",
            cache: false,
            data: JSON.stringify({                
                username: ref_email.current.value,
                password: ref_password.current.value,
            }), 
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
            }
        };
        callAjax(options);
    }

    return (
        <>
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
                <button className="register-button" onClick={() => {LoginClick();}}>LOGIN<ArrowRightIcon /></button>
            </div>
        </>        
    );
}