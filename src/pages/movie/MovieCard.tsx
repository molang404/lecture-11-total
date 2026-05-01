import type { MovieType } from "./MoviePage.tsx";
import styled from "styled-components";
import { Link } from "react-router";

type Props = {
    movie: MovieType;
};

const Box = styled(Link)`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 380px;
    background-color: ${props => props.theme.colors.background.paper};
    color: ${props => props.theme.colors.text.default};
    text-align: left;
    border-radius: 15px;
    transition: all 0.5s;

    div {
        margin: 10px;
        font-weight: bold;
        font-size: 20px;
    }

    span {
        margin: 0 10px;
        font-size: 16px;
    }

    &:hover {
        background-color: ${props => props.theme.colors.divider};
        color: ${props => props.theme.colors.primary};
        border: 1px solid ${props => props.theme.colors.primary};
        transform: scale(1.05);
    }
`;

const Poster = styled.img`
    height: 250px;
    object-fit: cover;
    border-radius: 15px;
`;


function MovieCard({ movie }: Props) {
    return <Box to={`/movie/${movie.imdbID}`}>
        <Poster src={movie.Poster} alt={movie.Title}/>
        <div>{movie.Title}</div>
        <span>{movie.Year}</span>
    </Box>;
}

export default MovieCard;