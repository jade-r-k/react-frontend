import { useState } from 'react';
import axios from '../config';
import Button from '@mui/material/Button';
import { Login } from '@mui/icons-material';

const LoginForm = (props) => {
    const [form, setForm] = useState({
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
        console.log("Email: ", form.email);
        console.log("Password: ", form.password);

        //login
        axios.post('/users/login', {
                email: form.email,
                password: form.password
            })
             .then((response) => {
                console.log(response);
                console.log(response.data);
                setErrorMessage("");
                //set authenticated to true and store the token
                props.onAuthenticated(true, response.data.token);
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
            Email: <input type="text" name="email" value={form.email} onChange={handleForm} />
            <br />
            Password: <input type="password" name="password" value={form.password} onChange={handleForm} />
            <br />
            <br />
            <Button variant='contained' onClick={submitForm} endIcon={<Login />}>Login</Button>
            <p style={styles}>{errorMessage}</p>
        </>
    );
};

export default LoginForm;