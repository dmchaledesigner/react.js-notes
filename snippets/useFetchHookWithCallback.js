import React, { useState, useEffect, useCallback } from 'react';


const useFetch = (url) => {


    const [data, setData] = useState([]);


    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);



    //callback function to get all data
    const getData = useCallback(async (url) => {
        setIsPending(true);
        setError(null);

        try {

            const respsonse = await fetch(url)

            if (!respsonse.ok) {
                setError('Something went wrong, no posts have been loaded')

            }

            const resJson = await respsonse.json();
            const data = await resJson;
            setTimeout(() => {
                setData(data);
                setIsPending(false)
            }, 1000);


        } catch (error) {
            console.log(error)
            setError(error)
        }


    }, []); // finish off the callback here and with an empty Array






    // use effect hook for the get Data
    useEffect(() => {
        getData(url);// pull in the getData function
    }, [getData, url]) // then pass it as a parame ter


    return { data, isPending, error }
}

export default useFetch;
