import React, { useState, useEffect, useCallback } from 'react';
import BlogList from '../components/blog/BlogList';

const Home = () => {



    const url = 'http://localhost:8000/blogs';



    const [blogData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const getData = useCallback(async (url) => {

        setLoading(true);

        try {
            await fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        console.log('something went wrong')
                    }
                    return res.json()
                }).then((data) => {
                    setData(data);
                    setError(null);
                    setLoading(false);

                })

        } catch (error) {
            setError(error);
            console.log(error);
        }

    }, []); // close the function and add an array / closing bracket for useCallback






    useEffect(() => {
        getData(url) // run the function 
    }, [getData, url]) // pass in the getData function and the url














    return (
        <div className="home">
            {blogData && blogData && <BlogList data={blogData} title="All Blogs" />}
        </div>
    )
}

export default Home
