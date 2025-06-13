import { Link, useLocation } from "react-router-dom";
import Container from "../ui/Container";

const links = [
  { to: "/items", label: "Items" },
  { to: "/outfits", label: "Outfits" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <Container>
      <nav className="mt-6 px-8 py-4 rounded-2xl bg-[#e8f1fa] flex justify-between items-center">
        <div className="font-bold text-gray-800">Schrank</div>
        <div className="flex gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-gray-800 font-medium hover:text-blue-600 transition ${
                location.pathname === link.to ? "underline" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </Container>
  );
}
