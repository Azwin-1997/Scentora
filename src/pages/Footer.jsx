function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Scentora</h2>
          <p className="text-sm">
            Discover premium fragrances made for every occasion.  
            Shop your signature scent today.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Products</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Return Policy</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="ri-instagram-line"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="ri-twitter-x-line"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} Scentora. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
