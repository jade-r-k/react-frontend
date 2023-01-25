import { useState } from 'react';
import axios from '../config';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Login } from '@mui/icons-material';

const Register = (props) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const styles = { color: "red", backgroundColor:"white" };

    const handleForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitForm = () => {

        //Register
        axios.post('/users/register', {
                name: form.name,
                email: form.email,
                password: form.password
            })
             .then((response) => {
                console.log(response);
                console.log(response.data);
                setErrorMessage("");

                //login if register is successful
                axios.post('/users/login', {
                    email: form.email,
                    password: form.password
                })
                 .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    setErrorMessage("");
                    props.onAuthenticated(true, response.data.token);
                    //navigate to home
                    navigate('/');
                 })
                 .catch((err) => {
                    console.error(err);
                    console.log(err.response);
                    console.log(err.response.data);
                    setErrorMessage(err.response.data.message);
                 });
                
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response);
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
             });
    };

    return (
        <>
            <div style={{textAlign: "center"}}>
                <h2>Register</h2>
                Name: <input type="text" name="name" value={form.name} onChange={handleForm} />
                <br />
                Email: <input type="text" name="email" value={form.email} onChange={handleForm} />
                <br />
                Password: <input type="password" name="password" value={form.password} onChange={handleForm} />
                <br />
                <br />
                <Button variant='contained' onClick={submitForm} endIcon={<Login />}>Register and Login</Button>
                <p style={styles}>{errorMessage}</p>
            </div>
        </>
    );
};

export default Register;