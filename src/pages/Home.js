import HeroImage from "../components/HeroImage";

const Home = (props) => {
    return (
        <>
         <br />
            <HeroImage onAuthenticated={props.onAuthenticated} authenticated={props.authenticated}/>
        </>
    );
};

export default Home;