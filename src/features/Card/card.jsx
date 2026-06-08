// function Card(){
//     return (
//         <h1>card</h1>
//     )
// }
import { useState } from "react";

const menuData = {
  "Newly Launched: Mutton Spread": {
    count: 12,
    sections: [
      {
        label: "MUTTON STARTERS",
        items: [
          { name: "Roasted Chilli Mutton [200 g]", desc: "Juicy mutton roasted with smoky chillies and aromatic spices, delivering a bold, fiery flavour that lingers on your palate." },
          { name: "Conzy Crispy Mutton [200 g]", desc: "Tender mutton pieces, crispy on the outside and juicy inside, slow cooked with a signature blend of spices." },
          { name: "Chilli Garlic Mutton [200 g]", desc: "Succulent mutton tossed in a bold chilli garlic sauce, packed with spicy, garlicky goodness in every bite." },
        ],
      },
      {
        label: "MUTTON MAIN COURSE",
        items: [
          { name: "Roasted Mutton Egg Fried Rice", desc: "Fragrant fried rice tossed with roasted mutton, fluffy eggs and savoury spices for a hearty main course." },
          { name: "Chilli Garlic Mutton Noodles", desc: "Wok-tossed noodles with tender mutton strips in a fiery chilli garlic sauce." },
          { name: "Mutton Thukpa", desc: "Traditional Tibetan noodle soup with slow-cooked mutton, vegetables and warming broth." },
        ],
      },
    ],
  },
  "Combos And Meals": { count: 29, sections: [{ label: "COMBO DEALS", items: [{ name: "Combo Meal A", desc: "Rice + starter + drink at a special price." }, { name: "Family Feast", desc: "Serves 4 with assorted starters and mains." }] }] },
  "Soups and Thukpa": { count: 17, sections: [{ label: "SOUPS", items: [{ name: "Hot & Sour Soup", desc: "Classic tangy and spicy broth with vegetables." }, { name: "Veg Manchow Soup", desc: "Crispy noodles atop a flavourful vegetable broth." }] }] },
  "Starter Bites": { count: 41, sections: [{ label: "STARTERS", items: [{ name: "Chilli Chicken [200 g]", desc: "Crispy chicken tossed in a spicy Indo-Chinese sauce." }, { name: "Honey Chilli Potato", desc: "Crispy potato fingers glazed with honey and chilli." }] }] },
  "Fried Rice": { count: 24, sections: [{ label: "FRIED RICE", items: [{ name: "Egg Fried Rice", desc: "Classic wok-tossed rice with eggs and spring onions." }, { name: "Chicken Fried Rice", desc: "Fragrant rice with tender chicken pieces." }] }] },
  "Noodles": { count: 51, sections: [{ label: "NOODLES", items: [{ name: "Chicken Hakka Noodles", desc: "Stir-fried noodles with chicken in Hakka style sauce." }, { name: "Veg Chow Mein", desc: "Classic vegetable noodles tossed with soy and spices." }] }] },
  "Side Dishes": { count: 63, sections: [{ label: "SIDES", items: [{ name: "Steamed Rice", desc: "Fluffy plain steamed rice." }, { name: "Garlic Bread", desc: "Toasted bread with garlic butter." }] }] },
  "Momos: Evening Special": { count: 3, sections: [{ label: "MOMOS", items: [{ name: "Steamed Chicken Momo", desc: "Soft dumplings filled with minced chicken and herbs." }, { name: "Pan-Fried Veg Momo", desc: "Crispy bottomed dumplings with vegetable filling." }] }] },
};

const tabs = ["Overview", "Order Online", "Reviews", "Photos", "Menu"];

const foodImages = [
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
  "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&q=80",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&q=80",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&q=80",
];

