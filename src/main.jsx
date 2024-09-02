import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./feature/store.js";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Congrats from "./components/Congrats.jsx";

const router=createBrowserRouter([
  {
    path:'/',
    element: <App/>,
  },
  {
        path:'/complete',
        element: <Congrats/>
  },
    
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
