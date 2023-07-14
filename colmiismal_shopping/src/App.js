
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Main from "./pages/Main";
import Products from "./pages/Products";
import Bookmark from "./pages/Bookmark";


import "./App.css"
import { getProducts } from './api/api.js';
import ProductContext from './context/context.js';

function App() {

  const [productList, setproductList] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    const localData = localStorage.getItem('bookmarks');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    getProducts()
        .then(data => { 
            setproductList(data); 
        });
    }, []);

  useEffect(() => {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

  useEffect(() => {
      console.log(productList)
    }, [productList])

  return (
    <ProductContext.Provider value={{ productList, setproductList, bookmarks, setBookmarks }}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Main></Main>}>
            </Route>
            <Route path="/products/list" element={<Products></Products>}>
            </Route>
            <Route path="/bookmark" element={<Bookmark></Bookmark>}>
            </Route>
          </Routes>
        </div>
      </Router>
    </ProductContext.Provider>
  );
}

export default App;
