// App.jsx
import "./styles/App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Layout/RootLayout.tsx";
import Homepage from "./pages/Homepage.tsx";
import AppLayout from "./Layout/AppLayout.tsx";
import {SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
  },
  {
    path: "/sign-in/*",
    element: (
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;