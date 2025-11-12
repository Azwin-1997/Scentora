import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function HeaderCarousel() {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1500&q=80",
      caption: "Unveil Your Signature Scent ✨",
      subtext: "Elegance begins with a fragrance that defines you.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1618354691417-45f0bce6db99?auto=format&fit=crop&w=1500&q=80",
      caption: "Embrace the Art of Fragrance 💎",
      subtext: "Where passion meets perfection in every drop.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1500&q=80",
      caption: "Elevate Every Moment 🌸",
      subtext: "Perfumes that define grace, charm, and sophistication.",
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
    <div className="relative w-full h-[450px] md:h-[550px] overflow-hidden rounded-2xl mb-10 shadow-lg">
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
                  alt={slide.caption}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-3xl md:text-5xl font-semibold tracking-wide mb-3"
                  >
                    {slide.caption}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-gray-200 text-sm md:text-lg max-w-2xl"
                  >
                    {slide.subtext}
                  </motion.p>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeaderCarousel;
