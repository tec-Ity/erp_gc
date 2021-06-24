import React ,{Component}from 'react'
import NavTop from '../a_global/NavTop'
import {fetchPost_Prom} from '../a_global/Api'
import {useHistory, withRouter} from 'react-router-dom'
import {useState} from 'react'


export default function LoginPage (props){

	return(
		<div className="">
			
			<div className="container tec-loginBox" style={{width:"400px"}}>
			<div className="text-center mt-5">
				<h2>Please Login</h2>
				{props.isValid===false && 
					<div className="alert alert-danger  mx-5 mt-4" role="alert" >
						<p className="font-weight-bold">Attention: Incorrect Username or Passoword</p>
					</div>}
			</div>
			<div className="row">
				<form autoComplete="off" className="col mt-4" onSubmit={props.handleLogin}>
					<div className="form-group">
						<label htmlFor="name">Username </label>
						<input type="text" id="codeIpt" className={props.isValid===false?"form-control is-invalid":"form-control"} placeholder="Enter Username"  name="username"  required/>
					</div>

					<div className="form-group">
						<label htmlFor="psw">Password</label>
						<input type="password"  className= {props.isValid===false?"form-control is-invalid":"form-control"} name="psw"  placeholder="Enter Password" required/>
					</div>

					<button type="submit" className="btn btn-primary w-100 mt-3"> Login</button>

					<div className="mt-3">
						<span className="mt-5"><a href="#">Forgot password?</a></span>
					</div>
				</form>
			</div>
		</div>
		</div>
	)
}




