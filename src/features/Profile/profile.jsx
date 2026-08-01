import "./profile.css";

export default function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-card">

        <img
          src="/images/avatar.png"
          alt="Profile"
        />

        <h2>Venu G</h2>

        <p>venu@email.com</p>

        <button>Edit Profile</button>

      </div>

      <div className="profile-section">

        <h3>Saved Addresses</h3>

        <div className="item">
          <strong>Home</strong>
          <p>Hyderabad, Telangana</p>
        </div>

        <div className="item">
          <strong>Office</strong>
          <p>Hitech City</p>
        </div>

      </div>

      <div className="profile-section">

        <h3>Payment Methods</h3>

        <div className="item">
          Visa **** 4587
        </div>

        <div className="item">
          Google Pay
        </div>

      </div>

      <div className="profile-section">

        <h3>Settings</h3>

        <div className="setting">Notifications</div>
        <div className="setting">Language</div>
        <div className="setting">Privacy</div>
        <div className="setting">Help Center</div>

      </div>

      <button className="logout-btn">
        Logout
      </button>

    </div>
  );
}