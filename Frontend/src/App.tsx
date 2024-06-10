import "./styles/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout.tsx";
import Homepage from "./pages/Homepage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
         path: "/",
        element: <Homepage />,


      }
    ]
  },
  // {
  //   path: "/app",
  //   element: <AppLayout />,
  // }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
