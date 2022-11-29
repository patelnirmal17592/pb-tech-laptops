import LandingPage from "./pages/LandingPage";
import React from "react";
import Test from "./components/Test";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddLaptopForm from "./components/AddLaptopForm/AddLaptopForm";
import { ProductPage } from "./pages/ProductPage";
import Header from "./components/Header/Header";
import "./App.css";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        laptops: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_DEV_APOLLO_URI,
  cache,
});

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Header />
      </div>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/graphql" element={<Test />} />
            <Route path="/add-laptop" element={<AddLaptopForm />} />
            <Route path="/products/:type" element={<ProductsPage />} />
            <Route path="/product-page/:id" element={<ProductPage />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
