import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { ConfigProvider } from "antd";
import ScrollToTop from "./utils/ScrollToTop";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#b79032",
          },
        }}
      >
        <Router>
          <ScrollToTop />
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = Fragment;
              if (route.layout) {
                Layout = route.layout;
              }
              const Page = route.component;
              if (route.protected) {
                return (
                  <Route key={index} element={<UserRoute />}>
                    <Route
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    ></Route>
                  </Route>
                );
              } else {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  ></Route>
                );
              }
            })}
            {privateRoutes.map((route, index) => {
              let Layout = route.layout;
              const Page = route.component;
              return (
                <Route key={index} element={<AdminRoute />}>
                  <Route
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  ></Route>
                </Route>
              );
            })}
          </Routes>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
