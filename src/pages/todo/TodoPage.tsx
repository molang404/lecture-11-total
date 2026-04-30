import { useState, type SubmitEvent, useEffect } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

type TodoType = {
    id: number;
    text: string;
    isCompleted: boolean;
}

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
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    
    &:hover {
        opacity: 0.9;
    }
`

function TodoPage() {
    const [inputValue, setInputValue] = useState("");  // input에 입력된 값 관리
    const [todos, setTodos] = useState<TodoType[]>(() => {
        // todos라는 state가 TodoPage 컴포넌트가 불러와질 때 마련되는데,
        // 그 저장소의 초기값은 이 함수에서 리턴된 값으로 결정됨
        // localStorage에서 "todos"라는 값을 불러오고
        // 그 값이 '있으면' Javascript의 객체(배열) 형태로 반환해서 리턴하고, '없으면' 빈 배열을 리턴
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    }); // 할 일 목록 관리
    
    const handleAddToDo = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputValue.trim()) return;
        const newTodo: TodoType = {
            id: Date.now(), // 고유값으로, 사용자가 "저장하는 지금 시간"을 id로 쓰겠다.
            text: inputValue,
            isCompleted: false,
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    useEffect(() => {
        // todos라는 state는 현재 Array를 저장하고 있기 때문에
        // 그 값을 localstorage에 저장하기 위해서는 JSON 형식으로 바꿔줄 필요가 있음
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    
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
                    <li key={index}>{value.text}</li>
                ))}
            </ul>
        </Container>
    );
}

export default TodoPage;