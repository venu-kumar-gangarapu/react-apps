import { useState } from "react";
import "./footer.css";
// import { Link } from "react-router-dom";

// const popularRestaurants = [
//   "Sharma Snacks",
//   "Gupta Brothers",
//   "Royal Biriyani",
//   "Chai Break",
//   "Veg Dhaba",
//   "Oh Calcutta",
//   "Denzong Kitchen",
//   "Arsalan",
//   "Peter Cat",
//   "Zen - The Park",
//   "Barbeque Nation",
//   "Wow! Momo",
// ];

const footerColumns = [
  {
    title: "Company",
    links: ["About Us", "Corporate", "Careers", "Team", "One", "Instamart"],
  },
  {
    title: "Contact us",
    links: ["Help & Support", "Partner With Us", "Ride With Us"],
  },
  {
    title: "Legal",
    links: ["Terms & Conditions", "Cookie Policy", "Privacy Policy"],
  },
];

const cities = ["Bangalore", "Gurgaon", "Hyderabad", "Delhi", "Mumbai", "Pune"];

const lifeLinks = ["Explore With Us", "News", "Snackables"];

const socialIcons = [
  { name: "LinkedIn", path: "" },
  { name: "Instagram", path: "" },
  { name: "Facebook", path: "" },
  { name: "Pinterest", path: "" },
  { name: "Twitter", path: "" },
];

function FooterColumn({ title, links }) {
  return (
    <div className="ftr-col">
      <div className="ftr-col-title">{title}</div>
      {links.map((link) => (
        // <a href="#" className="ftr-link" key={link}>
        //   {link}
        // </a>
        link
      ))}
    </div>
  );
}

export default function Footer() {
  // const [showAllRestaurants, setShowAllRestaurants] = useState(false);
  const [city, setCity] = useState("685 cities");

  // const visibleRestaurants = showAllRestaurants
  //   ? popularRestaurants
  //   : popularRestaurants.slice(0, 7);

  return (
    <footer className="ftr-root">
      {/* <div className="ftr-popular">
        <div className="ftr-popular-links">
          {visibleRestaurants.map((name) => (
            <a href="#" className="ftr-popular-link" key={name}>
              {name}
            </a>
          ))}
        </div>
        <button
          className="ftr-see-more"
          onClick={() => setShowAllRestaurants((v) => !v)}
        >
          {showAllRestaurants ? "See less" : "See more"}
          <span className={`ftr-chevron ${showAllRestaurants ? "open" : ""}`}>⌄</span>
        </button>
      </div> */}

      <div className="ftr-main">
        <div className="ftr-brand-block">
          <div className="ftr-brand">
            <span className="ftr-brand-name">OrderNow</span>
          </div>
          <div className="ftr-copyright">© 2026 OrderNow</div>
        </div>

        <FooterColumn title="Company" links={footerColumns[0].links} />

        <div className="ftr-col">
          <FooterColumn title="Contact us" links={footerColumns[1].links} />
          <div style={{ marginTop: 20 }}>
            <FooterColumn title="Legal" links={footerColumns[2].links} />
          </div>
        </div>

        <div className="ftr-col">
          <div className="ftr-col-title">We deliver to:</div>
          {cities.map((c) => (
            // <a href="#" className="ftr-link" key={c}>
              c
            // </a>
          ))}
          <select
            className="ftr-city-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option>685 cities</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="ftr-col">
          <div className="ftr-col-title">Life at Swiggy</div>
          {lifeLinks.map((link) => (
            // <a href="#" className="ftr-link" key={link}>
              link
            // </a>
          ))}

          <div className="ftr-col-title" style={{ marginTop: 20 }}>
            Social Links
          </div>
          <div className="ftr-social-row">
            {socialIcons.map((icon) => (
              // <a href="#" className="ftr-social-icon" key={icon.name} aria-label={icon.name}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={icon.path} />
                </svg>
              // </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}