import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../components/SearchPage/SearchPage";
import SearchResult from "../components/SearchResult/SearchResult";
import Record from "../components/Record/Record";
import RecordV1_0 from "../components/RecordV1.0/Record";
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
    // element: <SearchPage/>,
    element: <Record/>,
  },
  {
    path: "/recordV1_0",
    element: <RecordV1_0/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

export default router;