import { useState, useEffect } from 'react';
import axios from '../../config';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { SettingsOverscanOutlined } from '@mui/icons-material';
import {Link} from 'react-router-dom';

const Edit = () => {
    const [ restaurant, setRestaurant] = useState(null);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    let token = localStorage.getItem('token');

    useEffect(() => {
        //Get restaurant by id to fill form with existing restaurant data
        axios.get(`/restaurants/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
             .then((response) => {
                 console.log(response.data);
                 setRestaurant(response.data);
                 //due to the address object I couldn't set form to the response data as
                 //the response object was different from the form object and both were being put causing errors
                 //setForm(response.data);
             })
             .catch((err) => {
                 console.error(err);
                 console.log(err.response.data.message);                 
             });
    }, [token, id]);

    const handleForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const isRequired = (fields) => {
        let error = false;

        fields.forEach(field => {
            if(!form[field]){
                error = true;
                setErrors(prevState => ({
                    ...prevState,
                    [field]: {
                        message: `${field} needs to be edited!`
                    }
                }));
            }
        });

        return error;
    };

    const submitForm = () => {

        //due to not being able to set form all the fields have to be edited in order to put

        if(!isRequired(['name', 'cuisine', 'borough', 'address.building', 'address.street', 'address.zipcode'])){

            axios.put(`/restaurants/${id}`, form, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
            })
             .then(response => {
                console.log(response.data);
                navigate(`/restaurants/${id}`);
             })
             .catch(err => {
                console.error(err);
                console.log(err.response.data.message)
                setErrors(err.response.data.errors);
             });
        }

    };



    

    if(!restaurant) return "Loading...";



    return (
        <>
        <div style={{textAlign: "center"}}>
            <h1>Edit Restaurant</h1>

            <h3>Basic</h3>
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='Name' 
                    name='name'
                    onChange={handleForm}
                    error={errors.name}
                    helperText={errors.name?.message}
                    defaultValue={restaurant.name}
                />
            </div>
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='Cuisine' 
                    name='cuisine' 
                    onChange={handleForm}
                    error={errors.cuisine}
                    helperText={errors.cuisine?.message}
                    defaultValue={restaurant.cuisine}
                />
            </div>
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='Borough' 
                    name='borough' 
                    onChange={handleForm}
                    error={errors.borough}
                    helperText={errors.borough?.message}
                    defaultValue={restaurant.borough}
                />
            </div>
            <h3>Address</h3>
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='Building' 
                    name='address.building' 
                    onChange={handleForm}
                    error={errors.building}
                    helperText={errors.building?.message}
                    defaultValue={restaurant.address.building}
                />
            </div>
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='Street' 
                    name='address.street' 
                    onChange={handleForm}
                    error={errors.street}
                    helperText={errors.street?.message}
                    defaultValue={restaurant.address.street}
                />
            </div>
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='Zipcode' 
                    name='address.zipcode' 
                    onChange={handleForm}
                    error={errors.zipcode}
                    helperText={errors.zipcode?.message}
                    defaultValue={restaurant.address.zipcode}
                />
            </div>
            <br/>
            <Button onClick={submitForm} variant='contained'>Submit</Button>
            <Button color='error' variant='contained' component={Link} to={`/restaurants/${id}`}>Back</Button>
            </div>
        </>
    );
};

export default Edit;