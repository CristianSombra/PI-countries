import CardsContainer from "../../components/cardscontainer/cardscontainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";

const Home = () => {

    const dispatch =  useDispatch();

    useEffect(() => {
            dispatch(getCountries())
    },[]);


    return(
        <>
            <h1> Esta es la vista de HOME</h1>
            <CardsContainer/>
        </>
    )
};


export default Home;