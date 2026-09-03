import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getOrder, getOrders } from '../services/api';

export function OrderConfirmation() {
	const { order } = useLocation().state || {};
	return <main><div className="confirmation"><p className="eyebrow">Order confirmed</p><h1>Thank you for your purchase.</h1>{order && <p>Order #{order.id} · ${Number(order.total).toFixed(2)}</p>}<Link className="button" to="/orders">View my orders</Link></div></main>;
}

export function OrderDetails() {
	const { id } = useParams(); const [order, setOrder] = useState(null); const [error, setError] = useState('');
	useEffect(() => { getOrder(id).then(setOrder).catch((requestError) => setError(requestError.message)); }, [id]);
	if (error) return <main><p className="error">{error}</p></main>;
	if (!order) return <main><p>Loading order...</p></main>;
	return <main><h1>Order #{order.id}</h1><p>{new Date(order.createdAt).toLocaleString()} · {order.customerEmail}</p><section className="cart-list">{order.items.map((item) => <article className="cart-item" key={item.productId}><span>{item.productName} × {item.quantity}</span><strong>${Number(item.lineTotal).toFixed(2)}</strong></article>)}</section><aside className="summary"><span>Total</span><strong>${Number(order.total).toFixed(2)}</strong></aside></main>;
}

export default function Orders() {
	const [email, setEmail] = useState(''); const [orders, setOrders] = useState([]); const [error, setError] = useState('');
	const load = async (event) => { event.preventDefault(); try { setOrders(await getOrders(email)); setError(''); } catch (requestError) { setError(requestError.message); } };
	return <main><h1>My orders</h1><form className="order-search" onSubmit={load}><input type="email" placeholder="Your order email" value={email} onChange={(event) => setEmail(event.target.value)} required /><button className="button">Find orders</button></form>{error && <p className="error">{error}</p>}<section className="orders">{orders.map((order) => <Link className="order" to={`/orders/${order.id}`} key={order.id}><span>Order #{order.id}<small>{new Date(order.createdAt).toLocaleDateString()}</small></span><strong>${Number(order.total).toFixed(2)}</strong></Link>)}</section></main>;
}
