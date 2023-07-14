import Header from "../component/Header"
import Footer from "../component/Footer"

import Modal from "../component/Modal";

import "./Main.css"

import { useEffect, useState } from 'react';

import { useContext } from 'react';
import ProductContext from '../context/context';



export default function Main() {

    const { productList, bookmarks, setBookmarks } = useContext(ProductContext);

    const [isOpen, setIsOpen] = useState(false);

    const [selectedProduct, setselectedProduct] = useState({imageUrl: null, title: null, type: null});

    const [firstFourProducts, setFirstFourProducts] = useState([]);
    const [firstFourBookmarks, setFirstFourBookmarks] = useState([]);

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

    const handleImageClick = (product) => {
        setselectedProduct(product);
        setIsOpen(true);
    };

    useEffect(() => {
            setFirstFourProducts(productList.slice(0, 4));
        }, [productList]);

    useEffect(() => {
            console.log(firstFourProducts)
            }, [firstFourProducts])

    useEffect(() => {
            setFirstFourBookmarks(bookmarks.slice(0, 4));
        }, [bookmarks]);



    return (
        <div className="mainin">
            <Header></Header>
            <div className="maininin">
                <div className="listmain"><span>상품 리스트</span>
                    <ul className="mainul">
                        {firstFourProducts.map((product, index) => {
                            return (
                                    <li key={index} className="mainbox">
                                        <img className="productimage" onClick={() => handleImageClick({image_url: product.type === 'Brand' ? product.brand_image_url : product.image_url, title: product.type === 'Brand' ? product.brand_name : product.title, type: product.type})} src={product.type === 'Brand' ? product.brand_image_url : product.image_url} alt="" />
                                        {isOpen && (
                                            <Modal isOpen={isOpen} toggleModal={() => setIsOpen(!isOpen)}>
                                            <img src={selectedProduct.image_url} style={{ width: '100%', height: '100%', borderRadius: '10px', }} alt="" />
                                            <img src='/bookmarkoff.png' alt='' style={{position: 'absolute', left: '24px', bottom: '27px',}}></img>
                                            <div style={{position: 'absolute', left: '56px', bottom: '27px', color: 'white'}}>{selectedProduct.type === 'Category' ? '#' : ''}{selectedProduct.title}</div>
                                            </Modal>
                                        )}
                                        <img className="bookmarkonoff" src={isBookmarked(product) ? "/Bookmarkon.png" : "/bookmarkoff.png"} alt="" onClick={() => toggleBookmark(product)} ></img>
                                        <div className="brandtitle">{product.type === 'Category' ? '#' : ''}{product.type === 'Brand' ? product.brand_name : product.title}</div>
                                        <div className={product.sub_title ? "subtitletext" : "pricetext"}>{product.follower ? `${Number(product.follower).toLocaleString()}` : ''}{product.price ? `${Number(product.price).toLocaleString()}원` : ''}{product.sub_title ? product.sub_title : ''}</div>
                                        <div className={product.follower ? "notpurpletext" : "purpletext"}>{product.follower ? '관심고객수' : ''}{product.subtitle ? product.subtitle : ''}{product.discountPercentage ? `${product.discountPercentage}%` : ''}</div>
                                    </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="listmain"><span>북마크 리스트</span>
                    <ul className="mainul">
                        {firstFourBookmarks.map((bookmark, index) => {
                            return (
                                    <li key={index} className="mainbox">
                                        <img className="productimage" onClick={() => handleImageClick({image_url: bookmark.type === 'Brand' ? bookmark.brand_image_url : bookmark.image_url, title: bookmark.type === 'Brand' ? bookmark.brand_name : bookmark.title, type: bookmark.type})} src={bookmark.type === 'Brand' ? bookmark.brand_image_url : bookmark.image_url} alt="" />
                                        {isOpen && (
                                            <Modal isOpen={isOpen} toggleModal={() => setIsOpen(!isOpen)}>
                                            <img src={selectedProduct.image_url} style={{ width: '100%', height: '100%', borderRadius: '10px', }} alt="" />
                                            <img src='/bookmarkoff.png' alt='' style={{position: 'absolute', left: '24px', bottom: '27px',}}></img>
                                            <div style={{position: 'absolute', left: '56px', bottom: '27px', color: 'white'}}>{selectedProduct.type === 'Category' ? '#' : ''}{selectedProduct.title}</div>
                                            </Modal>
                                        )}
                                        <img className="bookmarkonoff" src={isBookmarked(bookmark) ? "/Bookmarkon.png" : "/bookmarkoff.png"} alt="" onClick={() => toggleBookmark(bookmark)} ></img>
                                        <div className="brandtitle">{bookmark.type === 'Category' ? '#' : ''}{bookmark.type === 'Brand' ? bookmark.brand_name : bookmark.title}</div>
                                        <div className={bookmark.sub_title ? "subtitletext" : "pricetext"}>{bookmark.follower ? `${Number(bookmark.follower).toLocaleString()}` : ''}{bookmark.price ? `${Number(bookmark.price).toLocaleString()}원` : ''}{bookmark.sub_title ? bookmark.sub_title : ''}</div>
                                        <div className={bookmark.follower ? "notpurpletext" : "purpletext"}>{bookmark.follower ? '관심고객수' : ''}{bookmark.subtitle ? bookmark.subtitle : ''}{bookmark.discountPercentage ? `${bookmark.discountPercentage}%` : ''}</div>
                                    </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

