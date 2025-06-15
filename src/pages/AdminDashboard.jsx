import { useEffect, useState } from 'react';
import './AdminDashboard.css';

const mockCustomers = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  phone: `+971-50-10000${(i + 1).toString().padStart(2, '0')}`,
  joinDate: `2024-01-${(i + 1).toString().padStart(2, '0')}`,
  totalWashes: (i + 1) % 5,
  lastVisit: (i + 1) % 5 === 0 ? 'Never' : `2024-02-${(i + 1).toString().padStart(2, '0')}`,
  status: (i + 1) % 3 === 0 ? 'Inactive' : 'Active'
}));

const AdminDashboard = () => {
  const limit = 5;
  const [visibleCustomers, setVisibleCustomers] = useState(mockCustomers.slice(0, limit));
  const [offset, setOffset] = useState(limit);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [offers, setOffers] = useState([
    { id: 1, title: 'New Customer Special', code: 'NEWBIE2024', discount: '100% OFF', validUntil: '2024-12-31', active: true },
    { id: 2, title: 'Weekend Warrior', code: 'WEEKEND20', discount: '20% OFF', validUntil: '2024-06-30', active: true },
  ]);
  const [newOffer, setNewOffer] = useState({ title: '', code: '', discount: '', validUntil: '' });

  const stats = {
    totalCustomers: mockCustomers.length,
    activeOffers: offers.filter(o => o.active).length,
    totalRevenue: '$2,450',
    todayWashes: 12,
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        scrollY + windowHeight >= fullHeight - 100 &&
        !isLoading &&
        offset < mockCustomers.length
      ) {
        setIsLoading(true);
        setTimeout(() => {
          const next = mockCustomers.slice(offset, offset + limit);
          setVisibleCustomers(prev => [...prev, ...next]);
          setOffset(prev => prev + limit);
          setIsLoading(false);
        }, 600);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, isLoading]);

  const handleAddOffer = e => {
    e.preventDefault();
    if (newOffer.title && newOffer.code && newOffer.discount && newOffer.validUntil) {
      const offer = { id: offers.length + 1, ...newOffer, active: true };
      setOffers(prev => [...prev, offer]);
      setNewOffer({ title: '', code: '', discount: '', validUntil: '' });
    }
  };

  const toggleOfferStatus = id => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, active: !o.active } : o));
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1 className="dashboard-title">🔧 Admin Dashboard</h1>
            <div className="admin-actions">
              <button className="btn btn-secondary">Export Data</button>
              <button className="btn btn-primary">Settings</button>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-tabs">
            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`tab-btn ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>Customers</button>
            <button className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`} onClick={() => setActiveTab('offers')}>Offers</button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
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
            )}

            {activeTab === 'customers' && (
              <div className="customers-tab">
                <div className="customers-header">
                  <h2 className="tab-title">Customer Management</h2>
                </div>
                <div className="customers-table-container">
                  <table className="customers-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Join Date</th>
                        <th>Total Washes</th>
                        <th>Last Visit</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleCustomers.map(c => (
                        <tr key={c.id}>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                          <td>{c.phone}</td>
                          <td>{c.joinDate}</td>
                          <td>{c.totalWashes}</td>
                          <td>{c.lastVisit}</td>
                          <td>
                            <span className={`status-badge ${c.status.toLowerCase()}`}>{c.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isLoading && (
                    <div className="table-spinner">
                      <div className="spinner" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'offers' && (
              <div className="offers-tab">
                <div className="offers-header">
                  <h2 className="tab-title">Offer Management</h2>
                </div>
                <div className="offers-content">
                  <div className="add-offer-form card">
                    <h3 className="card-title">Add New Offer</h3>
                    <form onSubmit={handleAddOffer} className="offer-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Offer Title</label>
                          <input type="text" value={newOffer.title} onChange={e => setNewOffer({ ...newOffer, title: e.target.value })} className="form-input" required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Coupon Code</label>
                          <input type="text" value={newOffer.code} onChange={e => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })} className="form-input" required />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Discount</label>
                          <input type="text" value={newOffer.discount} onChange={e => setNewOffer({ ...newOffer, discount: e.target.value })} className="form-input" required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Valid Until</label>
                          <input type="date" value={newOffer.validUntil} onChange={e => setNewOffer({ ...newOffer, validUntil: e.target.value })} className="form-input" required />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success add-offer-btn">Add Offer</button>
                    </form>
                  </div>
                  <div className="offers-list card">
                    <h3 className="card-title">Current Offers</h3>
                    <div className="offers-grid">
                      {offers.map(o => (
                        <div key={o.id} className={`offer-item ${!o.active ? 'inactive' : ''}`}>
                          <div className="offer-header">
                            <h4 className="offer-title">{o.title}</h4>
                            <div className="offer-status">
                              <label className="toggle-switch">
                                <input type="checkbox" checked={o.active} onChange={() => toggleOfferStatus(o.id)} />
                                <span className="toggle-slider" />
                              </label>
                            </div>
                          </div>
                          <div className="offer-details">
                            <div className="offer-code">Code: {o.code}</div>
                            <div className="offer-discount">{o.discount}</div>
                            <div className="offer-validity">Valid until: {o.validUntil}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
