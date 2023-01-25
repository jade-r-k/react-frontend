import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config';
import { useEffect, useState } from 'react';
import RestaurantSingle from '../../components/RestaurantSingle';

const Show = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ restaurant, setRestaurant] = useState(null);

    let token = localStorage.getItem('token');

    const deleteCallback = (id) => {
        navigate('/restaurants');
    };

    useEffect(() => {
        //get restaurant by id
        axios.get(`/restaurants/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
             .then((response) => {
                 console.log(response.data);
                 setRestaurant(response.data);
             })
             .catch((err) => {
                 console.error(err);
                 console.log(err.response.data.message);                 
             });
    }, [token, id]);

    if(!restaurant) return "Loading...";

    return (
        //using restaurantSingle component to display
        <RestaurantSingle key={restaurant._id} restaurant={restaurant} authenticated={props.authenticated} callback={deleteCallback}/>
    );
};

export default Show;