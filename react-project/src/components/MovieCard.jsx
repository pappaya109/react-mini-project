import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const MovieCard = ({ movie, type }) => {
    let imgUrl = 'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces' + movie.poster_path
    return (
        <div style={{ backgroundImage: `url(${imgUrl})` }}
            className='movieCard-img'
        >
            <Link to={`/movies/${movie.id}?type=${type}`}>
                <div className='overlay'>
                    <h1>{movie.title}</h1>
                    <div>
                        <span>{movie.vote_average}</span>
                        <span>
                            {/* react-bootstrap badge */}
                            {
                                movie.adult == false ? <Badge bg="success" >전체관람가</Badge> :
                                    <Badge bg="danger" >청소년 관람불가</Badge>
                            }
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MovieCard