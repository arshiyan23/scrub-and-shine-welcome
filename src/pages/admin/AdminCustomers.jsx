import { useEffect, useState } from 'react';
import api from '../../api/axios';
import './admin-customers.css';

const AdminCustomers = () => {
  const limit = 5;
  const [customers, setCustomers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const res = await api.get('/api/admin/customers', { params: { offset, limit } });
      const data = res.data.customers || [];
      if (data.length < limit) setHasMore(false);
      setCustomers(prev => [...prev, ...data]);
      setOffset(prev => prev + data.length);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        fetchCustomers();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, isLoading]);

  const filtered = customers.filter(c =>
    [c.name, c.email, c.phone].some(field =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="customers-tab">
      <div className="customers-header">
        <h2 className="tab-title">Customer Management</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Join Date</th><th>Coupon</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{new Date(c.joinDate).toLocaleDateString()}</td>
                <td>{c.coupon_code || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <div className="table-spinner"><div className="spinner" /></div>}
      </div>
    </div>
  );
};

export default AdminCustomers;
