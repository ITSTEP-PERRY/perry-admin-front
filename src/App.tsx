import './App.css'
import {LoginPage} from "./pages/LoginPage.tsx";
import { Route, Routes} from "react-router";
import {Layout} from "./pages/Layout.tsx";
import {CategoryPage} from "./pages/CategoryPage.tsx";
import {UsersPage} from "./pages/UsersPage.tsx";
const App = () => (
    <div className="App">
       <Routes>
           <Route path="/login" element={<LoginPage />} />
           <Route path="/" element={<Layout />}>
               <Route path="category" element={<CategoryPage />}/>
               <Route path="users" element={<UsersPage />}/>
           </Route>
       </Routes>
    </div>
);

export default App
