import React, { useState } from 'react';

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const handleToggleNav = () => setNavOpen(!navOpen);

  return (
    <nav className='bg-gray-800 shadow-lg px-6 py-4 sticky top-0 z-50 rounded-b-xl'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        
        {/* 1. Logo and Brand Name (Left) */}
        <div className='flex items-center space-x-3'>
          {/* Logo Placeholder */}
          <div className='w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-yellow-400 font-bold text-xl'>
            🧴 
          </div>
          <span className='text-xl font-extrabold text-white'>
            Scentora
          </span>
        </div>

        {/* 2. Primary Actions (Right - Visible on all screens) */}
        <div className='flex items-center space-x-4'>
          
          {/* Login Button (Gold/Yellow Accent) */}
          <button className='hidden md:block bg-yellow-400 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500 transition duration-150'>
            Login
          </button>

          {/* Wishlist Link (Text) */}
          <a 
            href="#" 
            // Changed hover color to match logo
            className='text-white hover:text-yellow-400 text-sm font-medium p-2 rounded-md transition duration-150 hidden sm:block'
          >
            Wishlist
          </a>

          {/* Cart Link with Counter (Text) */}
          <a 
            href="#" 
            // Changed hover color to match logo
            className='text-white hover:text-yellow-400 text-sm font-medium p-2 rounded-md relative transition duration-150 flex items-center'
          >
            Cart
            {/* Cart Counter - Kept Red for critical alerts (e.g., items in cart) */}
            <span className='ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
              0
            </span>
          </a>

          {/* 3. Mobile Menu Button (Visible only on small screens) */}
          <button 
            onClick={handleToggleNav} 
            className='md:hidden text-white hover:text-gray-400 p-2 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md'
          >
            {navOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* 4. Mobile Menu Links (Login Button and Wishlist for mobile) */}
      <div className={`md:hidden ${navOpen ? 'block' : 'hidden'} mt-2 border-t border-gray-700 pt-2`}>
        <div className='px-2 pt-2 pb-3 space-y-1'>
           
           {/* Mobile Wishlist Link */}
           <a 
            href="#" 
            className='w-full block text-left text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium'
            onClick={handleToggleNav}
          >
            Wishlist
          </a>
          
          {/* Mobile Login Button (Gold/Yellow Accent) */}
           <button className='w-full bg-yellow-400 text-gray-900 px-4 py-2 rounded-md text-base font-medium hover:bg-yellow-500 transition duration-150'>
              Login
           </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;