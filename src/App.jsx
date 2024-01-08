import { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./scenes/firebase.mjs";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Dashboard from "./scenes/dashboard";
import Kontostand from "./scenes/dashboard";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="App"
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          {user && (
            <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
              <Sidebar /> {/* Sidebar will take its natural width */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Topbar /> {/* Topbar will stretch to the remaining width */}
                <main className="content" style={{ flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Kontostand" element={<Kontostand />} />
                  </Routes>
                </main>
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
