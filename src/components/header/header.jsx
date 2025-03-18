'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from "next/image";
import { ShoppingCart, Search, Menu } from "lucide-react";

function Header() {
  const [menu, setMenu] = useState([]);
  const [openNavBar, setOpenNavBar] = useState(false);

  useEffect(() => {
    fetch("/api/dataroute")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTp error! status: ${response.status}`)
      }
      return response.json();
    })
    .then(data => setMenu(data.menuHeader))
    .catch(error => console.error("Error fetching menu:", error));
  }, []);

  
  const handleNavBarBtn = (event) => {
    event.stopPropagation();
    setOpenNavBar((prev) => !prev);
  }
  

  return (
    <>
      <header className='main_header shadow-lg shadow-gray-500/10 w-full sticky top-0 z-20 bg-white'>
        <section className="header_section bg-white pe-5 ps-[40px] md:px-[60px] py-2 flex items-center justify-between">
          <div className="header_logo_container">
            <div className="header_logo_row">
              <Link href="/" passHref><Image src="/images/logo.png" alt='Main logo' height={22} width={22} /></Link>
            </div>
          </div>
          <div className="header_search_container">
            <div className="header_search_row">
              <form className='header_search_form text-gray-700 shadow flex items-center justify-between border border-gray-700 md:px-2 md:py-[2px] py-[3px] rounded-sm'>
                <input type="search" className='focus-visible:outline-none px-2' placeholder="Search..." />
                <Search size={18} className='relative right-[10px]'/>
              </form>
            </div>
          </div>
          <div className={`header_menu_container ${openNavBar && 'open_menu_container'}`} onClick={handleNavBarBtn}>
            <div className="header_menu_open_bar text-black absolute left-[15px] top-[10px]" onClick={handleNavBarBtn}>
              <Menu className='w-[22px] h-[22px]' />
            </div>
            <div className={`header_menu_row flex items-center md:gap-5 text-black md:text-base ${openNavBar ? 'open_nav rounded gap-3 shadow text-sm md:shadow-none' : 'close_nav'} `}>
              {
                menu.map((item, index) => (
                  <Link key={index} className='hover:underline hover:text-orange-500' href={item.link}>
                    {item.name}
                  </Link>
                ))
              }
            </div>
          </div>
          <div className="header_login_container">
            <div className="header_login_row flex items-center gap-5 text-black text-base">
              <Link href="/cart" passHref> Cart <ShoppingCart size={20} style={{display: 'inline'}}/></Link>
              <Link className='hover:underline hover:text-orange-500' href="/login" passHref> Login </Link>
            </div>
          </div>
        </section>
      </header>
    </>
  )
}

export default Header