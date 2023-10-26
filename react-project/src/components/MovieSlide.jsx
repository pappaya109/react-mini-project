import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';

const MovieSlide = ({ movies, type }) => {
    // console.log('Home => MovieSlide 영화리스트', movies)
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
    return (
        <div className='slides'>
            <Carousel responsive={responsive}>
                {/* {movies.map((item)=>{
                    let imgUrl = "https://www.themoviedb.org/t/p/w355_and_h200_multi_faces" + item.poster_path;
                    return (
                        <MovieCard info={{movies.imgUrl, movies.adult, movies.vote_average, movies.title }}/>
                    )
                })} */}

                {/* 선생님 풀이 */}
                {
                    movies.map( item => <MovieCard  movie={item} type={type} key={item.id}/>)
                }
            </Carousel>
        </div>
    )
}

export default MovieSlide