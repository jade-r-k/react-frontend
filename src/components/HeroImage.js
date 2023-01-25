import LoginForm from "./LoginForm";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const HeroImage = (props) => {

    return(
        //Hero image for home page
        <div 
        //image backgorund
        style ={ { 
            backgroundImage: "url('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60')",
            height: "50%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative"} }>
            <div style ={ {
                textAlign: "center",
                color:"white",
                textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
            } }>
                <br/>
                <h1>Welcome to RESTaurants API</h1>
                {/* if not logged in show login form */}
                {(!props.authenticated) ? (
                    <>
                    <h2>Login:</h2>
                    <LoginForm onAuthenticated={props.onAuthenticated} />
                    </>
                ) : (
                    // if logged in show this
                    <>
                    <h2>You are logged in</h2>
                    <Button variant="contained" component={Link} to='/restaurants'>View All Restaurants</Button>
                    <br/>
                    </>
                )}
                <br/>
            </div>
        </div>
    );
};

export default HeroImage;