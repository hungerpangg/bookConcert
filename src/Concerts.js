import axios from 'axios';
import { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const reducer=(state, action)=>{
    if(action.type==='get all concerts'){
        return {
            ...state,
            concerts: action.payload
        }
        }
    else if(action.type==='click concert'){
        return {
            ...state,
            currentConcert: action.payload.currentConcert,
            currentId: action.payload.currentId,
            currentConcertImage: action.payload.currentConcertImage
        }
    }
}

function Concerts(){
    const [state, dispatch]=useReducer(reducer, {
        concerts:[],
        currentConcert:'',
        currentId:0,
        currentConcertImage:''
    });

    const getConcerts=()=>{
        axios.get('http://localhost:3001/concerts')
        .then(response=>dispatch({
            type: 'get all concerts',
            payload: response.data
        }))
    }

    useEffect(getConcerts,[]);

    const handleSubmit=(event)=>{
        // console.dir(event.target.parentElement.firstChild.attributes.src.value);
        // console.log(event.target.parentElement.attributes.concertname.value);
        dispatch({
            type:'click concert',
            payload:{
                currentConcert: event.target.parentElement.attributes.concertname.value,
                currentId: event.target.parentElement.id,
                currentConcertImage: event.target.parentElement.firstChild.attributes.src.value
            }
        })
    }

    const navigate=useNavigate();

    if(state.currentConcert){
        return navigate('booking/'+state.currentConcert+'/'+state.currentId,
        {state: { currentConcert: state.currentConcert,
         currentId: state.currentId,
         currentConcertImage: state.currentConcertImage } 
        });
        // navigate('booking/', { concertName: state.currentConcert,
        // id: state.currentId })
    }

    console.log(state)

    return(
        <div className='flex space-x-7'>
            {state.concerts && state.concerts.map((concert)=>{
        return <div key={concert.id} id={concert.id} concertname={concert.title} className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <img src={concert.image} className='w-15 h-15'></img>
            <h3 className='mb-2 text-2xl font-bold tracking-tight 
            text-gray-900 dark:text-white'>{concert.title}</h3>
            <h5>{concert.cost}</h5>
            <button onClick={handleSubmit}
            className='bg-blue-500 hover:bg-blue-700 text-white 
            font-bold py-2 px-4 rounded'>Book now!</button>
            </div>
    })}
        </div>
    );
}

export default Concerts;