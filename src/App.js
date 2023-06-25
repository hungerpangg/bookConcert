import Concerts from './Concerts';
import {Routes, Route} from 'react-router-dom';
import Booking from './Booking';

export default function App(){
    return (
        <div>
            App
        <Routes>
            <Route path='/' element={<Concerts/>} />
            <Route path='booking/:concertName/:id' element={<Booking />} />
        </Routes>
        </div>
    )
}