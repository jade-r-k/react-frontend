import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PageNotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //User isn't navigated to home until timer is finished
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => {
            clearTimeout(timer)
        }
    }, []);

    return (
        <>
            <h2>Page not found: {location.pathname}</h2>
            <p>Redirecting you to Home</p>
        </>
    );
};

export default PageNotFound;