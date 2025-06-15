import { useState } from 'react';
import './admin-offers.css';

const AdminOffers = () => {
  const [offers, setOffers] = useState([
    { id: 1, title: 'New Customer Special', code: 'NEWBIE2024', discount: '100% OFF', validUntil: '2024-12-31', active: true },
    { id: 2, title: 'Weekend Warrior', code: 'WEEKEND20', discount: '20% OFF', validUntil: '2024-06-30', active: true },
  ]);
  const [newOffer, setNewOffer] = useState({ title: '', code: '', discount: '', validUntil: '' });

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
    <div className="admin-offers">
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
                  onChange={e => setNewOffer({ ...newOffer, title: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Coupon Code</label>
                <input
                  type="text"
                  value={newOffer.code}
                  onChange={e => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })}
                  className="form-input"
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
                  onChange={e => setNewOffer({ ...newOffer, discount: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Valid Until</label>
                <input
                  type="date"
                  value={newOffer.validUntil}
                  onChange={e => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                  className="form-input"
                  required
                />
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
                      <input
                        type="checkbox"
                        checked={o.active}
                        onChange={() => toggleOfferStatus(o.id)}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>
                <div className="offer-details">
                  <div className="offer-code">Code: <span>{o.code}</span></div>
                  <div className="offer-discount">{o.discount}</div>
                  <div className="offer-validity">Valid until: {o.validUntil}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOffers;
