import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import axios from '../axios';

const MovieDetail = () => {
    // useParams 
    // Route 작성하는 부분에 /:id <- path 작성. 작성한 이 부분을 넣어주면 됨
    const { id } = useParams();

    // useSearchParams 
    // url을 작성하는 부분에 ?type= ~~
    const [params, setParams] = useSearchParams();
    const type = params.get('type');
    // //console.log(`내가 가져온 영화의 id 는 ${id}이고, 타입은 ${type}`)

    // redux에 있는 데이터 가져옴 
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector(state => state.movies);
    const [movie, setMovie] = useState();
    const [review, setReview] = useState([]);

    /** 내가 가져올 영화에 대한 데이터를 추출하는 함수 */
    const getMovieData = () => {
        if (type === 'popularMovies') {
            setMovie(popularMovies.results.find((item) => item.id == id))
        } else if (type === 'topRatedMovies') {
            setMovie(topRatedMovies.results.find((item) => item.id == id))
        } else if (type === 'upComingMovies') {
            setMovie(upComingMovies.results.find((item) => item.id == id))
        }
    }

    /** 내가 선택한 영화에 대한 리뷰를 가져오는 함수 */
    const getReviewData = () => {
        /// {movie_id}/reviews
        axios.get(`/${id}/reviews?language=en-US&page=1`)
            .then(res => {
                setReview(res.data.results)
            })
        console.log('review ', review)
    }

    useEffect(() => {
        if (movie) {
            // movie 라는 state에 값이 들어가면 그 값을 sessionStorage 안에 저장
            sessionStorage.setItem('movie', JSON.stringify(movie));
            getReviewData();
        }
    }, [movie])

    // redux 값을 가져왔을 때
    useEffect(() => {
        const sessionMovie = JSON.parse(sessionStorage.getItem('movie'));
        //console.log('session storage', sessionMovie)

        // session 안에 값이 존재하면 (이미 클릭한 전적) => 세션안에 있는 값을 movie 세팅
        if (sessionMovie) {
            setMovie(sessionMovie)
        } else {
            // session 안에값이 없으면 (최초 클릭) => redux 로 가서 movie 세팅
            getMovieData();
        }


    }, [
        popularMovies,
        topRatedMovies,
        upComingMovies,
        id,
        type
    ])


    // 내가 푼것
    // useEffect(()=>{
    //     switch(type) {
    //         case "popularMovies":
    //             setMovie(popularMovies.results.find(item => item.id == id));
    //             setLoading(false)
    //             break;

    //         case "topRatedMovies":
    //             setMovie(topRatedMovies.results.find(item => item.id == id));
    //             setLoading(false)
    //             break;

    //         case "upComingMovies":
    //             setMovie(upComingMovies.results.find(item => item.id == id));
    //             setLoading(false)
    //             break;
    //     }
    // })


    return (
        <div className='movie-detail'>
            {movie &&
                <div className='movie-box'>
                    <div
                        className='detail-poster'
                        style={{
                            backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
                        }}>
                    </div>
                    <br></br>
                    <div className='detail-item'>
                        {movie.adult == false ?
                            <Badge bg="success">전체관람가</Badge> :
                            <Badge bg="danger">청소년관람불가</Badge>}
                        <h1>{movie.title}</h1>
                        <div>
                            <span>평점 : {movie.vote_average}점</span> {" "}
                            <span>개봉일 : {movie.release_date}</span>
                        </div>
                        <div className='detailText'>{movie.overview}</div>
                    </div>
                    <hr/>
                        <h2>review</h2>
                        {
                            review.length === 0 ?
                            <p>등록된 리뷰가 없습니다</p> 
                            :
                            (
                                review.map(item =>
                                    <div key={item.id}>
                                        <hr />
                                        <p>{item.content}</p>
                                        <p>
                                            작성자 : {item.author} |
                                            작성일 {item.created_at}
                                        </p>
                                    </div>)
                            )
                        }
                </div>
            }
        </div>
    )
}

export default MovieDetail