import PropTypes from "prop-types";

const Navbar = ({ color }) => {
  return (
    <nav className="absolute top-10 right-20 flex items-center justify-between gap-10 z-20">
      <a
        href="/"
        className={`font-semibold cursor-pointer hover:font-extrabold ${
          color === "white" ? "text-white" : "text-black"
        }`}
      >
        Home
      </a>
      <a
        href="/news"
        className={`font-semibold cursor-pointer hover:font-extrabold ${
          color === "white" ? "text-white" : "text-black"
        }`}
      >
        Berita
      </a>
      <a
        href="/chart"
        className={`font-semibold cursor-pointer hover:font-extrabold ${
          color === "white" ? "text-white" : "text-black"
        }`}
      >
        Grafik
      </a>
      <a
        href="/about"
        className={`font-semibold cursor-pointer hover:font-extrabold ${
          color === "white" ? "text-white" : "text-black"
        }`}
      >
        About
      </a>
      <a
        href="/gallery"
        className={`font-semibold cursor-pointer hover:font-extrabold ${
          color === "white" ? "text-white" : "text-black"
        }`}
      >
        Gallery
      </a>
      <a
        href="/address"
        className={`font-semibold cursor-pointer hover:font-extrabold ${
          color === "white" ? "text-white" : "text-black"
        }`}
      >
        Adress
      </a>
    </nav>
  );
};

Navbar.propTypes = {
  color: PropTypes.string,
};

export default Navbar;
