
import '../index.css';
import {  useDispatch } from 'react-redux';
import '../css/activities.css';

function Activities(props) {
  // Redux dispatch function
  let dispatch = useDispatch();

  // Log the activities data to the console
  console.log(props.data.activities);

  // Set activities data in local storage
  localStorage.setItem('item', JSON.stringify(props.data.activities));

  return (
    <div>
      {/* Log the parsed item from local storage to the console */}
      {console.log(JSON.parse(localStorage.getItem('item')))}
      {/* Map through activities data and display information for each activity */}
      {props.data.activities.map((info) => {
        return (
          <div class="ag-courses_item">
            <a class="ag-courses-item_link" href="#">
              <div class="ag-courses-item_bg"></div>
              <div class="ag-courses-item_title">{info.name}</div>
              <div class="ag-courses-item_date-box">
                DATE 
                <span class="ag-courses-item_date"> {info.start_date_local} </span>
              </div>
              <div class="ag-courses-item_date-box">
                DISTANCE 
                <span class="ag-courses-item_date"> {info.distance}m  </span>
              </div>
              <div class="ag-courses-item_date-box">
                TIME 
                <span class="ag-courses-item_date"> {info.elapsed_time}s  </span>
              </div>
              <div class="ag-courses-item_date-box">
                ELEVATION AGAIN 
                <span class="ag-courses-item_date"> {info.total_elevation_gain}m </span>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default Activities;
