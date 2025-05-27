import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./app/landing/App";
import AboutPage from "./app/about/page";
import UnAvailable from "./errors/404";
import { ThemeProvider } from "./components/theme-provider";
import SignIn from "./app/auth/SignIn";
import SignUp from "./app/auth/SignUp";
import CarListings from "./app/cars/page";
import ContactUs from "./app/contact/page";
import { Toaster } from "./components/ui/sonner";
import PrivacyPolicy from "./app/privacy/page";
import Dealer from "./app/auth/Dealer";
import WorkShop from "./app/workshop/page";
import FavoritesPage from "./app/favorites/favorite";
import CarPage from "./app/cars/CarPage";
import UserProfile from "./app/profile/page";
import HistoryPage from "./app/history/page";
import ChatMenuPage from "./app/chat/page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/dealer" element={<Dealer />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/chat" element={<ChatMenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/workshop" element={<WorkShop />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cars" element={<CarListings />} />
          <Route path="/cars/:id" element={<CarPage />} />
          <Route path="*" element={<UnAvailable />} /> {/* Catch-all route */}
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
