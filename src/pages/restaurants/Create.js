import { useState } from 'react';
import axios from '../../config';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/Textfield';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

const Create = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
                        message: `${field} is required!!!!`
                    }
                }));
            }
        });

        return error;
    };

    const submitForm = () => {

        //These values are required for form to post. Error handling.
        if(!isRequired(['name', 'cuisine', 'borough', 'address.building', 'address.street', 'address.zipcode'])){
            let token = localStorage.getItem('token');

            //create the restaurant
            axios.post('/restaurants', form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
            })
             .then(response => {
                console.log(response.data);
                //go to restaurants index
                navigate('/restaurants');
             })
             .catch(err => {
                console.error(err);
                console.log(err.response.data.message)
                setErrors(err.response.data.errors);
             });
        }

    };

    return (
        <>
        <div style={{textAlign: "center"}}>
            <h1>Create Restaurant</h1>

            <h3>Basic</h3>
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='Name' 
                    name='name' 
                    onChange={handleForm}
                    error={errors.name}
                    helperText={errors.name?.message}
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
                />
            </div>
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='City' 
                    name='borough' 
                    onChange={handleForm}
                    error={errors.city}
                    helperText={errors.city?.message}
                />
            </div>
            <h3>Address</h3>
            {/* Error handling doesnt work due to address object */}
            <div className='form-group'>
                <TextField 
                    variant='filled' 
                    label='Building' 
                    name='address.building' 
                    onChange={handleForm}
                    error={errors.building}
                    helperText={errors.building?.message}
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
                />
            </div>
            <br/>
            <Button onClick={submitForm} variant='contained'>Submit</Button>
            <Button color='error' variant='contained' component={Link} to={`/restaurants`}>Back</Button>
            </div>
        </>
    );
};

export default Create;