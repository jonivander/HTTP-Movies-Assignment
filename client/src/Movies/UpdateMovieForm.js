import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

function UpdateMovieForm(props) {
    const history = useHistory();
    const location = useLocation(); 
    const params = useParams();
    const [movie, setMovie] = useState(null); 

    const initialMovie = {
        id: params.id, 
        title: '',
        director: '',
        metascore: 0,
        stars: [],
    };

    const [update, setUpdate] = useState(initialMovie);
    const fetchMovie = (id) => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err.response));
    };
    
    useEffect(() => {
        if (location.state) {
            setUpdate(location.state);
        } else {
            fetchMovie(params.id);
        }
    }, [params.id, location.state]); 

    if (!movie) {
        return <div>Movie information coming up...</div>;
    }

    const changeHandler = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value});
        console.log(update);  
    }

    const submitMovie = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, update)
            .then((res) => {
                history.push(`/`);
            })
            .catch((err) => console.log(err)); 
    }

    return (
        <form onSubmit={submitMovie}>
            <label>Title:
                <input 
                    type='text'
                    name='title'
                    id='title'
                    value={update.title}
                    placeholder={movie.title}
                    onChange={changeHandler}
                />
            </label>

            <label>Director:
                <input 
                    type='text'
                    name='director'
                    id='director'
                    value={update.director}
                    placeholder={movie.director}
                    onChange={changeHandler}
                />
            </label>

            <label>Metascore:
                <input 
                    type='text'
                    name='metascore'
                    id='metascore'
                    value={update.metascore}
                    placeholder={movie.metascore}
                    onChange={changeHandler}
                />
            </label>
            <button>Update Movie Info</button>
        </form>
    )
}

export default UpdateMovieForm; 