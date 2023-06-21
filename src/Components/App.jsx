import { Route, Routes } from "react-router-dom";
import React from "react";

import Layout from "./Layout";
import HomePage from "../Pages/HomePage";
import TweetsPage from "../Pages/TweetsPage";
import ErrorPage from "../Pages/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/tweets" element={<TweetsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
