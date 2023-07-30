import CardsContainer from "../../components/cardscontainer/cardscontainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";

export default function Home () {

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