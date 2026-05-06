import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

const Button = styled.button`
  outline: none;
  padding: 10px 20px;
  font-size: 16px;
  color: ${props => props.theme.colors.text.disabled};
  background-color: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.divider};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 15px;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.background.paper};
  color: ${(props) => props.theme.colors.text.default};
  border-radius: 5px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.1);
`;

const Left = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Poster = styled.img`
  height: 500px;
  object-fit: contain;
`;

const Intro = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  
`;

const Right = styled.div`
  flex: 1;
  width: 100%;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
   h2 {
     margin-bottom: 20px;
   }
`;

type DetailType = {
  Title: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Poster: string;
  Plot: string;
};

function MovieDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState<DetailType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
      .then((res) => res.json())
      .then((json) => setDetail(json))
      .catch((err) => console.log(err));
  }, [id]);

  if (!detail) return <p>Loading...</p>;

  return (
    <>
      <Button onClick={() => {navigate(-1)}}>&larr; 목록으로 돌아가기</Button>
      <Wrap>
        <Left>
          <Poster src={detail.Poster} alt={detail.Title} />
          <Intro>
            <div>{detail.Released}</div>
            <div>{detail.Runtime}</div>
          </Intro>
          <Title>{detail.Title}</Title>
        </Left>
        <Right>
          <h2>{detail.Title}</h2>
          <span>{detail.Year}</span>
          <span>{detail.Genre}</span>
          <span>{detail.Director}</span>
          <span>{detail.Plot}</span>
        </Right>
      </Wrap>
    </>
  );
}

export default MovieDetail;
