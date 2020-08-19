import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddMovieForm(props) {
    const history = useHistory();
    const { setMovieList } = props; 
    const initialMovie = {
        id: '', 
        title: '',
        director: '',
        metascore: 0,
        stars: [],
    };

    const [update, setUpdate] = useState(initialMovie);

    const changeHandler = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value});
        console.log(update);  
    }

    const submitMovie = (e) => {
        e.preventDefault();

        axios
            .post(`http://localhost:5000/api/movies/`, update)
            .then((res) => {
                setMovieList(res.data); 
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
                    onChange={changeHandler}
                />
            </label>

            <label>Director:
                <input 
                    type='text'
                    name='director'
                    id='director'
                    value={update.director}
                    onChange={changeHandler}
                />
            </label>

            <label>Metascore:
                <input 
                    type='text'
                    name='metascore'
                    id='metascore'
                    value={update.metascore}
                    onChange={changeHandler}
                />
            </label>
            <button>Add Movie</button>
        </form>
    )
}

export default AddMovieForm; 