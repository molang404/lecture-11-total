import { useState, type SubmitEvent } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
`;

const InputSection = styled.form`
    display: flex;
    gap: 10px;
    padding: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.background.paper};
    color: ${props => props.theme.colors.divider};
`;

const StyledInput = styled.input`
    flex: 1;
    padding: 12px 15px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    font-size: 16px;
    outline: none;
    
    &:hover {
        border-color: ${props => props.theme.colors.primary};
    }
`;

const AddButton = styled.button`
    padding: 0 20px;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-content: center;
    justify-content: center;
    transition: all 0.5s;
    
    &:hover {
        opacity: 0.9;
    }
`

function TodoPage() {
    const [inputValue, setInputValue] = useState("");  // input에 입력된 값 관리
    const [todos, setTodos] = useState<string[]>([]);                    // 할 일 목록 관리
    
    const handleAddToDo = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim()) return;
        setTodos([...todos, inputValue]);
        setInputValue("");
    };
    
    return (
        <Container>
            <Title>Todo list</Title>

            <InputSection onSubmit={handleAddToDo}>
                <StyledInput
                    placeholder={"오늘의 할 일을 입력하세요."}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <AddButton type={"submit"}>
                    <FaPlus />
                </AddButton>
            </InputSection>

            <ul>
                {todos.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
        </Container>
    );
}

export default TodoPage;