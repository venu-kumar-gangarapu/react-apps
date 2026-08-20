import { useContext, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import "./card.css";
import { CartProvider } from "../../shared/contexts/cartContext";
import { getResturantMenu } from "../../shared/services/resturantServices";
import { DialogBoxContext } from "../../shared/contexts/dialogContext";

// Fallback gallery images used until real photo data is wired into the
// route state. Swap these out once restaurant photo URLs exist.
const galleryImages = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
  "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=250&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=250&q=80",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=250&q=80",
];


export default function OrangeLoungeCard() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({});
  const { cart,dispatch } = useContext(CartProvider);

  // menuData holds only the category map (the `.menu` object) —
  // never the {restaurantId, restaurantName, menu} wrapper.
  const [menuData, setMenuData] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const {dialogState,dispatchDialog} = useContext(DialogBoxContext)

  const location = useLocation();
  async function getMenuList(restaurantId) {
    const menuItem = await getResturantMenu({ id: restaurantId });
    console.log(menuItem);
    setMenuData(menuItem || {});
  }
  useEffect(() => {
    const receivedData = location.state;
    if (receivedData) {
      const { _id, menu, ...rest } = receivedData;
      setRestaurant({
        _id,
        name: rest.name || "Restaurant",
        cuisines: rest.cuisines || [],
        address: rest.location || rest.address || "",
        priceForTwo: rest.priceForTwo ?? null,
        distance: rest.distance || "",
        openingTime: rest.openingTime || "",
        offer: rest.offer ?? null,
        rating: rest.rating ?? null,
        phone: rest.phone || "",
      });

      getMenuList(_id);
      console.log(menuData);
      // setMenuData(menu || {});

      const firstCategory = menu ? Object.keys(menu)[0] : null;
      setActiveMenu(firstCategory || null);

      console.log("Data received successfully:", receivedData);
    } else {
      console.log("No state data passed or page was reloaded directly");
    }
    console.log(dialogState,cart);
  }, [dialogState]);

  const addToCart=(item)=>{
    if(cart.currentRestarunt === restaurant.name || cart.currentRestarunt === '' ){
      dispatch({ type: "Add to Cart", payload: { item, restaurant: restaurant.name } });
      dispatch({ type: 'total cart value' });
    }else{
      console.log('not same resturant');
      dispatchDialog({
        type: "OPEN_DIALOG",
        payload: {
          title: "not same resturant",
          message: "not same resturant",
          onConfirm: "OK",
          cartItem: { item, restaurant: restaurant.name }
        },
      });
    }

  }

  // Guard: nothing to render yet (route state hasn't arrived, or the
  // page was reloaded directly without navigation state).
  if (!menuData || !restaurant) {
    return (
      <div className="cc-empty-state">
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
    <div className="cc-page">
      {/* Header */}
      <div className="cc-header">
        <div className="cc-header-top">
          <div>
            <h1 className="cc-title">
              {restaurant.name}
            </h1>
            <p className="cc-cuisines">
              {restaurant.cuisines.join(", ")}
            </p>
            <p className="cc-address">{restaurant.address}</p>
          </div>
          <div className="cc-badge-wrap">
            {restaurant.rating ? (
              <div className="cc-rating-box">
                <span className="cc-badge">{restaurant.rating} ★</span>
                <div className="cc-rating-sublabel">Dining Rating</div>
              </div>
            ) : restaurant.offer ? (
              <div className="cc-offer-box">
                <span className="cc-badge cc-badge-offer">{restaurant.offer}</span>
                <div className="cc-rating-sublabel">Just opened</div>
              </div>
            ) : (
              <div className="cc-rating-box">
                <span className="cc-badge">No ratings yet</span>
              </div>
            )}
          </div>
        </div>

        {/* Info bar */}
        <div className="cc-info-bar cc-info-bar--spaced">
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
              <span className="cc-phone">📞 {restaurant.phone}</span>
            </>
          )}
        </div>

        {/* Action pills */}
        <div className="cc-pills-row">
          {["Direction", "Share", "Reviews", "Book a table"].map((a) => (
            <button key={a} className="cc-pill">
              {a === "Direction" ? "↗" : a === "Share" ? "⤴" : a === "Reviews" ? "★" : "📅"} {a}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="cc-img-grid cc-img-grid--spaced">
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
      {/* <div style={{ display: "flex", borderBottom: "1px solid #eee", marginTop: 6, paddingLeft: 8, overflowX: "auto" }}>
        {tabs.map((t) => (
          <div key={t} className={`cc-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {t}
          </div>
        ))}
      </div> */}

      {/* Body */}
      <div>
        {/* Left sidebar */}
        {/* <div style={{ borderRight: "1px solid #f0ece8", padding: "14px 0" }}>
            {Object.entries(menuData).map(([name, data]) => (
              <div
                key={name}
                className={`cc-menu-item ${activeMenu === name ? "active" : ""}`}
                onClick={() => { setActiveMenu(name); setSearch(""); }}
              >
                {name} ({data.count})
              </div>
            ))}
          </div> */}

        {/* Right content */}
        <div className="cc-content">
          <div className="cc-section-header">
            <div>
              <h2 className="cc-menu-title">{activeMenu}</h2>
              <div className="cc-live-track">
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

          {/* {menuData?.items.map((section) => (
              <div key={section.label}> */}
          {/* <div className="section-label">{section.label}</div> */}
          {menuData?.items.map((item, i) => {
            const key = `${item}-${i}`;
            const isExpanded = expanded[key];
            return (
              <div key={key} className="cc-dish-card">
                <div className="cc-dish-info">
                  <div className="cc-dish-name-row">
                    <span className="cc-veg-icon">
                      <span className="cc-veg-icon-dot" />
                    </span>
                    <span className="cc-dish-name">{item.name}</span>
                  </div>
                  <p className="cc-dish-desc">
                    {isExpanded ? item.desc : item.desc.slice(0, 70) + "..."}
                    <span className="cc-read-more" onClick={() => toggleExpand(key)}>
                      {" "}{isExpanded ? "show less" : "read more"}
                    </span>
                  </p>
                  <p className="cc-dish-price">₹ {item.price}</p>
                </div>
                <div className="cc-dish-actions">
                  <div className="cc-dish-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cc-dish-img"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <div className="cc-veg-dot" />
                  </div>
                  <button className="cc-add-btn" onClick={() => addToCart(item)}>ADD</button>
                </div>
              </div>
            );
          })}
          {/* </div> */}
          {/* ))} */}

          {filteredSections?.length === 0 && (
            <div className="cc-no-results">No items match your search.</div>
          )}
        </div>
      </div>

      {/* {activeTab !== "Order Online" && (
        <div style={{ padding: 40, textAlign: "center", color: "#aaa", fontSize: 14 }}>
          {activeTab} content would appear here.
        </div>
      )} */}
    </div>
  );
}