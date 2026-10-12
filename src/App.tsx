import "./App.css";
import { LoginPage } from "./pages/LoginPage.tsx";
import { Navigate, Route, Routes, useSearchParams } from "react-router";
import { Layout } from "./pages/Layout.tsx";
import { CategoryPage } from "./pages/CategoryPage.tsx";
import { UsersPage } from "./pages/UsersPage.tsx";
import { ProductPage } from "./pages/ProductPage.tsx";
import { CreateOrUpdateProductPage } from "./pages/CreateOrUpdateProductPage.tsx";
import { RequireAuthentication } from "./Components/Auth/RequireAuthentication.tsx";
import { HealthCheck } from "./Components/Utils/HealthCheck.tsx";
import { RequireAuthorization } from "./Components/Auth/RequireAuthorization.tsx";
import { NotFound404Page } from "./pages/NotFound404Page.tsx";
import { OrdersPage } from "./pages/OrdersPage.tsx";
import { ReviewPage } from "./pages/ReviewPage.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";

const App = () => {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "/products";
  return (
    <div className="App">
      <Routes>
        <Route element={<HealthCheck />}>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuthentication />}>
            <Route element={<RequireAuthorization roles={["Admin"]} />}>
              <Route path={"/"} element={<Layout />}>
                <Route index element={<Navigate to={returnUrl} replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="category" element={<CategoryPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="products" element={<ProductPage />} />
                <Route
                  path={"product/:productId?"}
                  element={<CreateOrUpdateProductPage />}
                />
                <Route path={"orders/:type?"} element={<OrdersPage />} />
                <Route path={"reviews/:id?/:type?"} element={<ReviewPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path={"/*"} element={<NotFound404Page />} />
      </Routes>
    </div>
  );
};

export default App;
