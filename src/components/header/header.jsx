import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from "next/image";
import { ShoppingCart, Search } from "lucide-react";

function Header() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("./data/headermenu.json")
    .then(response => response.json())
    .then(data => setMenu(data.menu))
    .catch(error => console.error("Error fetching menu:", error));
  }, []);

  return (
    <>
        <header className='main_header shadow-lg shadow-gray-500/50 mb-3'>
          <section className="header_section bg-white px-[80px] py-2 flex items-center justify-between">
            <div className="header_logo_container">
              <div className="header_logo_row">
                <Link href="/" passHref><Image src="/images/logo.png" alt='Main logo' height={30} width={30} /></Link>
              </div>
            </div>
            <div className="header_search_container">
              <div className="header_search_row">
                <form className='header_search_form text-gray-700 shadow flex items-center justify-between border border-gray-700 px-2 py-[2px] rounded-sm'>
                  <input type="search" className='focus-visible:outline-none' placeholder="Search..." />
                  <Search size={18}/>
                </form>
              </div>
            </div>
            <div className="header_menu_container">
              <div className="header_menu_row flex items-center gap-5 text-black text-base">
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