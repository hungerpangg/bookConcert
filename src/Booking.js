import axios from 'axios';
import {useReducer} from 'react';
import {useParams, useLocation} from 'react-router-dom';

const reducer=(state, action)=>{
    if(action.type==='onChange'){
            return {
                ...state,
                formDetails: {
                    ...state.formDetails,
                    [action.inputType]: action.payload
                }
            }
    }
    else if(action.type==='validate'){
        return {
            ...state,
            validateDetails: {
                ...state.validateDetails,
                [action.payload.msgTitle]:action.payload.msg,
                [action.payload.statusTitle]:action.payload.status
            }
        }
    }
    else if(action.type==='form error'){
        return {
            ...state,
            formError: true
        }
    }

}

function Booking(){

    const { currentConcert, currentId, currentConcertImage } = useLocation().state;

    const [state, dispatch]=useReducer(reducer,{
        concertDetails: {
            currentId,
            currentConcert,
            currentConcertImage
        },
        formDetails:{
            email:'',
            quantity:'',
            date:'',
        },
        validateDetails:{
            emailMsg:'',
            emailStatus:false,
            quantityMsg:'',
            quantityStatus:false,
            dateMsg:'',
            dateStatus:false
        },
        formError: false
    });

    const handleChange=(event)=>{
        console.log(event.target.attributes.id.value,typeof event.target.value);
        validate(event.target.attributes.id.value, event.target.value);
        dispatch({
            type:'onChange',
            inputType:event.target.attributes.id.value,
            payload:event.target.value
        })
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(event.target.elements.date.value);
        axios.post('http://localhost:3001/bookings',{
            concertId: state.concertDetails.currentId,
            email: state.formDetails.email,
            quantity: state.formDetails.quantity,
            date: state.formDetails.date
        }
    )
    }

    const handleSubmitClick=(event)=>{
        if(!state.validateDetails.emailStatus || 
            !state.validateDetails.quantityStatus ||
            !state.validateDetails.dateStatus)
            console.log('dispatch');
            dispatch({
                type:'form error'
            })
    }

    const validate=(inputType, value)=>{
        const validateObj={
            msgTitle:inputType+'Msg',
            statusTitle:inputType+'Status'
        };
        if(inputType==='email' && !(/^[a-zA-Z]+$/.test(value[0]))){
            dispatch({
                type:'validate',
                inputType,
                payload:{
                    msg:'must start with letter',
                    status:false,
                    ...validateObj
                }
            })
        }
        else if(inputType==='email' && value.length<7){
                dispatch({
                    type:'validate',
                    inputType,
                    payload:{
                        msg:'email too short',
                        status:false,
                        ...validateObj
                    }
                });
        }
        else if(inputType==='quantity' && (value[0]==='0' || value.length<1)){
                dispatch({
                    type:'validate',
                    inputType,
                    payload:{
                        msg:'input a valid quantity',
                        status:false,
                        ...validateObj
                    }
                })
        }
        else if(inputType==='date' && new Date(value)<new Date()){
                dispatch({
                    type:'validate',
                    inputType,
                    payload:{
                        msg:'input a valid date',
                        status:false,
                        ...validateObj
                    }
                })
        }
        else{
            console.log('else')
            dispatch({
                type:'validate',
                inputType,
                payload:{
                    msg:'',
                    status:true,
                    ...validateObj
                }
            })
        }
        }

        console.log(state)

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <img src={'/'+state.concertDetails.currentConcertImage} 
            alt={state.concertDetails.currentConcertImage}
            className='w-15 h-15'></img>
            <div className="mb-6">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" id="email" name='email'
                onChange={handleChange}
                value={state.formDetails.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required/>
                <span className='fill-current h-6 w-6 text-red-500'
                >{state.formError && state.validateDetails.emailMsg}</span>
            </div>
            <div class="mb-6">
                  <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                  <input type="number" min='0' id='quantity' name='quantity'
                  onChange={handleChange}
                  id="quantity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required/>
                  <span className='fill-current h-6 w-6 text-red-500'
                  >{state.formError && state.validateDetails.quantityMsg}</span>
             </div>
             <div class="mb-6">
                  <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                  <input type="date" name='date' id='date' 
                  onChange={handleChange}
                  id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required/>
                  <span className='fill-current h-6 w-6 text-red-500'
                  >{state.formError && state.validateDetails.dateMsg}</span>
             </div>
             <button type="submit" onClick={handleSubmitClick}
             class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
             </div>
            </form>
        </div>
    )
}

export default Booking;