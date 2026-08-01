import React from "react";

const restaurantData = {
  restaurant: {
    name: "Over The Top Explorer",
    categories: [
      "South Indian",
      "North Indian",
      "Chinese",
      "Pizza",
      "Sandwich",
      "Fast Food",
      "Desserts",
      "Beverages",
    ],
    address:
      "33/1A, Ward 30, Upendra Chandra Banerjee Road, Kankurgachi, Kolkata",
    timing: "12noon – 10pm",
    status: "Closes in 1 hour 11 minutes",
    costForTwo: "₹1,000",
    phone: "+918981446330",

    ratings: {
      dining: {
        rating: 4.5,
        count: 156,
      },
      delivery: {
        rating: 4.1,
        count: 38,
      },
    },
  },

  tabs: [
    "Overview",
    "Order Online",
    "Reviews",
    "Photos",
    "Menu",
    "Book a Table",
  ],

  gallery: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  ],

  menuCategories: [
    { name: "Combos", count: 23 },
    { name: "Indian Starters", count: 9 },
    { name: "North Indian Mains", count: 17 },
    { name: "South Indian", count: 25 },
    { name: "Breakfast Classics", count: 6 },
    { name: "Toasts & Sandwiches", count: 9 },
    { name: "Gourmet Sandwiches & Burgers", count: 6 },
    { name: "Appetizers", count: 14 },
  ],

  menuItems: [
    {
      name: "Jodhpuri Aloo Combo",
      description:
        "Jodhpuri Aloo served with your choice of Dal [Half], choice of Roti and more.",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    },

    {
      name: "Pindi Chole Combo",
      description:
        "Pindi Chole served with your choice of Dal [Half], choice of Roti and more.",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    },

    {
      name: "Adraki Aloo Gobi Combo",
      description:
        "Aloo Gobi Adraki served with your choice of Dal [Half], choice of Roti and more.",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    },
  ],
};

