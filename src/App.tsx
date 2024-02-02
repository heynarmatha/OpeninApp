import React from "react";
import LoginScreen from "./screens/loginScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//assets

import { PRIVATE_ROUTE_URL, PUBLIC_ROUTE_URL } from "./routes/variable";
import AppLayout from "./components/AppLayout";
import AppLayoutForMainScreen from "./components/AppLayoutForMain";
import UploadCSVScreen from "./screens/UploadCsvScreen";

function App() {
  const router = createBrowserRouter([
    // Add key to avoid React warning
    {
      path: PUBLIC_ROUTE_URL.login,
      element: <AppLayout key="layout" />,
      children: [
        {
          path: PUBLIC_ROUTE_URL.login,
          element: <LoginScreen key="LoginScreen" />,
        },
      ],
    },
    {
      path: "/",
      element: <AppLayoutForMainScreen key="AppLayoutForMainScreen" />,
      children: [
        {
          path: PRIVATE_ROUTE_URL.upload,
          element: <UploadCSVScreen key="UploadCSVScreen" />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
