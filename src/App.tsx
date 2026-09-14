import './App.css'
import {LoginPage} from "./pages/LoginPage.tsx";
import {Navigate, Route, Routes} from "react-router";
import {Layout} from "./pages/Layout.tsx";
import {CategoryPage} from "./pages/CategoryPage.tsx";
import {UsersPage} from "./pages/UsersPage.tsx";
import {ProductPage} from "./pages/ProductPage.tsx";
import {CreateOrUpdateProductPage} from "./pages/CreateOrUpdateProductPage.tsx";
import {RequireAuthentication} from "./Components/Auth/RequireAuthentication.tsx";
const App = () => (
    <div className="App">
       <Routes>
           <Route path="/login" element={<LoginPage />} />
           <Route path={"/"} element={<Layout />}>
               <Route element={<RequireAuthentication />}>
                   <Route index element={<Navigate to={"/products"} replace/>} />
                   <Route path="category" element={<CategoryPage />}/>
                   <Route path="users" element={<UsersPage />}/>
                   <Route path="products"  element={<ProductPage />}/>
                   <Route path={"product"} element={<CreateOrUpdateProductPage />}/>
               </Route>
           </Route>
       </Routes>
    </div>
);

export default App
