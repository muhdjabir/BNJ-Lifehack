import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and Components
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import Resources from "./pages/Resources";
import Register from "./pages/Register";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/resources" element={<Resources />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
