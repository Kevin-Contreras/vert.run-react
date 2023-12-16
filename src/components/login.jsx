import { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom";
import '../index.css'
import {useSelector,useDispatch} from "react-redux"
import { auth } from '../api/api'
import { token } from '../api/api';
import { addUser } from '../redux/userSlice';
import fondo from "../img/fondo.jpeg"
import "../css/login.css"
function Login() {
  const [urlWeb, setUrlweb] = useState(0)
    let url = useSelector((state) => state.user.url)
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("token")
  localStorage.removeItem("item")

  return (
    <>
      <div className='main' >
        <div className='conteinerImg'>
          <img className="img"src={fondo} alt="" />
        </div>
        <div className='contenedor'>
        <h1>Iniciar Sesion</h1>
        <button  className="boton" onClick={() =>{
             window.location.replace(auth)

             
             } }>
         Login in STRAVA
        </button>
        </div>
     
      
      </div>
     
    </>
  )
}

export default Login
