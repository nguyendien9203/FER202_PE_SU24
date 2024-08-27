import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import AddStar from './AddStar';
import { useEffect } from 'react';

const RedirectToMovie = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/movie");
    }, [navigate]);

    return null;
}

function App(){
    return (
        <Routes>
            <Route path='/' element={<RedirectToMovie />} />
            <Route path='/movie' element={<Home />} />
            <Route path='/movie/:id/add-stars' element={<AddStar />} />
        </Routes>
    )
}

export default App;