export default function RestaurantPage() {
  const { restaurant } = restaurantData;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.topSection}>
          <div>
            <h1 style={styles.title}>{restaurant.name}</h1>

            <p style={styles.categories}>
              {restaurant.categories.join(", ")}
            </p>

            <p style={styles.address}>{restaurant.address}</p>

            <div style={styles.metaRow}>
              <span style={styles.status}>{restaurant.status}</span>
              <span>{restaurant.timing}</span>
              <span>{restaurant.costForTwo} for two</span>
              <span>{restaurant.phone}</span>
            </div>

            <div style={styles.buttonRow}>
              {["Direction", "Share", "Reviews", "Book a table"].map(
                (btn) => (
                  <button key={btn} style={styles.button}>
                    {btn}
                  </button>
                )
              )}
            </div>
          </div>

          <div style={styles.ratingsWrapper}>
            <div style={styles.ratingCard}>
              <div style={styles.ratingBox}>
                {restaurant.ratings.dining.rating}★
              </div>

              <div>
                <div>{restaurant.ratings.dining.count}</div>
                <small>Dining Ratings</small>
              </div>
            </div>

            <div style={styles.ratingCard}>
              <div style={styles.ratingBox}>
                {restaurant.ratings.delivery.rating}★
              </div>

              <div>
                <div>{restaurant.ratings.delivery.count}</div>
                <small>Delivery Ratings</small>
              </div>
            </div>
          </div>
        </div>

        {/* GALLERY */}
        <div style={styles.gallery}>
          <img
            src={restaurantData.gallery[0]}
            alt=""
            style={styles.mainImage}
          />

          <div style={styles.galleryColumn}>
            <img
              src={restaurantData.gallery[1]}
              alt=""
              style={styles.smallImage}
            />

            <img
              src={restaurantData.gallery[2]}
              alt=""
              style={styles.smallImage}
            />
          </div>

          <div style={styles.galleryColumn}>
            <div style={styles.overlayWrapper}>
              <img
                src={restaurantData.gallery[3]}
                alt=""
                style={styles.smallImage}
              />

              <div style={styles.overlay}>View Gallery</div>
            </div>

            <img
              src={restaurantData.gallery[1]}
              alt=""
              style={styles.smallImage}
            />
          </div>
        </div>

        {/* TABS */}
        <div style={styles.tabs}>
          {restaurantData.tabs.map((tab, index) => (
            <div
              key={tab}
              style={{
                ...styles.tab,
                ...(index === 1 ? styles.activeTab : {}),
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          {/* SIDEBAR */}
          <div style={styles.sidebar}>
            {restaurantData.menuCategories.map((item, index) => (
              <div
                key={item.name}
                style={{
                  ...styles.categoryItem,
                  ...(index === 0 ? styles.activeCategory : {}),
                }}
              >
                {item.name} ({item.count})
              </div>
            ))}
          </div>

          {/* MENU */}
          <div style={styles.menuSection}>
            <div style={styles.menuTop}>
              <div>
                <h2 style={styles.orderTitle}>Order Online</h2>

                <small style={{ color: "#777" }}>
                  Live track your order • 43 min
                </small>
              </div>

              <input
                type="text"
                placeholder="Search within menu"
                style={styles.searchInput}
              />
            </div>

            <div style={styles.sectionTitle}>
              NORTH INDIAN COMBOS
            </div>

            <div style={styles.menuList}>
              {restaurantData.menuItems.map((item) => (
                <div key={item.name} style={styles.menuItem}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.menuImage}
                  />

                  <div>
                    <h3 style={styles.menuItemTitle}>{item.name}</h3>

                    <p style={styles.menuDescription}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f5f5f5",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
    padding: "20px",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
  },

  topSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },

  title: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  categories: {
    color: "#666",
    marginBottom: "6px",
  },

  address: {
    color: "#777",
    marginBottom: "12px",
  },

  metaRow: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    color: "#666",
    fontSize: "14px",
  },

  status: {
    color: "#e23744",
    fontWeight: "600",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  ratingsWrapper: {
    display: "flex",
    gap: "16px",
  },

  ratingCard: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  ratingBox: {
    background: "#267e3e",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  gallery: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: "10px",
    height: "380px",
  },

  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
  },

  galleryColumn: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gap: "10px",
  },

  smallImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
  },

  overlayWrapper: {
    position: "relative",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "20px",
  },

  tabs: {
    display: "flex",
    gap: "30px",
    borderBottom: "1px solid #eee",
    marginTop: "30px",
    overflowX: "auto",
  },

  tab: {
    paddingBottom: "14px",
    cursor: "pointer",
    color: "#666",
  },

  activeTab: {
    color: "#e23744",
    borderBottom: "3px solid #e23744",
    fontWeight: "600",
  },

  content: {
    display: "flex",
    gap: "40px",
    marginTop: "24px",
    flexWrap: "wrap",
  },

  sidebar: {
    width: "260px",
  },

  categoryItem: {
    padding: "12px 14px",
    borderRadius: "8px",
    marginBottom: "6px",
    cursor: "pointer",
    color: "#555",
  },

  activeCategory: {
    background: "#ffe9ec",
    color: "#e23744",
    fontWeight: "600",
  },

  menuSection: {
    flex: 1,
    minWidth: "300px",
  },

  menuTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  orderTitle: {
    fontSize: "34px",
    marginBottom: "6px",
  },

  searchInput: {
    width: "280px",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },

  sectionTitle: {
    color: "#999",
    fontSize: "12px",
    letterSpacing: "2px",
    marginBottom: "20px",
  },

  menuList: {
    display: "flex",
    flexDirection: "cogolumn",
    gap: "24px",
  },

  menuItem: {
    display: "flex",
    gap: "18px",
    alignItems: "flex-start",
  },

  menuImage: {
    width: "110px",
    height: "110px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  menuItemTitle: {
    fontSize: "22px",
    marginBottom: "8px",
  },

  menuDescription: {
    color: "#777",
    lineHeight: "1.5",
    maxWidth: "600px",
  },
};