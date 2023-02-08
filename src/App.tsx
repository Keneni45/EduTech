import "./App.css";
import PlainQuestionData from "./Pages/PlainQuestionPage/PlainQuestionData";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GroupedQuestionPage from "./Pages/GroupedQuestionPage/GroupedQuestionPage";
import DirectionPage from "./Pages/DirectionPage/DirectionPage";
import LayoutComponent from "./components/LayoutComponent";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LayoutComponent />,
      children: [
        {
          path: "/",
          element: <PlainQuestionData />,
        },

        {
          path: "/grouped-question",
          element: <GroupedQuestionPage />,
        },

        {
          path: "/direction",
          element: <DirectionPage />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
