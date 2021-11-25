// React Portals


// For a portal to work, we need two things
// 1. The place where we want our component to sit (a html wrapper)
// 2. The tell the component we want to ‘portal’ where the component is actually going


// Create a div wrapper with an ID inside the index.html file which is in the public folder
// Place it over and outside the root div

// The index.html file
//========================

//<div id="backdrop"></div>
// <div id="overlay"></div>
// <div id="root"></div>

// Take this modal component and split it into other components INSIDE the same component file

import React from 'react';
import styles from './Modal.module.css';
import Button from './Button';
import Card from './Card';


const Modal = (props) => {
    return (
        <>
            <div className={styles.backdrop} onClick={props.errorHandler}></div>
            <Card className={styles.modal}>
                <header className={styles.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={styles.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={styles.actions}>
                    <Button
                        onClick={props.errorHandler}
                        type="submit"
                    >Okay</Button>
                </footer>
            </Card>
        </>
    )
}

export default Modal



// like so ......


import React from 'react';
import styles from './Modal.module.css';
import Button from './Button';
import Card from './Card';
import ReactDOM from 'react-dom'; // ReactDOM needs to be imported as we use it for the component we use createPortal


// backdrop component holds the div with the backdrop of black
const Backdrop = (props) => {
    return (
        <div className={styles.backdrop} onClick={props.errorHandler}></div>
    )
}

// this component will hold the modal itself
const Overlay = () => {
    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={styles.content}>
                <p>{props.message}</p>
            </div>
            <footer className={styles.actions}>
                <Button
                    onClick={props.errorHandler}
                    type="submit"
                >Okay</Button>
            </footer>
        </Card>
    )
}


// this will be the portal component that holds both the Backdrop and Overlay, then portalled to the div inside the index.html file
// use ReactDOM to portal

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import Button from './Button';
import Card from './Card';


const Backdrop = (props) => {

    return (
        <div className={styles.backdrop} onClick={props.onConfirm}></div>
    )
}


const Overlay = (props) => {
    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={styles.content}>
                <p>{props.message}</p>
            </div>
            <footer className={styles.actions}>
                <Button
                    onClick={props.errorHandler}
                    type="submit"
                >Okay</Button>
            </footer>
        </Card>
    )
}

const Modal = (props) => {

    const backdropElement = document.getElementById('backdrop');
    const overlayElement = document.getElementById('overlay');


    return (
        <>
            {
                ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, backdropElement)
            }


            {
                ReactDOM.createPortal(<Overlay title={props.title} message={props.message} errorHandler={props.errorHandler} />, overlayElement)
            }


        </>
    )
}

export default Modal







// then call the modal inside a local component where we need it, depending on its local state

// link here : https://github.com/academind/react-complete-guide-code/tree/09-fragments-portals-refs/code/04-finished/src/components