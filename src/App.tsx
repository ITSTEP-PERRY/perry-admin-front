import './App.css'
import {LoginPage} from "./pages/LoginPage.tsx";
import {Navigate, Route, Routes} from "react-router";
import {Layout} from "./pages/Layout.tsx";
import {CategoryPage} from "./pages/CategoryPage.tsx";
import {UsersPage} from "./pages/UsersPage.tsx";
import {ProductPage} from "./pages/ProductPage.tsx";
import {CreateOrUpdateProductPage} from "./pages/CreateOrUpdateProductPage.tsx";
import {RequireAuthentication} from "./Components/Auth/RequireAuthentication.tsx";
import {HealthCheck} from "./Components/Utils/HealthCheck.tsx";
import {RequireAuthorization} from "./Components/Auth/RequireAuthorization.tsx";
const App = () => (
    <div className="App">
       <Routes>
           <Route element={<HealthCheck />}>
               <Route path="/login" element={<LoginPage />} />
               <Route element={<RequireAuthentication />}>
                   <Route element={<RequireAuthorization roles={["Admin"]} />}>
                   <Route path={"/"} element={<Layout />}>
                           <Route index element={<Navigate to={"/products"} replace/>} />
                           <Route path="category" element={<CategoryPage />}/>
                           <Route path="users" element={<UsersPage />}/>
                           <Route path="products"  element={<ProductPage />}/>
                           <Route path={"product"} element={<CreateOrUpdateProductPage />}/>
                   </Route>
                   </Route>
               </Route>
           </Route>
       </Routes>
    </div>
);

export default App
