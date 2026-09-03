const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
	const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
	const data = await response.json().catch(() => null);
	if (!response.ok) throw new Error(data?.message || 'Request failed');
	return data;
}

export const createOrder = (order) => request('/orders', { method: 'POST', body: JSON.stringify(order) });
export const getOrders = (customerEmail) => request(`/orders${customerEmail ? `?customerEmail=${encodeURIComponent(customerEmail)}` : ''}`);
export const getOrder = (id) => request(`/orders/${id}`);
