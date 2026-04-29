import { createGlobalStyle } from "styled-components";

// ts : 내보내는 게 함수 또는 값 -> TS 엔진이 읽어줌
// tsx : 내보내는 게 컴포넌트 -> React가 읽어줘야 됨

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        background-color: ${props => props.theme.colors.background.default};
        color: ${props => props.theme.colors.text.default};
        font-family: "Pretendard", sans-serif;
    }
    
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;