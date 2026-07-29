import './App.css'
import {LoginPage} from "./pages/LoginPage.tsx";
import { Route, Routes} from "react-router";
import {Layout} from "./pages/Layout.tsx";

const App = () => (
    <div className="App">
       <Routes>
           <Route path="/login" element={<LoginPage />} />
           <Route path="/" element={<Layout />}>
           </Route>
       </Routes>
    </div>
);

export default App
