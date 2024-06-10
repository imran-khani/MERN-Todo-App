import "./styles/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
