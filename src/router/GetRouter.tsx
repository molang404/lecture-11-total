import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";

const GetRouter = createBrowserRouter([
    {
        path: "/",                                        // "/"로 시작하는 주소로 사용자가 들어왓다면
        element: <MainLayout />,                          // <MainLayout /> 먼저 화면에 출력되고,
        children: [
            { index: true, element: <Home /> },           // 주소가 "/"만 있다면, <Home />을 덧붙이고,
            { path: "todo", element: <TodoPage /> },      // 주소가 "/" + "to do"라면, <TodoPage />를 덧붙인다
        ],
    },
]);

export default GetRouter;