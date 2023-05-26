import "./throwback.css";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { format } from "date-fns";

function Recom() {
  const [movies, getMovies] = useState([]);

  const value = Math.floor(Math.random() * 10) + 1;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          language: "id-ID",
          with_original_language: "id",
          sort_by: "popularity.desc",
          "primary_release_date.gte": "1990-01-01",
          "primary_release_date.lte": "2010-12-31",
          page: value,
        },
      })
      .then((response) => {
        const filteredMovies = response.data.results.filter((movie) => movie.poster_path);
        getMovies(filteredMovies);
      });
  }, []);

  return (
    <div className="throwback">
      <h3>Nostalgia</h3>
      <Swiper
        modules={[Navigation]}
        slidesPerView={6}
        navigation
        style={{
          "--swiper-navigation-color": "#ffff",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        {movies.map((result, index) => {
          const releaseDate = new Date(result.release_date);
          const formattedDate = format(releaseDate, "MMM d, yyyy");

          return (
            <SwiperSlide className="throwback-items" key={index}>
              <button>
                <img onClick={() => {
                navigate("/movie", {state: result.id});
              }} src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.title} />
              </button>
              <h4>{result.title}</h4>
              <p>{formattedDate}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Recom;
