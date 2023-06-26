import Concerts from './Concerts';
import {Routes, Route} from 'react-router-dom';
import Booking from './Booking';
import { Provider } from './allconcerts';

export default function App(){
    return (
        <div>
            App
            <Provider>
        <Routes>
            <Route path='/' element={<Concerts/>} />
            <Route path='booking/:concertName/:id' element={<Booking />} />
        </Routes>
        </Provider>
        </div>
    )
}