import axios from '../../config';
import { useState, useEffect } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import Grid from '@mui/material/Grid';

const Index = (props) => {
    const [ restaurants, setRestaurants ] = useState(null);

    // Get all restaurants from API
    useEffect(() => {
        axios.get('/restaurants')
             .then((response) => {
                 console.log(response.data);
                 setRestaurants(response.data);
             })
             .catch((err) => {
                 console.error(err);
             });
    }, []);

    // Say loading while waiting for response
    if(!restaurants) return 'Loading...';

    const deleteCallback = (id) => {
        let restaurantsNew = restaurants.filter(restaurant => {
            return restaurant._id !== id;
        });

        setRestaurants(restaurantsNew);
    };

    // Display a list of restaurants using the restaurant card
    const restaurantsList = restaurants.map((restaurant) => {
        return <RestaurantCard key={restaurant._id} restaurant={restaurant} authenticated={props.authenticated} callback={deleteCallback}/>;
    });

    return (
        <>
        <h1 style={{textAlign: "center"}}>Restaurants</h1>
        <Grid container spacing={2}>
            { restaurantsList }
        </Grid>
        </>
    );
};

export default Index;