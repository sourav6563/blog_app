import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.service.js";
import { login, logout } from "./features/auth.slice.js";
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between">
        <div className="w-full block">
          <Header />
          <main>Todo: {/* <Outlet /> */}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
