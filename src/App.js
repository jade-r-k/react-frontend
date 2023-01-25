import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';

//import pages
import Home from './pages/Home';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import RestaurantIndex from './pages/restaurants/Index';
import RestaurantsShow from './pages/restaurants/Show';
import RestaurantsCreate from './pages/restaurants/Create';
import RestaurantsEdit from './pages/restaurants/Edit';

//import components
import Navbar from './components/Navbar';

const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
    let protectedRestaurants;
    let notLoggedIn;

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setAuthenticated(true);
        }
    }, []);

    const onAuthenticated = (auth, token) => {
        setAuthenticated(auth);
        
        if(auth){
            localStorage.setItem('token', token);
        }
        else {
            localStorage.removeItem('token');
        }
    };


    //these urls are only accessable if user is logged in, otherwise shows PageNotFound
    if(authenticated){
        protectedRestaurants = (
            <>
                <Route path="/restaurants/:id" element={<RestaurantsShow authenticated={authenticated} />} />
                <Route path="/restaurants/:id/edit" element={<RestaurantsEdit />} />
                <Route path="/restaurants/create" element={<RestaurantsCreate />} />
            </>
        );
    }
    //This url is only accessable when the user is not logged in
    if(!authenticated){
        notLoggedIn = (
          <>
            <Route path="/register" element={<Register onAuthenticated={onAuthenticated} />} />
          </>
        );
    }


  return (
    <Router>
      <Container>
      <Navbar onAuthenticated={onAuthenticated} authenticated={authenticated}/>
        <Routes>
          <Route path="/" element={<Home onAuthenticated={onAuthenticated} authenticated={authenticated} />} />
          <Route path="/restaurants" element={<RestaurantIndex authenticated={authenticated} />} />
          {protectedRestaurants}
          {notLoggedIn}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
