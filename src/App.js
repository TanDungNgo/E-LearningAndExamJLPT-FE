import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { ConfigProvider } from "antd";
import ScrollToTop from "./utils/ScrollToTop";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#b79032",
        },
      }}
    >
      <Router>
        <div className="App">
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
            <Route path="/notfound" element={<h1>Not found</h1>}></Route>
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
