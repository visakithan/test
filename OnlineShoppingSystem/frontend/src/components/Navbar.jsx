import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() { const { itemCount } = useCart(); return <nav><Link className="brand" to="/">Shop</Link><div><Link to="/products">Products</Link><Link to="/orders">My orders</Link><Link to="/cart">Cart ({itemCount})</Link></div></nav>; }
