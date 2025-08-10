import { Outlet, NavLink } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function App() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <header className="flex flex-col items-center text-3xl gap-4">
        {showMessage && (
          <Typography variant="body1" color="textSecondary" align="center">
            To add the name of the field and options, please go to the Edit page.
          </Typography>
        )}

        <nav>
          <Stack direction="row" spacing={2}>
            <NavLink to="/create" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "contained" : "outlined"}
                  color="primary"
                  size="large"
                >
                  Create Form
                </Button>
              )}
            </NavLink>

            <NavLink to="/myforms" style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "contained" : "outlined"}
                  color="secondary"
                  size="large"
                >
                  My Forms
                </Button>
              )}
            </NavLink>
          </Stack>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
