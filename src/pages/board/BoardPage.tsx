import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.disabled};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 800;
  padding: 10px 20px;
  color: ${props => props.theme.colors.text.default};
  background-color: ${props => props.theme.colors.background.default};
  border-bottom: 1px solid ${props => props.theme.colors.primary};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid ${(props) => props.theme.colors.divider};

  th {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    padding: 4px 15px;
    color: ${(props) => props.theme.colors.text.default};
    background-color: ${(props) => props.theme.colors.secondary};
    border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  }

  td {
    padding: 6px 15px;
  }
`;

const IdCell = styled.th`
  width: 86px;
  text-align: center;
`;

const TitleCell = styled.th`
  text-align: left;
`;


const TableCell = styled.tr`
  color: ${(props) => props.theme.colors.text.default};
  background-color: ${(props) => props.theme.colors.background.paper};
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.default};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const IdCellTd = styled.td`
  width: 86px;
  text-align: center;
`;

const TitleCellTd = styled.td`
  text-align: left;
`;

const LinkCell = styled(Link)`
  text-decoration: none;
  width: 100%;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;


export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function BoardPage() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json: PostType[]) => setPosts(json))
      .catch((err) => console.log(err))
  }, []);

  if (!posts.length) return <Loading>데이터를 불러오는 중입니다...</Loading>;

  return (
    <Container>
      <Title>커뮤니티 게시판</Title>
      <Table>
        <thead>
          <tr>
            <IdCell>번호</IdCell>
            <TitleCell>제목</TitleCell>
            <th>작성자ID</th>
          </tr>
        </thead>
        <tbody>
        {posts.map((value, index) => (
            <TableCell key={index}>
              <IdCellTd>{value.id}</IdCellTd>
              <TitleCellTd>xc
                <LinkCell to={`/board/${value.id}`}>{value.title}</LinkCell>
              </TitleCellTd>
              <td>{value.userId}</td>
            </TableCell>
        ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default BoardPage;
