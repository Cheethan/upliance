import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import App from "./App";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm";
import MyForms from "./pages/MyForms";
import EditForm from "./pages/Edit"; 
import { loadForms } from "./utils/localStorage";
import FillForm from "./pages/FillForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "create",
        element: <CreateForm />,
      },
      {
        path: "preview/:id",
        element: <PreviewForm />,
        loader: ({ params }) => {
          const forms = loadForms();
          return forms.find((f) => f.id === params.id) || null;
        },
      },
      {
        path: "myforms",
        element: <MyForms />,
        loader: () => loadForms(),
      },
      {
        path: "fill/:id",
        element: <FillForm />,
        loader: ({ params }) => {
          const forms = loadForms();
          return forms.find(f => f.id === params.id) || null;
        },
      },
      {
        path: "edit/:id", 
        element: <EditForm />,
        loader: ({ params }) => {
          const forms = loadForms();
          return forms.find((f) => f.id === params.id) || null;
        },
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
