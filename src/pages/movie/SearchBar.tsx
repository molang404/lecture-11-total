import { useState, type SubmitEvent } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

const Box = styled.form`
    display: flex;
    gap: 5px;
    justify-content: center;
    width: 100%;
    max-width: 500px;
`;

const Input = styled.input`
    flex: 1;
    padding: 18px 20px;
    outline: none;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.text.disabled};
    border-radius: 10px;
    color: ${props => props.theme.colors.text.default};
    font-size: 17px;
    transition: all 0.5s;

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
        border: 1px solid ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.text.disabled};
    }
`;

const Button = styled.button`
    padding: 18px 20px;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.background.paper};
    outline: none;
    border: 1px solid ${props => props.theme.colors.text.disabled};
    text-align: center;
    color: ${props => props.theme.colors.text.default};
    font-size: 17px;
    font-weight: bold;
    transition: all 0.5s;

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
        border: 1px solid ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
    }
`;

function SearchBar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const k = keyword.trim();
        if (!k) return;

        navigate(`/movie?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <Box onSubmit={onSubmit}>
            <Input
                placeholder={"영화 검색..."}
                onChange={e => setKeyword(e.target.value)}
                value={keyword}
            />
            <Button type={"submit"}>
                <FaSearch />
            </Button>
        </Box>
    );
}

export default SearchBar;
