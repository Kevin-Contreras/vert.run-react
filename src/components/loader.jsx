import { useEffect, useState } from 'react'

import {redirect} from 'react-router-dom'
import '../index.css'
import { token } from '../api/api';
import { athlete } from '../api/api';
import { activity } from '../api/api';
import {useSelector,useDispatch} from "react-redux"
import { addUser } from '../redux/userSlice';
import "../css/loader.css"



function Loader() {


    
 
  return (
<div>
<span class="loader"></span>
<h1 className='loading'> Loading .....</h1>
</div>
     
  )
}

export default Loader
