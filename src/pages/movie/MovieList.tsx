import type { MovieType } from "./MoviePage.tsx";
import styled from "styled-components";
import { FaSmile } from "react-icons/fa";
import MovieCard from "./MovieCard.tsx";

const NotK = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-top: 1px solid ${props => props.theme.colors.divider};
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.theme.colors.text.disabled};
`;

const NotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: ${props => props.theme.colors.text.disabled};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    border-top: 1px solid ${props => props.theme.colors.divider};
`;

const SearchResult = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.theme.colors.text.default};
    margin-bottom: 10px;
    padding: 10px 20px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
`;

const Loading = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: ${props => props.theme.colors.text.disabled};
`;

const Main = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 200px);
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
`;

export type MovieListProps = {
    movies: MovieType[];
    loading: boolean;
    keyword: string | null;
};

function MovieList({ movies, loading, keyword }: MovieListProps) {
    if (!keyword) {
        return (
            <NotK>
                <p>찾고 싶은 영화를 검색해보세요!</p>
                <FaSmile />
            </NotK>
        );
    }

    if (movies.length === 0) {
        return <NotFound>검색 결과를 찾을 수 없습니다.</NotFound>;
    }

    return (
        <Container>
            <SearchResult>{keyword}</SearchResult>
            {loading ? (
                <Loading>검색 결과를 불러오는 중...</Loading>
            ) : (
                <Main>
                    {movies.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Main>
            )}
        </Container>
    );
}

export default MovieList;
