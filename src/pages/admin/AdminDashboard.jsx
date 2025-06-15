import { useState } from 'react';
import './AdminDashboard.css';
import AdminOverview from '../admin/AdminOverview';
import AdminCustomers from '../admin/AdminCustomers';
import AdminOffers from '../admin/AdminOffers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
            {activeTab === 'overview' && <AdminOverview />}
            {activeTab === 'customers' && <AdminCustomers />}
            {activeTab === 'offers' && <AdminOffers />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
