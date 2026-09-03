import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
	const { updateQuantity, removeItem } = useCart();
	return <article className="cart-item">
		<div><strong>{item.name}</strong><span>${Number(item.price).toFixed(2)} each</span></div>
		<div className="quantity"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">-</button><b>{item.quantity}</b><button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button></div>
		<strong>${(item.price * item.quantity).toFixed(2)}</strong>
		<button className="remove" onClick={() => removeItem(item.id)}>Remove</button>
	</article>;
}
