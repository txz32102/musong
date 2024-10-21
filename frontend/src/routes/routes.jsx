import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../components/SearchPage/SearchPage";
import SearchResult from "../components/SearchResult/SearchResult";
import Record from "../components/Record/Record";

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
    element: <SearchPage/>,
  },
]);

export default router;