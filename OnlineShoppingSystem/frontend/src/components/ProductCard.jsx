import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
	const { addItem } = useCart();
	return <article className="product-card"><div><h2>{product.name}</h2><p>${Number(product.price).toFixed(2)}</p></div><button onClick={() => addItem(product)}>Add to cart</button></article>;
}
