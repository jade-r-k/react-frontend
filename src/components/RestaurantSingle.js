import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

//mui
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid'

import DeleteBtn from './DeleteBtn';
import { CardHeader } from '@mui/material';
// import axios from 'axios'; import { useNavigate } from 'react-router-dom';

const RestaurantCard = (props) => {
    //placeholder image if restaurant doesnt have image
    let image = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    //make image equal to the stored s3 image if the restaurant has one
    if (props.restaurant.image_path !== "https://restaurant-ca1-bucket.s3.eu-west-1.amazonaws.com/undefined"){
        image = `${props.restaurant.image_path}`
    }
    let title = <p>
        {props.restaurant.name}
    </p>;

    let delBtn = "";
    if (props.authenticated) {
        delBtn = <DeleteBtn
            id={props.restaurant._id}
            resource='restaurants'
            callback={props.callback}/>;
    }

    let editBtn = "";
    if (props.authenticated) {
        editBtn = <Button
            component={Link}
            to={`/restaurants/${props.restaurant._id}/edit`}
            startIcon={< EditIcon />}
            variant='outlined'>
            Edit
        </Button>;
    }

    return (
        <Grid item xs={12}>
            <br/>
            <Button variant="contained" component={Link} to='/restaurants'>Back</Button>
            <br/>
            <br/>
            <Item>
            <Card>
                <CardHeader
                title={title}
                />
                <CardMedia
                    component="img"
                    height="250"
                    image={image}
                    alt="restaurant"
                    name="Hello"
                    />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <b>Cuisine: </b>{props.restaurant.cuisine}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Location: </b>{props.restaurant.borough}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <b>Address: </b>{props.restaurant.address.building}, {props.restaurant.address.street}, {props.restaurant.address.zipcode}
                    </Typography>
                    <br />
                    {editBtn}
                    {delBtn}
                </CardContent>
            </Card>
        </Item>
        </Grid>
    );
};

export default RestaurantCard;