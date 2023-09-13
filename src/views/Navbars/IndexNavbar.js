import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// components

export default function Navbar(props) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const Navigate = useNavigate();
    const NavLinks = [
        { label: 'Services', path: '/services' },
        { label: 'Products', path: '/products' },
        { label: 'Integrations', path: '/integrations' },

        ,
        { label: 'About Us', path: '/about' },

        ,
        { label: 'Contact Us', path: '/contact' },
        { label: 'Order Appraisal', path: '/' }
        // { label: "Order Title" },
    ];
    return (
        <>
            <nav className="top-0 sticky z-50 w-full flex flex-wrap items-center justify-between px-2 navbar-expand-lg bg-white shadow">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a href="/">
                            <a
                                className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                                href="/"
                            >
                                <img src="https://www.mtsgrp.net/img/logo/logoorgv2.png" alt="Logo" style={{ width: '145px' }} />
                            </a>
                        </a>
                        <button
                            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <div
                        className={
                            'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' + (navbarOpen ? ' block' : ' hidden')
                        }
                        id="example-navbar-warning"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="flex items-center active ">
                                <Link
                                    to="/"
                                    className={
                                        ' py-2 px-4  font-semibold block w-full whitespace-nowrap bg-transparent text-blueGray-700 active'
                                    }
                                >
                                    Home
                                </Link>
                            </li>
                            {NavLinks.map((ele, indx) => {
                                return (
                                    <li className="flex items-center" key={indx}>
                                        <Link
                                            to={ele.path}
                                            className={
                                                ' py-2 px-4  font-semibold block w-full whitespace-nowrap bg-transparent text-blueGray-700'
                                            }
                                        >
                                            {ele.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
