import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
