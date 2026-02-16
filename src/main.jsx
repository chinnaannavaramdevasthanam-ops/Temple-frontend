import { StrictMode } from 'react'
import ErrorBoundary from "./components/ErrorBoundary";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { LoaderProvider } from "./context/LoaderContext";
import GlobalLoader from "./components/GlobalLoader";
import { loaderRef } from "./utils/loaderRef";
import "./index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>

      <LoaderProvider ref={loaderRef}>
        <App />
        <GlobalLoader />
        <Toaster position="top-center" />
      </LoaderProvider>

    </ErrorBoundary>
  </StrictMode>
)
