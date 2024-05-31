import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./AuthContext.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./components/common/Login.jsx";
import SignUp from "./components/common/SignUp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/login/*" element={<Login />}/>
          <Route path="/signup/*" element={<SignUp />}/>
          {/* <Route path="/profile/:id" element={< ProfileContent/>} /> */}
        </Routes>
    </BrowserRouter>
  </AuthProvider>
);

// App rouring
{/* <nav>
<ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/about">About</Link>
  </li>
  <li>
    <Link to="/dashboard">Dashboard</Link>
  </li>
</ul>
</nav>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
<Route path="*" element={<NotFound />} />
</Routes> */}