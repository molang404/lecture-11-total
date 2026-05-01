import styled from "styled-components";
import SearchBar from "./SearchBar.tsx";
import MovieList from "./MovieList.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export type MovieType = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
};

type ApiResponseType = {
    Search: MovieType[];
    Response: "True" | "False";
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;
    height: calc(100dvh - 200px);
`;

const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    text-align: center;
    padding: 15px 40px;
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 50px;
    border: 1px solid ${props => props.theme.colors.divider};
`;

function MoviePage() {
    const [params] = useSearchParams();
    const k = params.get("keyword");

    const [movies, setMovies] = useState<MovieType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${k}`)
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                if (json.Response === "False") {
                    setMovies([])
                } else {
                    setMovies(json.Search);
                }})
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [k]);

    return (
        <>
            <Container>
                <Title>Search Movie</Title>
                <SearchBar />
                <MovieList movies={movies} loading={loading} keyword={k} />
            </Container>
        </>
    );
}

export default MoviePage;
