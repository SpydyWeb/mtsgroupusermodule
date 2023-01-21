import React from 'react';
import '../App.css';
import SubHeader from './Headers/SubHeader';
import IndexNavbar from './Navbars/IndexNavbar';
import Footer from './Footers/Footer';
const Home = () => {
    return (
        <>
            <SubHeader />
            <IndexNavbar />
            <section className="mt-18 md:mt-10 pb-40 relative bg-blueGray-100">
                <div className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20" style={{ transform: 'translateZ(0)' }}>
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon className="text-blueGray-100 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
                <div className="container mx-auto">
                    <div className="flex flex-wrap overflow-hidden">
                        <div className="w-full md:w-6/12 lg:w-1/2 px-12 md:px-4 ">
                            <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 ">
                                <blockquote className="relative p-8 mb-4 border-0">
                                    <h2 className="text-4xl font-bold text-gray-600">Services</h2>
                                    <p className=" font-light mt-2 text-gray-600">
                                        MTS Group LLC., is a nationwide appraisal and title management company providing services to a
                                        variety of mortgage originators, servicers, quality control outsourcers, credit unions, and
                                        secondary entities. We are committed to providing world-class service through a consultative
                                        approach designed to build a trusted mutually beneficial relationship. We are customer focused
                                        working each day to meet and exceed our customer’s expectations.
                                    </p>
                                    <img src="https://www.mtsgrp.net/img/about-img.jpg" alt="service" />
                                </blockquote>
                            </div>
                        </div>

                        <div className="w-full md:w-6/12 px-4">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-6/12 px-4">
                                    <div className="relative flex flex-col mt-4 shadow-lg bg-blueGray-600 mb-4">
                                        <div className="px-4 py-3 flex-auto">
                                            <div className="text-blueGray-500 bg-white p-3 text-center mx-auto inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ">
                                                <i className="fas fa-sitemap"></i>
                                            </div>
                                            <p className="text-white" style={{ fontSize: '14px' }}>
                                                We provide nationwide coverage through a valuations panel consisting of state licensed and
                                                certified appraisers, licensed real estate agents, and inspectors. We offer all conventional
                                                and FHA appraisals, Residential Evaluations, AVMs, Property Condition Reports, and Broker
                                                Price Options streamlined for your convenience through one location.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col min-w-0 shadow-lg bg-white mb-4">
                                        <div className="px-4 py-3 flex-auto">
                                            <div className="bg-blueGray-600 text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ">
                                                <i className="fas fa-drafting-compass"></i>
                                            </div>

                                            <p className="text-blueGray-500" style={{ fontSize: '14px' }}>
                                                We provide nationwide coverage through a valuations panel consisting of state licensed and
                                                certified appraisers, licensed real estate agents, and inspectors. We offer all conventional
                                                and FHA appraisals, Residential Evaluations, AVMs, Property Condition Reports, and Broker
                                                Price Options streamlined for your convenience through one location.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-6/12 px-4 ">
                                    <div className="relative flex flex-col min-w-0 mt-4 shadow-lg bg-white mb-4">
                                        <div className="px-4 py-3  flex-auto">
                                            <div className="bg-blueGray-600 text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ">
                                                <i className="fas fa-newspaper"></i>
                                            </div>

                                            <p className="text-blueGray-500" style={{ fontSize: '14px' }}>
                                                First Mortgage and equity lenders, mortgage servicers, and law firms rely on title search
                                                reports to determine the legitimacy of the property in question. A title search requires a
                                                thorough examination of property records to establish ownership of the property in question.
                                                We provide full chain title searches, current owner, and two owner searches which include
                                                protection from loses.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col min-w-0 shadow-lg bg-blueGray-600 mb-4">
                                        <div className="px-4 py-3 flex-auto ">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <i className="fas fa-file-alt"></i>
                                            </div>

                                            <p className="text-white" style={{ fontSize: '14px' }}>
                                                Our customer base consists of local and national lenders, credit unions, mortgage servicers,
                                                quality control outsourcers, and secondary entities who have a variety of needs. We offers a
                                                wide array of products and services, all designed to make lending simpler and efficient.
                                                Whether its a streamlined refinance, a $10,000,000 purchase, a HELOC, or complicated
                                                Commercial transaction, we have the solution that fit your needs.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="justify-center text-center flex flex-wrap mt-24">
                    <div className="w-full md:w-8/12 px-12 md:px-4">
                        <h2 className="font-semibold text-4xl">Services</h2>
                        <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
                            MTS Group LLC., is a nationwide appraisal and title management company providing services to a variety of
                            mortgage originators, servicers, quality control outsourcers, credit unions, and secondary entities. We are
                            committed to providing world-class service through a consultative approach designed to build a trusted mutually
                            beneficial relationship. We are customer focused working each day to meet and exceed our customer’s
                            expectations.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className="justify-center flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4 min-w-0 shadow-lg bg-blueGray-600 mb-4">
                                    <div className="px-4 py-3 flex-auto ">
                                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <i className="fas fa-file-alt"></i>
                                        </div>

                                        <p className="mb-4 text-white">
                                            Our customer base consists of local and national lenders, credit unions, mortgage servicers,
                                            quality control outsourcers, and secondary entities who have a variety of needs. We offers a
                                            wide array of products and services, all designed to make lending simpler and efficient. Whether
                                            its a streamlined refinance, a $10,000,000 purchase, a HELOC, or complicated Commercial
                                            transaction, we have the solution that fit your needs.
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full lg:w-4/12 flex flex-col min-w-0 mt-4 shadow-lg bg-white mb-4">
                                    <div className="px-4 py-3  flex-auto">
                                        <div className="bg-blueGray-600 text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ">
                                            <i className="fas fa-newspaper"></i>
                                        </div>

                                        <p className="mb-4 text-blueGray-500">
                                            First Mortgage and equity lenders, mortgage servicers, and law firms rely on title search
                                            reports to determine the legitimacy of the property in question. A title search requires a
                                            thorough examination of property records to establish ownership of the property in question. We
                                            provide full chain title searches, current owner, and two owner searches which include
                                            protection from loses.
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full lg:w-4/12 flex flex-col min-w-0 shadow-lg bg-blueGray-600 mb-4">
                                    <div className="px-4 py-3 flex-auto ">
                                        <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <i className="fas fa-file-alt"></i>
                                        </div>

                                        <p className="mb-4 text-white">
                                            Our customer base consists of local and national lenders, credit unions, mortgage servicers,
                                            quality control outsourcers, and secondary entities who have a variety of needs. We offers a
                                            wide array of products and services, all designed to make lending simpler and efficient. Whether
                                            its a streamlined refinance, a $10,000,000 purchase, a HELOC, or complicated Commercial
                                            transaction, we have the solution that fit your needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="block relative z-1 bg-blueGray-600"></section>
            <section className="pb-16 bg-blueGray-200 relative pt-32">
                <div className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20" style={{ transform: 'translateZ(0)' }}>
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>

                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-10 px-12 relative z-10">
                        <div className="w-full text-center lg:w-8/12">
                            <h3 className="font-semibold text-3xl">Call To Action</h3>
                            <p className="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
                                At MTS we are here for only one purpose and that is to make things easier for you our client partner. We
                                would love the chance to earn your business.
                            </p>
                            <div className="sm:block flex flex-col mt-10">
                                <a
                                    href="#"
                                    className="get-started text-white font-bold px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-2 bg-blueGray-400 active:bg-blueGray-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                                >
                                    <i class="fas fa-phone-alt mr-2"></i>
                                    Call us
                                </a>
                                <a
                                    href="#"
                                    className="github-star sm:ml-1 text-white font-bold px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
                                >
                                    <i class="fas fa-hands-helping mr-2"></i>
                                    <span>Request for Help</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;
