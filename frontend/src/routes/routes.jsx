import { createBrowserRouter } from "react-router-dom";
import SearchResult from "../components/SearchResult/SearchResult";
import Record from "../components/Record/Record";
import Login from "../components/Login/Login"

const router = createBrowserRouter([
  {
    path: "/search",
    element: <SearchResult />,
  },
  {
    path: "/record",
    element: <Record />,
  },
  {
    path: "/",
    element: <Record/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

export default router;