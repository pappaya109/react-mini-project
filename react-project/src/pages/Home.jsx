import React, { useEffect, useState, } from 'react';
import Banner from '../components/Banner';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux'
import { getPopularMovies, getTopRatedMovies, getUpComingMovies } from '../redux/movieSlice';
import ClipLoader from "react-spinners/ClipLoader";
import MovieSlide from '../components/MovieSlide';

const Home = () => {
    // 기존에 있던 sessionMovie 를 지워버릴거임
    sessionStorage.removeItem('movie');
    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector(state => state.movies);
    const [loading, setLoading] = useState(true);
    // 화면이 렌더링 되자마자 API를 가져올 것.
    useEffect(() => {
        const popularApi = axios.get('/popular?language=ko-KR&page=1');
        const topRatedApi = axios.get('/top_rated?language=ko-KR&page=1');
        const upComingApi = axios.get('/upcoming?language=ko-KR&page=1');

        // promise all을 사용하여 여러번의 api요청을 병렬로 처리
        Promise
            .all([popularApi, topRatedApi, upComingApi])
            .then(res => {
                // console.log(res)
                // API에서 담아온 데이터를 store에 저장하고 싶을 때 -> useDispatch
                dispatch(getPopularMovies(res[0].data));
                dispatch(getTopRatedMovies(res[1].data));
                dispatch(getUpComingMovies(res[2].data));
            })
            .then(() => setLoading(false));
    }, [])

    // store에 값이 들어갔는지 확인해보는 용도
    useEffect(() => {
        // console.log('store의 상태', popularMovies, topRatedMovies, upComingMovies)
    }, [popularMovies, topRatedMovies, upComingMovies])


    if (loading) {
        return (
            <ClipLoader
                color='#f05f5f'
                loading={loading}
                size={50}
                margin={100}
                speedMultiplier={1}>
            </ClipLoader>
        )
    }
    return (
        <div>
            {/*  LifeCycle 생명주기 - 컴포넌트 
                - popularMovies 라는 애가 존재하면? > result
                - 존재하지 않는 다면 배너를 띄울 필요 엄슴
             */}

            {/* 로딩 스피너를 만들면 데이터가 안왔을 때는 로딩만 리턴이 되기 때문에
            별도로 조건부 처리를 해줄 필요가 없다. */}
            {/* {popularMovies.results &&  */}
            <Banner movies={popularMovies.results[2]}/>



            {/* 카드 슬라이드 */}
            <div className='slidesWrapper'>
                <h4>Popular Movies</h4>
                <MovieSlide movies={popularMovies.results} type="popularMovies"></MovieSlide>
                
                {/* 카드 슬라이드 */}
                <h4>TopRated Movies</h4>
                <MovieSlide movies={topRatedMovies.results} type="topRatedMovies"></MovieSlide>

                {/* 카드 슬라이드 */}
                <h4>UpComing Movies</h4>
                <MovieSlide movies={upComingMovies.results} type="upComingMovies"></MovieSlide>
            </div>
        </div>
    )
}

export default Home