import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
	const { items, total, clearCart } = useCart();
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	if (!items.length) return <main><h1>Checkout</h1><p>Your cart is empty.</p><Link to="/products">Browse products</Link></main>;
	const submit = async (event) => {
		event.preventDefault(); setError('');
		try { const order = await createOrder({ customerEmail: email, items: items.map(({ id, quantity }) => ({ productId: id, quantity })) }); clearCart(); navigate('/confirmation', { state: { order } }); }
		catch (requestError) { setError(requestError.message); }
	};
	return <main><h1>Checkout</h1><form className="checkout" onSubmit={submit}><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>{error && <p className="error">{error}</p>}<div className="summary"><span>Order total</span><strong>${total.toFixed(2)}</strong></div><button className="button" type="submit">Place order</button></form></main>;
}
