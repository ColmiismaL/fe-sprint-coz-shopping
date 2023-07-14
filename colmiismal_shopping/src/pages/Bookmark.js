import Header from "../component/Header"
import Footer from "../component/Footer"

import Modal from "../component/Modal";

import "./Bookmark.css"
import "./Main.css"
import "./Products.css"

import { useEffect, useState } from 'react';

import { useContext } from 'react';
import ProductContext from '../context/context';


export default function Bookmark() {

    const { bookmarks, setBookmarks, } = useContext(ProductContext);

    const [isOpen, setIsOpen] = useState(false);

    const [page, setPage] = useState(1);

    const [selectedFilter, setSelectedFilter] = useState('all');

    const [selectedProduct, setselectedProduct] = useState({imageUrl: null, title: null, type: null});

    const isBookmarked = (product) => {
        return bookmarks.some((bookmark) => bookmark.id === product.id);
    };

    const toggleBookmark = (product) => {
        if (isBookmarked(product)) {
            const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== product.id);
            setBookmarks(newBookmarks);
        } else {
            const newBookmarks = [...bookmarks, product];
            setBookmarks(newBookmarks);
        }
    };

    const filteredBookmarks = bookmarks.filter(product => {
        switch (selectedFilter) {
            case 'all':
                return true;
            case 'product':
                return product.type === 'Product';
            case 'exhibition':
                return product.type === 'Exhibition';
            case 'brand':
                return product.type === 'Brand';
            case 'category':
                return product.type === 'Category';
            default:
                return true;
        }
    });

    const handleImageClick = (product) => {
        setselectedProduct(product.id);
        setIsOpen(true);
    };

    useEffect(() => {
        setPage(1);
    }, [selectedFilter]);

    const productsPerPage = 18;
    const displayedProducts = filteredBookmarks.slice(0, page * productsPerPage);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 200) {
                setPage(prev => prev + 1);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);





    return (
        <div>
            <Header></Header>
            <div className="productinin">
                    <div className="filter" >
                        <ul className="productul">
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt=""></img>
                                <div className={selectedFilter === 'all' ? 'selectedtext' : 'filtertext'} onClick={() => setSelectedFilter('all')}>전체</div>
                            </li>
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt=""></img>
                                <div className={selectedFilter === 'product' ? 'selectedtext' : 'filtertext'} onClick={() => setSelectedFilter('product')}>상품</div>
                            </li>
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1571907483091-fbe746bee132?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt=""></img>
                                <div className={selectedFilter === 'category' ? 'selectedtext' : 'filtertext'} onClick={() => setSelectedFilter('category')}>카테고리</div>
                            </li>
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt=""></img>
                                <div className={selectedFilter === 'exhibition' ? 'selectedtext' : 'filtertext'} onClick={() => setSelectedFilter('exhibition')}>기획전</div>
                            </li>
                            <li className="filterbutton">
                                <img className="filterimage" src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt=""></img>
                                <div className={selectedFilter === 'brand' ? 'selectedtext' : 'filtertext'} onClick={() => setSelectedFilter('brand')}>브랜드</div>
                            </li>
                        </ul>
                    </div>
                    <div >
                        <ul className="mainul">
                            {displayedProducts.map((product, index) => (
                                <li key={index} className="mainbox">
                                            <img className="productimage" onClick={() => handleImageClick({image_url: product.type === 'Brand' ? product.brand_image_url : product.image_url, title: product.type === 'Brand' ? product.brand_name : product.title, type: product.type})} src={product.type === 'Brand' ? product.brand_image_url : product.image_url} alt="" />
                                            
                                            <img className="bookmarkonoff" src={isBookmarked(product) ? "/Bookmarkon.png" : "/bookmarkoff.png"} alt="" onClick={() => toggleBookmark(product)} ></img>
                                            <div className="brandtitle">{product.type === 'Category' ? '#' : ''}{product.type === 'Brand' ? product.brand_name : product.title}</div>
                                            <div className={product.sub_title ? "subtitletext" : "pricetext"}>{product.follower ? `${Number(product.follower).toLocaleString()}` : ''}{product.price ? `${Number(product.price).toLocaleString()}원` : ''}{product.sub_title ? product.sub_title : ''}</div>
                                            <div className={product.follower ? "notpurpletext" : "purpletext"}>{product.follower ? '관심고객수' : ''}{product.subtitle ? product.subtitle : ''}{product.discountPercentage ? `${product.discountPercentage}%` : ''}</div>
                                        </li>
                            ))}
                            {isOpen && (
                                                <Modal isOpen={isOpen} toggleModal={() => setIsOpen(!isOpen)}>
                                                <img className="imagemodal" src={selectedProduct.image_url} alt="" />
                                                <img className="bookmarkmodal" src={isBookmarked(selectedProduct.id) ? "/Bookmarkon.png" : "/bookmarkoff.png"} alt=''></img>
                                                <div className="titlemodal">{selectedProduct.type === 'Category' ? '#' : ''}{selectedProduct.title}</div>
                                                </Modal>
                            )}
                        </ul>
                    </div>
                </div>
            <Footer></Footer>
        </div>
    )
}

