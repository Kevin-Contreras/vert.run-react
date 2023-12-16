import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { token } from '../api/api';
import { athlete } from '../api/api';
import { activity } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { addTokens } from '../redux/tokenSlice';
import '../css/activities.css';
import Activities from './activities';
import { useParams } from 'react-router-dom';
import { addActivities } from '../redux/activitiesSlice';

function ItemsForMonth() {
    // Redux dispatch function
    let dispatch = useDispatch();

    // Get the 'id' parameter from the URL using useParams
    const { id } = useParams();

    // Navigation function
    let navigate = useNavigate();

    // Dispatch tokens to Redux state
    dispatch(addTokens({token: localStorage.getItem("token"), refresh_token: localStorage.getItem("refresh_token")}));

    // Select activities data from Redux state
    let data = useSelector((state) => {
        return state.activities;
    });

    // Set activities data in local storage
    localStorage.setItem("item", JSON.stringify(data.activities));

    // Effect hook to perform actions after component mount
    useEffect(() => {
        // Check if activities data is empty and navigate to "/activitiesForMonth"
        if (data.activities.length === 0) {
            navigate("/activitiesForMonth");
            // Perform specific actions after the reload
        }
    }, []);

    return (
        <div className='center'>
            {/* Loop through activities data and display Activities component for the specified month */}
            {data.activities.map((item) => {
                console.log(item);
                if (item.month === id) {
                    return <Activities data={{ activities: item.items }} />;
                }
            })}
        </div>
    );
}

export default ItemsForMonth;
