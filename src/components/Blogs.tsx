import React, { useState, useEffect } from "react";
import "../styles.css";


interface Blog {
  title: string;
  content: string;
  fullDescription: string;
  gallery: string[];
}

interface AutoScrollingGalleryProps {
  images: string[];
}

const blogs: Blog[] = [
  {
    title: "Celebrating New Beginnings",
    content: "Inauguration of our new VTU office.",
    fullDescription:
      "✨ **We are thrilled to announce the inauguration of our new office at VTU, Belagavi!** 🎉 This marks the beginning of an exciting journey filled with endless opportunities 🚀, innovation 💡, and growth 🌿. The ceremony began with a traditional pooja 🙏, symbolizing prosperity, positivity, and success 🏆. Here’s to a future filled with success, growth, and endless possibilities 🌈✨.",
    gallery: ["/images/pooja1.jpg", "/images/pooja.jpg"],
  },
  {
    title: "A memorable day at Kamal Basti",
    content: "Exploring heritage, building bonds.",
    fullDescription:
      "✨ An unforgettable team gathering at Kamal Basti, Belagavi! 🎉 Blending tradition 🏛️ with innovation 💡, our team came together to reflect on unity 🤝, culture 🌿, and collaboration 💪. Together, we embrace challenges, build memories 🌈, and strengthen our bond for future successes 🌟. Here's to growth, learning, and achieving new milestones as a team! 🌟💼",
    gallery: ["/images/kamal2.jpg", "/images/kamal3.jpg", "/images/kamal4.jpg"],
  },
  {
    title: "Hiring Talents from Hack-2-Intern",
    content: "Discovering talent, shaping futures.",
    fullDescription:
      "✨ An inspiring hiring drive at Hack-2-Intern by RGESIndia! 💼 The atmosphere buzzed with innovation 💡 as talented students showcased their coding skills 💻 and problem-solving abilities 🔍. Our team connected 🤝 with future tech leaders, discussing ideas 💬, sharing knowledge 📚, and exploring opportunities 🚀. Here's to new beginnings, collaborations, and endless possibilities! 🌟💼",
    gallery: ["/images/hiring2.png"],
  },
];

const AutoScrollingGallery: React.FC<AutoScrollingGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="auto-scroll-gallery fade-in">
      <img
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="gallery-img zoom-in"
      />
    </div>
  );
};

const Blogs: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <div className={`blogs-timeline ${selectedBlog ? "expanded" : ""}`}>
      {!selectedBlog ? (
        <>
          <h1 className="slide-down">Watch Out Our Latest Blogs</h1>
          {blogs.map((blog, index) => (
            <div
              className={`timeline-card ${
                index % 2 === 0 ? "left fade-in-left" : "right fade-in-right"
              }`}
              key={index}
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="blog-img">
                <img src={blog.gallery[0]} alt={blog.title} />
              </div>
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <button className="blog-btn">Read Full Blog</button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="timeline-card expanded slide-up">
          <AutoScrollingGallery images={selectedBlog.gallery} />
          <div className="blog-content">
            <h3>{selectedBlog.title}</h3>
            <p>{selectedBlog.fullDescription}</p>
            <button className="button" onClick={() => setSelectedBlog(null)}>
              🔙 Back to Blogs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
