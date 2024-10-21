import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../components/SearchPage/SearchPage";
import SearchResult from "../components/SearchResult/SearchResult";

const router = createBrowserRouter([
  {
    path: "/search",
    element: <SearchResult />,
  },
  {
    path: "/",
    element: <SearchPage/>,
  },
]);

export default router;