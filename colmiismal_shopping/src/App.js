
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Main from "./pages/Main";
import Products from "./pages/Products";
import Bookmark from "./pages/Bookmark";


import "./App.css"
import { getProducts } from './api/api.js';
import ProductContext from './context/context.js';

import { v4 as uuidv4 } from 'uuid';

function App() {

  const [productList, setproductList] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    const localData = localStorage.getItem('bookmarks');
    return localData ? JSON.parse(localData) : [];
  });

  const [bookmarkAlerts, setBookmarkAlerts] = useState([]);

  const isBookmarked = (product) => {
    return bookmarks.some((bookmark) => bookmark.id === product.id);
  };

  const toggleBookmark = (product) => {
    if (isBookmarked(product)) {
        const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== product.id);
        setBookmarks(newBookmarks);
        const alertId = uuidv4();
        setBookmarkAlerts([
            ...bookmarkAlerts,
            { id: alertId, img: <img style={{paddingRight:'5px'}} src="/bookmarkoff.png" alt="" /> , message: '상품이 북마크에서 삭제되었습니다.' }
        ]);
        setTimeout(() => {
            setBookmarkAlerts((alerts) => alerts.filter((alert) => alert.id !== alertId));
        }, 5000);
    } else {
        const newBookmarks = [...bookmarks, product];
        setBookmarks(newBookmarks);
        const alertId = uuidv4();
        setBookmarkAlerts([
            ...bookmarkAlerts,
            { id: alertId, img: <img style={{paddingRight:'5px'}} src="/Bookmarkon.png" alt="" /> , message: '상품이 북마크에서 추가되었습니다.'}
        ]);
        setTimeout(() => {
            setBookmarkAlerts((alerts) => alerts.filter((alert) => alert.id !== alertId));
        }, 3000);
    }
};



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
    <ProductContext.Provider value={{ productList, setproductList, bookmarks, setBookmarks, bookmarkAlerts, setBookmarkAlerts, toggleBookmark, isBookmarked }}>
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
