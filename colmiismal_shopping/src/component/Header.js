
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

export default function Header() {

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleHamburgerClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div>
            <header className="header">
                <Link to="/" className="linkcustom">
                    <img id="cozlogo" src="/codestatelogo.png" alt="logo"></img>
                    <span id="cozname">COZ Shopping</span>
                </Link>
                <img className="hamburger" src="/hamburger.png" alt="hamburger button" onClick={handleHamburgerClick}></img>
                {dropdownVisible && (
                    <div ref={dropdownRef}>
                        <div id="dropdown_box">
                        <img id="polygon" src="/Polygon.png" alt="" ></img>
                            <div className="dropdown-menu">OOO님, 안녕하세요!</div>
                            <div className="dropdown-menu">
                                <Link to="/products/list" className="linkcustom">
                                    <img src="/producticon.png" alt="" ></img>
                                    <span>상품리스트 페이지</span>
                                </Link>
                            </div>
                            <div className="dropdown-menu">
                                <Link to="/bookmark" className="linkcustom">
                                    <img src="/bookmarkicon.png" alt="" ></img>
                                    <span>북마크 페이지</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    )
}

