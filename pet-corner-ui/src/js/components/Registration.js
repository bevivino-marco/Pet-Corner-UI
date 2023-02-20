import React, { useState } from "react";
import callAjax from "../lib/Ajax";

export default function Registration({ setContent, setSuccess }) {
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
    setError("");

    //controllo password
    if (
      ref_password1.current.value === "" ||
      ref_password1.current.value === null ||
      ref_password1.current.value === " "
    ) {
      //password non sicura
      setError("La password non soddisfa i requisiti di complessità");
      return;
    }
    if (ref_password1.current.value !== ref_password2.current.value) {
      //password non combacianti
      setError("Password non uguali");
      return;
    }

    let options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      type: "post",
      url: "http://localhost:8765/profile/v2/user/save",
      dataType: "json",
      cache: false,
      data: JSON.stringify({
        name: ref_name.current.value,
        username: ref_email.current.value,
        password: ref_password1.current.value,
        roles: [],
        cod_fisc: ref_CF.current.value,
        piva: "",
        country: ref_country.current.value,
        city: ref_city.current.value,
        address: ref_address.current.value,
      }),
      success: function(response) {
        setSuccess("Account creato correttamente! Procedi con il login");
        setContent("Login");
      },
      error: function(jqXHR, exception) {
        var msg = "";
        if (jqXHR.status === 0) {
          msg = "Not connect.\n Verify Network.";
        } else if (jqXHR.status === 404) {
          msg = "Requested page not found. [404]";
        } else if (jqXHR.status === 500) {
          msg = "Internal Server Error [500].";
        } else if (exception === "parsererror") {
          msg = "Requested JSON parse failed.";
        } else if (exception === "timeout") {
          msg = "Time out error.";
        } else if (exception === "abort") {
          msg = "Ajax request aborted.";
        } else {
          msg = "Uncaught Error.\n" + jqXHR.responseText;
        }
        setError(msg);
      },
    };
    callAjax(options);
  }

  return (
    <>
      {error !== "" && <div className="error">{error}</div>}
      <h1>Registrazione</h1>
      <p>Inserisci i tuoi dati per creare un account</p>
      <div className="registration-container">
        <div>
          <input
            type="text"
            ref={ref_name}
            placeholder="Inserisci nome"
            name="name"
            id="name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            ref={ref_CF}
            placeholder="Inserisci codice fiscale"
            name="CF"
            id="CF"
            required
          />
        </div>
        <div>
          <input
            type="text"
            ref={ref_country}
            placeholder="Inserisci paese"
            name="country"
            id="country"
            required
          />
        </div>
        <div>
          <input
            type="text"
            ref={ref_city}
            placeholder="Inserisci città"
            name="city"
            id="city"
            required
          />
        </div>
        <div>
          <input
            type="text"
            ref={ref_address}
            placeholder="Inserisci indirizzo"
            name="address"
            id="address"
            required
          />
        </div>
        <div>
          <input
            type="text"
            ref={ref_email}
            placeholder="Inserisci Email"
            name="email"
            id="email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            ref={ref_password1}
            placeholder="Inserisci Password"
            name="psw"
            id="psw"
            required
          />
        </div>
        <div>
          <input
            type="password"
            ref={ref_password2}
            placeholder="Ripeti Password"
            name="psw-repeat"
            id="psw-repeat"
            required
          />
        </div>
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            RegistrationClick();
          }}
        >
          Registrati
        </button>
      </div>
    </>
  );
}
