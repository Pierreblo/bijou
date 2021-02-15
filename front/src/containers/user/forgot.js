import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {forgotPassword} from '../../api/user'

const Forgot = (props)=>{
    const [email, setEmail] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(null);
	const onSubmitForm = ()=>{
	       let data = {
	           email: email
	       }
	      forgotPassword(data)
	      .then((response)=>{
	          console.log(response);
	          setError(response.msg);
	      })
	}
    
    return (
        <div className="page">
		    {redirect && <Redirect to="/" />}
			<h2>Mot de passe oublié</h2>
			{error !== null && <p className="errorMsg">{error}</p>}
				<div>
					<form 
					    className="formulaire"
					    onSubmit={(e)=>{
						e.preventDefault();
						onSubmitForm();
						}}
					>
						<input 
							type="text" 
							placeholder="Mon mail"
							onChange={(e)=>{  
							setEmail(e.currentTarget.value);
							}}
						/>
							<button className="button" type="submit">Envoyer un nouveau mot de passe</button>
						</form>
					</div>
				</div>
    )
}

export default Forgot