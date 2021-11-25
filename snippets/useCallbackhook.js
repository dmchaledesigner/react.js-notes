
// USECALLBACK()

// Tells React that the function will never change. 
// useCallback is a closure. It takes outside variable inside a function and never changes things
// whatever value a state has that is used inside useCallback will NOT change => unless it has a dependency



// The bwlow App.js file imports useCallback
// the toggleParaHandler uses useCallback and an array for dependencies, same as useEffect
// Its lets react know that the function will never change
// We dont need to add a dependency of the state setShowPara because the value in the state wont change directly

import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';


function App() {

    const [showParagraph, setShowParagraph] = useState(false);

    //anythinhg inside this fucntion will not change, so if the showParagraph state is changed by another event in anbother component
    //it wont matter. as the app renders, the value is false, ...therefore the function declares it false, 

    const toggleParagraphHandler = useCallback(() => { // normal arrow function wrapped in useCallback
        setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }, []); // useCallback empty array means its unternal values stay the same nomatter what


    return (
        <div className="app">
            <h1>Hi there!</h1>
            <DemoOutput show={false} />
            <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
        </div>
    );
}

export default App;





// same function as above but with dependancy

import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';
import './App.css';


function App() {
    const [showParagraph, setShowParagraph] = useState(false);
    const [allowToggle, setAllowToggle] = useState(false);


    const toggleParagraphHandler = useCallback(() => {
        if (allowToggle) {
            setShowParagraph((prevShowParagraph) => !prevShowParagraph);
        }
    }, [allowToggle]); // the dependancy shows that if allowToggle state changes elsewhere, it will be then reflected inside the callback function, like useEffect


    const allowToggleHandler = () => {
        setAllowToggle(true);
    };


    return (
        <div className="app">
            <h1>Hi there!</h1>
            <DemoOutput show={showParagraph} />
            <Button onClick={allowToggleHandler}>Allow Toggling</Button>
            <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
        </div>
    );
}

export default App;












import React, { useState, useEffect, useCallback } from 'react';
import BlogList from './BlogList';


const Home = () => {


    //state
    const [blogs, setBlogs] = useState([
        { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
        { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
        { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ])

    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)


    const deleteBlogHandler = (id) => {

        const deletePost = blogs.filter((item) => item.id !== id)
        setBlogs(deletePost);
    }





    // const filteredByAuthor = blogs.filter((item) => item.author !== "yoshi");





    // use callback function to stop lots of re-renders
    const getData = useCallback(async () => {

        setIsPending(true);
        setError(null);

        try {

            const respsonse = await fetch('http://www.omdbapi.com/?s=star wars&apikey=283540c6')
            if (!respsonse.ok) {
                console.log('something went wrong')
            }

            const resJson = await respsonse.json();
            const data = await resJson.Search;
            console.log(data);

            setIsPending(false);

            setBlogs(data);
            const { Title, Year, Poster } = data;


            console.log(data);



        } catch (error) {
            console.log(error)
        }
    }, []); // empty array to make the function only run once



    // then use useEffect, pass in the function and use it as a dependancy

    useEffect(() => {
        getData()
    }, [getData]);






    return (
        <div className="home">
            {/* {<BlogList blogs={blogs} title="All Blogs" deleteBlogHandler={deleteBlogHandler} />} */}

            {<BlogList blogs={blogs} title="Blog by Author" deleteBlogHandler={deleteBlogHandler} />}


        </div>
    )
}

export default Home








// USECALLBACK AND DEPENDENCIES

