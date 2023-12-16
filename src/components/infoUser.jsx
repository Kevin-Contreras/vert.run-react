import { useEffect, useState } from 'react';
import '../index.css';
import { athlete } from '../api/api';
import { activity } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import Activities from './activities';
import { addActivities } from '../redux/activitiesSlice';
import '../css/infoUser.css';
import Loader from './loader';

function InfoUser() {
  // State to hold user information
  let [info, setInfo] = useState({});

  // Redux dispatch function
  let dispatch = useDispatch();

  // Fetch user and activity data when the component mounts
  useEffect(() => {
    usuarioData();
  }, []);

  // Selector to get activities from Redux state
  let activities = useSelector((state) => {
    return state.activities;
  });

  // Function to fetch user and activity data
  let usuarioData = async () => {
    // Fetch user data
    let usuario = await fetch(athlete, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    // Fetch activity data
    let actividades = await fetch(activity, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    // Parse JSON data
    let data = await usuario.json();
    let dataActivity = await actividades.json();

    // Dispatch user and activity data to Redux state
    dispatch(addUser(data));
    dispatch(addActivities(dataActivity));

    // Set user information in local state
    setInfo(data);
  };

  return (
    <div className='center'>
      {/* Display Loader component if user information is not available, otherwise display user information and activities */}
      {info.firstname === undefined ? (
        <Loader />
      ) : (
        <div>
          <h1 className='title'>Hi {info.firstname + ' ' + info.lastname}, These are your most recent activities</h1>
          <Activities data={activities} />
        </div>
      )}
    </div>
  );
}

export default InfoUser;
