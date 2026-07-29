import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConfigProvider} from "antd";
import {config} from "./theme/antdGlobalConfig.ts";
import {buttonConfig} from "./theme/antdButtonConfig.ts";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import './utils/extentions/fieldErrorExtentions.ts'
import {BrowserRouter, Route, Routes} from "react-router";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <ConfigProvider
              theme={config}
              button={buttonConfig}>
              <BrowserRouter>
                  <Routes>
                    <Route path={"/*"} element={<App />} />
                  </Routes>
              </BrowserRouter>
          </ConfigProvider>
      </Provider>
  </StrictMode>,
)
