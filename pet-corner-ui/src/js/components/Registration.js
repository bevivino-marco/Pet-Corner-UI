import React, {useState} from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import callAjax from '../lib/Ajax';

export default function Registration() {
    const [error, setError] = useState("");

    const ref_name = React.createRef();
    const ref_CF = React.createRef();
    const ref_country = React.createRef();
    const ref_city = React.createRef();
    const ref_address = React.createRef();
    const ref_email = React.createRef();
    const ref_password1 = React.createRef();
    const ref_password2 = React.createRef();

    function RegistrationClick() {
        setError('');

        //controllo password
        if(ref_password1.current.value === '' || ref_password1.current.value === null || ref_password1.current.value === ' '){
            //password non sicura
            setError("La password non soddisfa i requisiti di complessità");
            return;
        }
        if(ref_password1.current.value !== ref_password2.current.value){
            //password non combacianti
            setError("Password non uguali");
            return;
        } 
        
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: "post",
            url: "http://localhost:9000/api/v1/user/save",
            dataType: "json",
            cache: false,
            data: JSON.stringify({
                name: ref_name.current.value,
                username: ref_email.current.value,
                password: ref_password1.current.value,
                roles: [],
                cod_fisc: ref_CF.current.value,
                piva: "",
                country : ref_country.current.value,
                city: ref_city.current.value,
                address: ref_address.current.value
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
            <h1>Registrazione</h1>
            <p>Inserisci i tuoi dati per creare un account</p>
            <div className="registration-container">            
                <div>
                    <label htmlFor="name"><b>Nome</b></label>
                    <input type="text" ref={ref_name} placeholder="Inserisci nome" name="name" id="name" required />
                </div>                              
                <div>
                    <label htmlFor="CF"><b>Codice Fiscale</b></label>
                    <input type="text" ref={ref_CF} placeholder="Inserisci codice fiscale" name="CF" id="CF" required />
                </div>
                <div>
                    <label htmlFor="country"><b>Paese</b></label>
                    <input type="text" ref={ref_country} placeholder="Inserisci paese" name="country" id="country" required />
                </div>
                <div>
                    <label htmlFor="city"><b>Città</b></label>
                    <input type="text" ref={ref_city} placeholder="Inserisci città" name="city" id="city" required />
                </div>
                <div>
                    <label htmlFor="address"><b>Indirizzo</b></label>
                    <input type="text" ref={ref_address} placeholder="Inserisci indirizzo" name="address" id="address" required />
                </div>
                <div>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" ref={ref_email} placeholder="Inserisci Email" name="email" id="email" required />
                </div>   
                <div>
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" ref={ref_password1} placeholder="Inserisci Password" name="psw" id="psw" required />
                </div> 
                <div>
                    <label htmlFor="psw-repeat"><b>Ripeti Password</b></label>
                    <input type="password" ref={ref_password2} placeholder="Ripeti Password" name="psw-repeat" id="psw-repeat" required />
                </div>
                <button className="register-button" onClick={() => { RegistrationClick();}}>REGISTRATI<ArrowRightIcon /></button>
            </div>
        </>
        
    );
}