import './admin-overview.css';

const AdminOverview = () => {
  const stats = {
    totalCustomers: 128, // You can fetch this from API if needed
    activeOffers: 4,
    totalRevenue: '$2,450',
    todayWashes: 12,
  };

  return (
    <div className="overview-tab">
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-number">{stats.totalCustomers}</div>
            <div className="stat-label">Total Customers</div>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon">🎁</div>
          <div className="stat-info">
            <div className="stat-number">{stats.activeOffers}</div>
            <div className="stat-label">Active Offers</div>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-number">{stats.totalRevenue}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <div className="stat-number">{stats.todayWashes}</div>
            <div className="stat-label">Today's Washes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
