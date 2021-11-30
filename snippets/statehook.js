// STATE and usage

// SINGLE STATE WITH SINGLE VALUE
// ===============================
const [title, setTitle] = useState('');


// when using a single state object we simply upate the state buy using setTitle()
// …so, say with an onClick event


setTitle(‘Some text’);









// SETTING STATE WITH MULTIPLE FIELD STATE HOOKS
//===================================================


const [formData, setFormData] = useState([]) // empty array that holds the form data once submitted

const [text, setText] = useState('');
const [email, setEmail] = useState('');


// the onChange handler is already set in the onChange prop
// so we need an onSubmit function on the form to handle the data



<form>
    <div className="new-expense__controls">
        <div className="new-expense__control">
            <label htmlFor="title">name</label>
            <input
                type="text"
                name="title"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>

        <div className="new-expense__control">
            <label htmlFor="title">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

    </div>

    <div className="new-expense__actions">
        <button type="submit" Submit</button>
</div>
</form >

// the onsubmit function wille be something like...
const onSubmit = () => {
    e.preventDefault()

    const item = {
        text: text,
        email: email,
    }

    setFormData([
        ...formData, item
    ])

    //then reset both fields
    setText('');
    setEmail('');
}






// SETTING STATE WITH MULTIPLE FIELD IN A SINGLE STATE HOOK
//=============================================================




// on Each onChange event we have a handler function to capture that specific field change

// lets create those event functions using ‘prevState’ so we get all the data and not just from one field.
// NOTE, that inside each handler function, we call the state function to change the data,
// then we create and arrow function inside it and use ‘prevState’ as a param,
// then we return an object(since the state is an object) and spread in the ‘prevState’ to capture existing data,
// and then access the key we want to change which is title, and then give it a new value.We create other functions for the rest of the keys and use them as onChange values


// By using this method, React will always guarantee the latest snapshot of the state and not an older one where state has been updated but not recorded





// Single state with multiple object values
const [formData, setFormData] = useState({
    title: '',
    email: '',
})


// note we have one single onChange handler

const titleChangeHandler = (e) => {
    setFormData({
        ...formData, // spread in existing data or we lose the fields then
        title: e.target.value // change the title to the event value
    })
}


const emailChangeHandler = (e) => {
    setFormData({
        ...formData, // spread in existing data or we lose the fields then
        email: e.target.value // change the email
    })
}


<form>
    <div className="new-expense__controls">
        <div className="new-expense__control">
            <label htmlFor="title">name</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={titleChangeHandler}
            />
        </div>

        <div className="new-expense__control">
            <label htmlFor="title">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={emailHandler}
            />
        </div>

    </div>

    <div className="new-expense__actions">
        <button type="submit"> Submit</button>
    </div>
</form>







// alternatively we can use one one state object and one change handler


import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {

    const [values, setValues] = useState({
        title: '',
        amount: '',
    })


    const onChangeHandler = (e) => {
        const { name, value } = e.target; // get the name (ssigned values in the html form) and its value from the target
        setValues({ // update the state using its function
            ...values, // spread in the existing values
            [name]: value, // add in the name and value as object key value pairs
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log(values)
        // do whatever we like with the new state values here
    };

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input type="text" name="title" value={values.title} onChange={onChangeHandler} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" name="amount" value={values.amount} onChange={onChangeHandler} />
                    </div>
                    <div className="ingredient-form__actions">
                        <button type="submit">Add Ingredient</button>
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm;












// UPDATING STATE THAT DEPENDS ON PREVIOUS STATE VALUES

// This is used when we already have state that is populated with data.
// The idea is that we ADD or SUBTRACT from existing data by using prevState() as a current snapshot before manipulation therefore it the new values become the latest state snapshot

// For example if we had a list that already has three items, if we add another item, we want to add to to the existing list, not replace the list with an item only




const onChangeHandler = () => {

    setFormData((prevState) => { // use an arrow function here and return the current snap shot first, then update the one we want
        return {
            ...prevState, // previous whole state snapshot
            title: e.target.value, // alter the one we want to update
        }
    })
}


const emailHandler = () => {

    setFormData((prevState) => {
        return {
            ...prevState,
            email: e.target.value,
        }
    })
}




// passing from parent to child

const NewExpense = (props) => {

    // this is the handler and is used inside the onSave...prop
    const expenseDatahandler = (enteredExpenseData) => { // the param is used to hold the value of the object

        const expenseData = { // the object that we spread on the values and add in another key for the ID
            ...enteredExpenseData,
            id: Math.floor(Math.random() * 3).toString(),
        }
        console.log(expenseData);
    }




    return (
        <div className={style['new-expense']}>
            <ExpenseForm onSaveExpenseData={expenseDatahandler} />
        </div>
    )
}





// the child which is the form holds the submit which we pass the data UP and reset the state for all fields

const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
        id: Math.floor(Math.random() * 10),
        title: enteredTitle,
        amount: enteredAmount,
        data: new Date(enteredDate),
    }

    props.onSaveExpenseData(expenseData);

    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');

}









// another alternative => 




// state
const [usersList, setUsersList] = useState([]);

// functions
const addUser = (userName, userAge) => {
    setUsersList((prevState) => {
        return [
            ...prevState, // spread in existing list items
            { // then we create a new object and assign the values from the param
                name: userName,
                year: userAge,
                id: Math.floor(Math.random() * 4).toString(),
            }
        ]
    })

}


// pass this function to the submit function and put the fields we need inside
props.addUser(field1, field2)









// spreading in an objec to an array

const [userIngredients, setUserIngredients] = useState([])

const addIngredientHandler = (item) => {
    setUserIngredients((prevState) => {
        return [
            ...prevState, { id: Math.floor(Math.random() * 100), ...item }
        ]
    })
}