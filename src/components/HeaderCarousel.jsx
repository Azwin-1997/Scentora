import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";

function HeaderCarousel() {
  const navigate = useNavigate();
  const slides = [
    {
      id: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1676748933022-e1183e997436?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D",
      heading: "Discover Your Signature Scent",
      subtext: "Luxury fragrances crafted to leave a lasting impression.",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/68/96/46/689646e979f73a37ac26e150ab834678.jpg",
      heading: "Elegance in Every Drop",
      subtext: "Where passion meets perfection in every crafted fragrance.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1500&q=80",
      heading: "Fragrances That Define You",
      subtext: "Grace, charm, and sophistication—reimagined.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden shadow-xl">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentIndex && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover scale-105"
                />

                {/* Luxury Vignette + Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />

                {/* Text + CTA Buttons */}
                <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16 text-left max-w-xl">
                  <motion.h2
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3 drop-shadow-lg"
                  >
                    {slide.heading}
                  </motion.h2>

                  <motion.p
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-gray-200 text-sm md:text-lg mb-6"
                  >
                    {slide.subtext}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4"
                  >
                    <button
                      onClick={() => navigate("/products")}
                      className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-200 transition"
                    >
                      Shop Now
                    </button>

                    <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white/20 transition">
                      Explore
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition-all ${
              i === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeaderCarousel;
