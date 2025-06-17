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
      <nav className="mt-6 px-8 py-4 rounded-2xl bg-[#f8f1ff] border-2 border-[#decdf5] flex justify-between items-center">
        <div className="font-bold text-xl text-[#656176]">Schrank</div>
        <div className="flex gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition ${
                location.pathname === link.to
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-[#656176] hover:text-blue-500"
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
