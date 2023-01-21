import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Login from "./Login";
import { Link } from "react-router-dom";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white">
        <div>
          <div className="flex space-x-40 items-center justify-between px-14 pt-4 pb-3.5 bg-white shadow border-bottom border-red-700 width: 1280px; height: 60px">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/Dashboard"
                    className=" hover:bg-gray-700 text-black px-3 py-2 hover:text-maroon rounded-md text-sm font-montserrat font-bold"
                  >
                    DASHBOARD
                  </Link>

                  <Link to="/ListPertanyaan"
                    className="text-black hover:bg-gray-700 hover:text-maroon px-3 py-2 rounded-md text-sm font-montserrat font-bold"
                  >
                    LIST PERTANYAAN
                  </Link>

                  <Link to="/TambahPertanyaan"
                    className="text-black hover:bg-gray-700 hover:text-maroon px-3 py-2 rounded-md text-sm font-montserrat font-bold"
                  >
                    TAMBAH PERTANYAAN
                  </Link>
                </div>
              </div>
            </div>
            <div> 
              <Link to="/Login"> 
                <button className="inline-flex w-full border border-maroon justify-center py-2 px-4 bg-white text-maroon hover:text-darkred font-montserrat font-bold rounded-md">LOGOUT</button>
              </Link>
                

            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-maroon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/Dashboard" 
                  className="hover:bg-gray-700 text-black hover:text-maroon block px-3 py-2 rounded-md text-base font-bold"
                >
                  DASHBOARD
                </Link>

                <Link to="/ListPertanyaan"
                  className= "hover:bg-gray-700 text-black hover:text-maroon block px-3 py-2 rounded-md text-base font-bold"
                >
                  LIST PERTANYAAN
                </Link>

                <Link to="/TambahPertanyaan"
                  href="/TambahPertanyaan"
                  className=" hover:bg-gray-700 text-black hover:text-maroon block px-3 py-2 rounded-md text-base font-bold"
                >
                  TAMBAH PERTANYAAN
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>

      {/*<header className="bg-grey">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">INI HOME</h1>
        </div>
      </header>
      {/*<main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {<!--content --> 
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"> inii isinya </div>
          </div>
          {/* <!-- /End content --> }
        </div>
      </main>*/}
    </div>
  );
}

