const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-bold text-pink-500 mb-4">
              UrbanEdge Constructions
            </h3>
            <p className="text-sm leading-relaxed">
              Our post-construction services gives you peace of mind knowing
              that we are still here for you even after.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "Specialty Construction",
                "Civil Construction",
                "Residential Construction",
                "Corporate Construction",
                "Building Construction",
                "Industrial Construction",
              ].map((service) => (
                <li
                  key={service}
                  className="hover:text-pink-500 transition cursor-pointer"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "Services", "Projects", "Blog", "Contact Us"].map(
                (link) => (
                  <li
                    key={link}
                    className="hover:text-pink-500 transition cursor-pointer"
                  >
                    {link}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>(888)-000-0000</li>
              <li>info@example.com</li>
              <li>8-JK, Rajaji Puram</li>
              <li>Lucknow, Uttar Pradesh, 226017</li>
              <li>0522-4000000</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
          © {new Date().getFullYear()} UrbanEdge Constructions. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
