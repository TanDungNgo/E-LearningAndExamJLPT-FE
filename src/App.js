import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { ConfigProvider } from "antd";
import ScrollToTop from "./utils/ScrollToTop";
import UserRoute from "./routes/UserRoute";

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
                  <Route element={<UserRoute/>}>
                    <Route
                      key={index}
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
            })}
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
