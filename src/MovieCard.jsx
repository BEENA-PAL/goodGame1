import React from "react";

const MovieCard = ({movie: {Year,Poster,Title,Type,imdbID}}) =>{
    // Here we are using object destructuring to pass movie as prop
    return(
        <div className="movie" key={imdbID}>

          <div>
            <p>{Year}</p>
          </div>

          <div>
            <img src = {Poster !=='N/a' ? Poster : 'https://via.placeholder.com/400'} alt={Title}></img>
          </div>

          <div>
            <span>{Type}</span>
            <h3>{Title}</h3>
          </div>
        </div>
    );
};

export default MovieCard;