export default function Card() {
  const [activeTab, setActiveTab] = useState("Order Online");
  const [activeMenu, setActiveMenu] = useState("Newly Launched: Mutton Spread");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({});

  const currentSection = menuData[activeMenu];
  const filteredSections = currentSection?.sections.map((s) => ({
    ...s,
    items: s.items.filter(
      (item) =>
        search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.items.length > 0);

  const toggleExpand = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#fff", maxWidth: 900, margin: "0 auto", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        .cc-tab { cursor:pointer; padding:12px 16px; font-size:14px; font-weight:500; color:#666; border-bottom:2px solid transparent; transition:all .2s; white-space:nowrap; }
        .cc-tab:hover { color:#e8472a; }
        .cc-tab.active { color:#e8472a; border-bottom-color:#e8472a; }
        .cc-menu-item { cursor:pointer; padding:10px 14px; font-size:13.5px; color:#444; border-radius:6px; transition:background .15s; line-height:1.4; }
        .cc-menu-item:hover { background:#fff5f3; color:#e8472a; }
        .cc-menu-item.active { background:#fff0ed; color:#e8472a; font-weight:600; border-right:3px solid #e8472a; }
        .cc-dish-card { border-bottom:1px solid #f0ece8; padding:16px 0; display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
        .cc-dish-card:last-child { border-bottom:none; }
        .cc-add-btn { border:1px solid #e8472a; color:#e8472a; background:#fff; border-radius:6px; padding:6px 20px; font-size:13px; font-weight:600; cursor:pointer; transition:all .15s; }
        .cc-add-btn:hover { background:#e8472a; color:#fff; }
        .cc-badge { display:inline-flex; align-items:center; gap:4px; background:#3d9142; color:#fff; font-size:13px; font-weight:700; padding:3px 8px; border-radius:4px; }
        .cc-read-more { color:#e8472a; cursor:pointer; font-size:13px; }
        .cc-search { border:1px solid #ddd; border-radius:6px; padding:8px 14px; font-size:13px; width:220px; outline:none; font-family:inherit; }
        .cc-search:focus { border-color:#e8472a; }
        .cc-pill { display:inline-flex; align-items:center; gap:5px; border:1px solid #ddd; border-radius:20px; padding:4px 12px; font-size:12px; color:#555; cursor:pointer; transition:all .15s; }
        .cc-pill:hover { border-color:#e8472a; color:#e8472a; }
        .cc-img-grid { display:grid; grid-template-columns:1fr 140px; gap:4px; height:180px; border-radius:10px; overflow:hidden; }
        .cc-img-right { display:grid; grid-template-rows:1fr 1fr; gap:4px; }
        .cc-overlay { position:relative; cursor:pointer; }
        .cc-overlay-label { position:absolute; inset:0; background:rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; color:#fff; font-size:13px; font-weight:600; }
        .section-label { font-size:11px; font-weight:700; letter-spacing:.08em; color:#888; margin:20px 0 8px; padding-bottom:8px; border-bottom:1px solid #f0ece8; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.3px" }}>Crystal Chimney</h1>
            <p style={{ fontSize: 13, color: "#666", margin: "0 0 6px" }}>Chinese, Sichuan, Asian, Momos</p>
            <p style={{ fontSize: 13, color: "#666", margin: 0 }}>17, Chittaranjan Avenue, Chandni Chowk, Kolkata</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ textAlign: "center", background: "#f9f9f7", border: "1px solid #e5e0d8", borderRadius: 8, padding: "8px 14px" }}>
              <div><span className="cc-badge">4.4 ★</span></div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>1,223<br />Dining Ratings</div>
            </div>
            <div style={{ textAlign: "center", background: "#f9f9f7", border: "1px solid #e5e0d8", borderRadius: 8, padding: "8px 14px" }}>
              <div><span className="cc-badge" style={{ background: "#5b8c3e" }}>4.2 ★</span></div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>7,319<br />Delivery Ratings</div>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, fontSize: 13, color: "#555", flexWrap: "wrap" }}>
          <span style={{ color: "#c0392b", fontWeight: 500 }}>Closes in 53 minutes</span>
          <span>·</span>
          <span>12noon – 10pm (Today)</span>
          <span>|</span>
          <span>₹550 for two</span>
          <span>|</span>
          <span style={{ color: "#e8472a" }}>📞 +913322379584 +2 more</span>
        </div>

        {/* Action pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {["Direction", "Share", "Reviews"].map((a) => (
            <button key={a} className="cc-pill">
              {a === "Direction" ? "↗" : a === "Share" ? "⤴" : "★"} {a}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="cc-img-grid" style={{ marginTop: 14 }}>
          <img src={foodImages[0]} alt="food" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="cc-img-right">
            <img src={foodImages[1]} alt="food" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <img src={foodImages[2]} alt="food" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #eee", marginTop: 6, paddingLeft: 8, overflowX: "auto" }}>
        {tabs.map((t) => (
          <div key={t} className={`cc-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</div>
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
                  <span>⏱ 30 min</span>
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
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 80 }}>
                        <div style={{ width: 72, height: 60, borderRadius: 8, overflow: "hidden", background: "#f5f0eb" }}>
                          <img
                            src={`https://images.unsplash.com/photo-${1567620905732 + i * 11111}?w=80&q=60`}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        </div>
                        <button className="cc-add-btn">ADD</button>
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

