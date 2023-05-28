import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages and Components
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import Resources from "./pages/Resources";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Login />} />
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
