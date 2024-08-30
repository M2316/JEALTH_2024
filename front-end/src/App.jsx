import "./App.css";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import HealthPage from "./pages/health/HealthPage";
import { AnimatePresence } from "framer-motion";
import Oauth2LoginRedirect from "./pages/login/Oauth2LoginRedirect";

function App() {
    const { state } = useLocation();

    return (
        <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
                path={`/${state ? "?logout=" + state["logout"] : ""}`}
                element={<PrivateRoute component={<Home></Home>} />}
            />
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
                path="/app/health"
                element={<PrivateRoute component={<HealthPage />} />}
            />
            <Route path="/oauth2/redirect" element={<Oauth2LoginRedirect />} />
        </Routes>
    );
}

export default App;
