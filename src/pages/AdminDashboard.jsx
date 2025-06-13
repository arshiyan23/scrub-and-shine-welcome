
import { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [customers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-03-15',
      totalWashes: 0,
      lastVisit: 'Never',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 987-6543',
      joinDate: '2024-03-10',
      totalWashes: 3,
      lastVisit: '2024-03-20',
      status: 'Active'
    }
  ]);

  const [offers, setOffers] = useState([
    {
      id: 1,
      title: 'New Customer Special',
      code: 'NEWBIE2024',
      discount: '100% OFF',
      validUntil: '2024-12-31',
      active: true
    },
    {
      id: 2,
      title: 'Weekend Warrior',
      code: 'WEEKEND20',
      discount: '20% OFF',
      validUntil: '2024-06-30',
      active: true
    }
  ]);

  const [newOffer, setNewOffer] = useState({
    title: '',
    code: '',
    discount: '',
    validUntil: ''
  });

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (newOffer.title && newOffer.code && newOffer.discount && newOffer.validUntil) {
      const offer = {
        id: offers.length + 1,
        ...newOffer,
        active: true
      };
      setOffers([...offers, offer]);
      setNewOffer({ title: '', code: '', discount: '', validUntil: '' });
      console.log('New offer added:', offer);
    }
  };

  const toggleOfferStatus = (id) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, active: !offer.active } : offer
    ));
  };

  const stats = {
    totalCustomers: customers.length,
    activeOffers: offers.filter(offer => offer.active).length,
    totalRevenue: '$2,450',
    todayWashes: 12
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
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'customers' ? 'active' : ''}`}
              onClick={() => setActiveTab('customers')}
            >
              Customers
            </button>
            <button 
              className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
              onClick={() => setActiveTab('offers')}
            >
              Offers
            </button>
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

                <div className="recent-activity card">
                  <h3 className="card-title">Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon">✅</div>
                      <div className="activity-details">
                        <p><strong>John Doe</strong> signed up and claimed free wash coupon</p>
                        <span className="activity-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">🎫</div>
                      <div className="activity-details">
                        <p><strong>Weekend20</strong> coupon was redeemed by Jane Smith</p>
                        <span className="activity-time">5 hours ago</span>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-icon">💳</div>
                      <div className="activity-details">
                        <p>Monthly subscription activated for customer #1234</p>
                        <span className="activity-time">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="customers-tab">
                <div className="customers-header">
                  <h2 className="tab-title">Customer Management</h2>
                  <div className="customers-actions">
                    <input 
                      type="text" 
                      placeholder="Search customers..." 
                      className="search-input"
                    />
                    <button className="btn btn-primary">Export List</button>
                  </div>
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id}>
                          <td className="customer-name">{customer.name}</td>
                          <td>{customer.email}</td>
                          <td>{customer.phone}</td>
                          <td>{customer.joinDate}</td>
                          <td className="text-center">{customer.totalWashes}</td>
                          <td>{customer.lastVisit}</td>
                          <td>
                            <span className={`status-badge ${customer.status.toLowerCase()}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-small btn-secondary">View</button>
                              <button className="btn-small btn-primary">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                          <input
                            type="text"
                            value={newOffer.title}
                            onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                            className="form-input"
                            placeholder="e.g., Summer Special"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Coupon Code</label>
                          <input
                            type="text"
                            value={newOffer.code}
                            onChange={(e) => setNewOffer({...newOffer, code: e.target.value.toUpperCase()})}
                            className="form-input"
                            placeholder="e.g., SUMMER2024"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Discount</label>
                          <input
                            type="text"
                            value={newOffer.discount}
                            onChange={(e) => setNewOffer({...newOffer, discount: e.target.value})}
                            className="form-input"
                            placeholder="e.g., 25% OFF"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Valid Until</label>
                          <input
                            type="date"
                            value={newOffer.validUntil}
                            onChange={(e) => setNewOffer({...newOffer, validUntil: e.target.value})}
                            className="form-input"
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success add-offer-btn">
                        Add Offer
                      </button>
                    </form>
                  </div>

                  <div className="offers-list card">
                    <h3 className="card-title">Current Offers</h3>
                    <div className="offers-grid">
                      {offers.map((offer) => (
                        <div key={offer.id} className={`offer-item ${!offer.active ? 'inactive' : ''}`}>
                          <div className="offer-header">
                            <h4 className="offer-title">{offer.title}</h4>
                            <div className="offer-status">
                              <label className="toggle-switch">
                                <input
                                  type="checkbox"
                                  checked={offer.active}
                                  onChange={() => toggleOfferStatus(offer.id)}
                                />
                                <span className="toggle-slider"></span>
                              </label>
                            </div>
                          </div>
                          <div className="offer-details">
                            <div className="offer-code">Code: {offer.code}</div>
                            <div className="offer-discount">{offer.discount}</div>
                            <div className="offer-validity">Valid until: {offer.validUntil}</div>
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
