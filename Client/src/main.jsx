import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App.jsx";
import store from "./Redux/store.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <SnackbarProvider
    autoHideDuration={1000}
    hideIconVariant
    maxSnack={3}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </SnackbarProvider>
  // </StrictMode>
);
