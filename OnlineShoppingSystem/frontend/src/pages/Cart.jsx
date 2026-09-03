import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

export default function Cart() {
	const { items, total } = useCart();
	if (!items.length) return <main><h1>Your cart</h1><p>Your cart is empty.</p><Link className="button" to="/products">Continue shopping</Link></main>;
	return <main><h1>Your cart</h1><section className="cart-list">{items.map((item) => <CartItem key={item.id} item={item} />)}</section><aside className="summary"><span>Total</span><strong>${total.toFixed(2)}</strong><Link className="button" to="/checkout">Checkout</Link></aside></main>;
}
