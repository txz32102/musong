import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../components/SearchPage/SearchPage";
import SearchResult from "../components/SearchResult/SearchResult";
import Record from "../components/Record/Record";
import RecordV1_0 from "../components/RecordV1.0/Record";

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
  {
    path: "/recordV1_0",
    element: <RecordV1_0/>,
  },
]);

export default router;