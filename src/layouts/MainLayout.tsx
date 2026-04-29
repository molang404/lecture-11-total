import  styled from "styled-components";
import Header from "../components/layout/Header.tsx";
import { Outlet } from "react-router";

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 40px;
`;

function MainLayout() {
    return (
        <LayoutWrapper>
            <Header />
            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutWrapper>
    );
}

export default MainLayout;