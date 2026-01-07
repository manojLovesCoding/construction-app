import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <Navbar expand="lg" className="flex items-center">
          <Navbar.Brand
            href="#home"
            className="text-2xl font-bold text-gray-900 logo"
          >
            <span className="text-pink-600">UrbanEdge</span>{" "}
            <span className="font-light">Construction</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto flex gap-6">
              {navItems.map(({ name, path }) => (
                <Nav.Link
                  as={Link}
                  key={name}
                  to={path}
                  className="text-gray-700 font-medium hover:text-pink-600 transition"
                >
                  {name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;

