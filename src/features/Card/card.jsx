import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./card.css";
import { CartProvider } from "../../shared/contexts/cartContext";

// Fallback gallery images used until real photo data is wired into the
// route state. Swap these out once restaurant photo URLs exist.
const galleryImages = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=250&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=250&q=80",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=250&q=80",
];

const tabs = ["Overview", "Order Online", "Reviews", "Photos", "Menu", "Book a Table"];

export default function OrangeLoungeCard() {
  const [activeTab, setActiveTab] = useState("Order Online");
  const [activeMenu, setActiveMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({});
  const {dispatch} = useContext(CartProvider);

  // menuData holds only the category map (the `.menu` object) —
  // never the {restaurantId, restaurantName, menu} wrapper.
  const [menuData, setMenuData] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const receivedData = location.state;
    if (receivedData) {
      const { restaurantId, restaurantName, menu, ...rest } = receivedData;

      setMenuData(menu || {});
      setRestaurant({
        restaurantId,
        name: restaurantName || "Restaurant",
        cuisines: rest.cuisines || [],
        address: rest.location || rest.address || "",
        priceForTwo: rest.priceForTwo ?? null,
        distance: rest.distance || "",
        openingTime: rest.openingTime || "",
        offer: rest.offer ?? null,
        rating: rest.rating ?? null,
        phone: rest.phone || "",
      });

      const firstCategory = menu ? Object.keys(menu)[0] : null;
      setActiveMenu(firstCategory || null);

      console.log("Data received successfully:", receivedData);
    } else {
      console.log("No state data passed or page was reloaded directly");
    }
  }, [location]);

  // Guard: nothing to render yet (route state hasn't arrived, or the
  // page was reloaded directly without navigation state).
  if (!menuData || !restaurant) {
    return (
      <div
        style={{
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          textAlign: "center",
          color: "#aaa",
          padding: 60,
        }}
      >
        No menu data found. Please navigate here from the restaurant list.
      </div>
    );
  }

  const currentSection = activeMenu ? menuData[activeMenu] : null;
  const filteredSections = currentSection?.sections
    .map((s) => ({
      ...s,
      items: s.items.filter(
        (item) =>
          search === "" ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((s) => s.items.length > 0);

  const toggleExpand = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fff", maxWidth: 900, margin: "0 auto", color: "#1a1a1a" }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.3px" }}>
              {restaurant.name}
            </h1>
            <p style={{ fontSize: 13, color: "#2a7de1", margin: "0 0 6px" }}>
              {restaurant.cuisines.join(", ")}
            </p>
            <p style={{ fontSize: 13, color: "#666", margin: 0 }}>{restaurant.address}</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {restaurant.rating ? (
              <div style={{ textAlign: "center", background: "#f9f9f7", border: "1px solid #e5e0d8", borderRadius: 8, padding: "8px 14px" }}>
                <span className="cc-badge">{restaurant.rating} ★</span>
                <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Dining Rating</div>
              </div>
            ) : restaurant.offer ? (
              <div style={{ textAlign: "center", background: "#fff0ed", border: "1px solid #f5c9bd", borderRadius: 8, padding: "8px 14px" }}>
                <span className="cc-badge" style={{ background: "#e8472a" }}>{restaurant.offer}</span>
                <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Just opened</div>
              </div>
            ) : (
              <div style={{ textAlign: "center", background: "#f9f9f7", border: "1px solid #e5e0d8", borderRadius: 8, padding: "8px 14px" }}>
                <span className="cc-badge">No ratings yet</span>
              </div>
            )}
          </div>
        </div>

        {/* Info bar */}
        <div className="cc-info-bar" style={{ marginTop: 10 }}>
          {restaurant.openingTime && <span className="cc-closing">Opens {restaurant.openingTime}</span>}
          {restaurant.priceForTwo != null && (
            <>
              <span>|</span>
              <span>₹{Number(restaurant.priceForTwo).toLocaleString("en-IN")} for two</span>
            </>
          )}
          {restaurant.distance && (
            <>
              <span>|</span>
              <span>{restaurant.distance} away</span>
            </>
          )}
          {restaurant.phone && (
            <>
              <span>|</span>
              <span style={{ color: "#e8472a" }}>📞 {restaurant.phone}</span>
            </>
          )}
        </div>

        {/* Action pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {["Direction", "Share", "Reviews", "Book a table"].map((a) => (
            <button key={a} className="cc-pill">
              {a === "Direction" ? "↗" : a === "Share" ? "⤴" : a === "Reviews" ? "★" : "📅"} {a}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="cc-img-grid" style={{ marginTop: 14 }}>
          <img src={galleryImages[0]} alt={restaurant.name} />
          <div className="cc-img-right">
            <img src={galleryImages[1]} alt="interior" />
            <img src={galleryImages[2]} alt="dish" />
          </div>
          <div className="cc-overlay">
            <img src={galleryImages[3]} alt="gallery" />
            <div className="cc-overlay-label">View Gallery</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #eee", marginTop: 6, paddingLeft: 8, overflowX: "auto" }}>
        {tabs.map((t) => (
          <div key={t} className={`cc-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {t}
          </div>
        ))}
      </div>

      {/* Body */}
      {activeTab === "Order Online" && (
        <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", gap: 0, minHeight: 500 }}>
          {/* Left sidebar */}
          <div style={{ borderRight: "1px solid #f0ece8", padding: "14px 0" }}>
            {Object.entries(menuData).map(([name, data]) => (
              <div
                key={name}
                className={`cc-menu-item ${activeMenu === name ? "active" : ""}`}
                onClick={() => { setActiveMenu(name); setSearch(""); }}
              >
                {name} ({data.count})
              </div>
            ))}
          </div>

          {/* Right content */}
          <div style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 2px" }}>{activeMenu}</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#888" }}>
                  <span>🔴 Live track your order</span>
                  <span>|</span>
                  <span>⏱ 35 min</span>
                </div>
              </div>
              <input
                className="cc-search"
                placeholder="🔍 Search within menu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filteredSections?.map((section) => (
              <div key={section.label}>
                <div className="section-label">{section.label}</div>
                {section.items.map((item, i) => {
                  const key = `${section.label}-${i}`;
                  const isExpanded = expanded[key];
                  return (
                    <div key={key} className="cc-dish-card">
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ display: "inline-block", width: 14, height: 14, border: "1.5px solid #3d9142", borderRadius: 2, position: "relative" }}>
                            <span style={{ position: "absolute", top: 2, left: 2, width: 6, height: 6, borderRadius: "50%", background: "#3d9142" }} />
                          </span>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</span>
                        </div>
                        <p style={{ fontSize: 12.5, color: "#777", margin: 0, lineHeight: 1.5 }}>
                          {isExpanded ? item.desc : item.desc.slice(0, 70) + "..."}
                          <span className="cc-read-more" onClick={() => toggleExpand(key)}>
                            {" "}{isExpanded ? "show less" : "read more"}
                          </span>
                        </p>
                        <p>₹ {item.price}</p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 80, position: "relative" }}>
                        <div style={{ width: 72, height: 60, borderRadius: 8, overflow: "hidden", background: "#f5f0eb", position: "relative" }}>
                          <img
                            src={item.img || `https://images.unsplash.com/photo-${1567620905732 + i * 11111}?w=160&q=70`}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                          <div className="cc-veg-dot" />
                        </div>
                        <button className="cc-add-btn" onClick={()=>{dispatch({type:"Add to Cart",payload:item}); dispatch({type:'total cart value'});}}>ADD</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {filteredSections?.length === 0 && (
              <div style={{ textAlign: "center", color: "#aaa", marginTop: 40, fontSize: 14 }}>No items match your search.</div>
            )}
          </div>
        </div>
      )}

      {activeTab !== "Order Online" && (
        <div style={{ padding: 40, textAlign: "center", color: "#aaa", fontSize: 14 }}>
          {activeTab} content would appear here.
        </div>
      )}
    </div>
  );
}