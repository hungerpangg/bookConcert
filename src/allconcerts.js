import {createContext, useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const ConcertContext=createContext(); 

function Provider({children}){

    const [concerts, setConcerts]=useState([]);
    // const [loading, setLoading]=useState(true);

    const getConcerts=()=>{
        axios.get('http://localhost:3001/concerts')
        .then(response=>{
            console.log(response.data,'provider');
            setConcerts([...response.data]);
            // setLoading(false);
        })
    }

    console.log(concerts, 'allconcerts')

    useEffect(()=>{
        getConcerts();
        console.log('fired')
    },[]);

    useEffect(() => {
        // Fetch the concerts data whenever the URL changes
        getConcerts();
      }, [useLocation().pathname]);

    const valueToShare={
        concerts,
        getConcerts
    }

    return (
        <ConcertContext.Provider value={valueToShare}>
            {children}
        </ConcertContext.Provider>
    )
}

export default ConcertContext;
export {Provider};