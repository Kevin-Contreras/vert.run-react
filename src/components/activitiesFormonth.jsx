import { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import '../index.css'
import { activity } from '../api/api';
import {useDispatch} from "react-redux"
import { addTokens } from '../redux/tokenSlice';
import "../css/activities.css"
import Loader from './loader';
import { addActivities } from '../redux/activitiesSlice';



function ActivitiesForMonth() {
  let dispatch = useDispatch()
  
  let datos = []
let dataSave = []

  let [datosState,setDatosState] = useState([])
  let [arrayCounters,setArrayCounter] = useState(0)

  let contador =0

  dispatch(addTokens({token:localStorage.getItem("token"),refresh_token:localStorage.getItem("refresh_token")}))
  
  useEffect(()=>{
// Obtener la fecha actual
contador++
if(contador ==1){
    const today = new Date();

    // Calcular el primer día del mes actual
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfCurrentMonthInSeconds = Math.floor(firstDayOfCurrentMonth / 1000);
    
    // Calcular el último día del mes actual
    const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const endOfCurrentMonthInSeconds = Math.floor(lastDayOfCurrentMonth / 1000);
    
    // Calcular el primer día del mes anterior
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const startOfLastMonthInSeconds = Math.floor(firstDayOfLastMonth / 1000);
    
    // Calcular el último día del mes anterior
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const endOfLastMonthInSeconds = Math.floor(lastDayOfLastMonth / 1000);
    
    // Calcular el primer día del mes antepasado
    const firstDayOfTwoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const startOfTwoMonthsAgoInSeconds = Math.floor(firstDayOfTwoMonthsAgo / 1000);
    
    // Calcular el último día del mes antepasado
    const lastDayOfTwoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    const endOfTwoMonthsAgoInSeconds = Math.floor(lastDayOfTwoMonthsAgo / 1000);
    
    // Obtener los nombres de los meses
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
    let arrayLast = []
    arrayLast.push(endOfCurrentMonthInSeconds)
    arrayLast.push(endOfLastMonthInSeconds)
    arrayLast.push(endOfTwoMonthsAgoInSeconds)
    
    let arrayFirst = []
    arrayFirst.push( startOfCurrentMonthInSeconds)
    arrayFirst.push( startOfLastMonthInSeconds)
    arrayFirst.push( startOfTwoMonthsAgoInSeconds)
    
    
    
    let month = []
    month.push(monthNames[today.getMonth()])
    month.push(monthNames[firstDayOfLastMonth.getMonth()])
    month.push( monthNames[firstDayOfTwoMonthsAgo.getMonth()])
    
    
    for (let index = 0; index < 3; index++) {
    
        api(arrayLast[index],arrayFirst[index],month[index],index)
    
        
    }


}


  },[])

    let api = async (last,first,month,index)=>{
      let forMonth = await fetch(activity+`?before=${last}&after=${first}`,{
      
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              "Authorization":"Bearer "+localStorage.getItem("token")
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        
        })
        let data =await forMonth.json()
        let distancia =0
        let time = 0
        let elevation_gain=0 
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            distancia += element.distance
            time +=element.elapsed_time
            elevation_gain +=element.total_elevation_gain
            
        }
        datos.push({distancia:distancia,time:time,elevation_gain:elevation_gain,month:month,items:data})
        let datosNuevo = [...datos, { distancia, time, elevation_gain, month, items: data }];
        datosNuevo.pop()

        dispatch(addActivities(datosNuevo))
        distancia=0
        time =0
        elevation_gain=0
        dataSave.push(data)
   

        setDatosState(datos)
        setArrayCounter(datos.length)
        
    }

  return (
      <div className='center'>
        <h1>ACTIVITIES FOR MONTH</h1>
        
        {(arrayCounters!=3)?<Loader/>:datosState.map((info,index)=>{
           
                return  <NavLink to={"/month/"+info.month}>

<div   class="ag-courses_item">
                <a class="ag-courses-item_link"  >
                  <div class="ag-courses-item_bg"></div>
                  <div class="ag-courses-item_title">{info.month}</div>
                  <div class="ag-courses-item_date-box">
                  DISTANCE   
                    <span class="ag-courses-item_date"> {info.distancia}m  </span>
                  </div>
                  <div class="ag-courses-item_date-box">
                  TIME  
                    <span class="ag-courses-item_date"> {info.time}s  </span>
                  </div>
                  <div class="ag-courses-item_date-box">
                  ELEVATION AGAIN 
                    <span class="ag-courses-item_date"> { info.elevation_gain}m </span>
                  </div>
                </a>
              </div>
          
                </NavLink> 
           
          

        })}
          </div>
          
        
       
     
   
     
  )
}

export default ActivitiesForMonth
