import Header from "../component/Header"
import Footer from "../component/Footer"

import "./Products.css"
import "./Main.css"

import { useEffect, useState } from 'react';

import { useContext } from 'react';
import ProductContext from '../context/context';

export default function Products() {

    const { productList, bookmarks, setBookmarks } = useContext(ProductContext);

    const [selectedFilter, setSelectedFilter] = useState('all');




    return (
        <div className="productin">
            <Header></Header>
                <div className="productinin">
                    <div className="filter" >
                        <ul className="productul">
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt=""></img>
                                <div className="filtertext" onClick={() => setSelectedFilter('all')}>전체</div>
                            </li>
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt=""></img>
                                <div className="filtertext">상품</div>
                            </li>
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1571907483091-fbe746bee132?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt=""></img>
                                <div className="filtertext">카테고리</div>
                            </li>
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt=""></img>
                                <div className="filtertext">기획전</div>
                            </li>
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt=""></img>
                                <div className="filtertext">브랜드</div>
                            </li>
                        </ul>
                    </div>
                    <ul>

                    </ul>
                </div>
            <Footer></Footer>
        </div>
    )
}

