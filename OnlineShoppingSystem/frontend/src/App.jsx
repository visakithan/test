import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders, { OrderConfirmation, OrderDetails } from './pages/Orders';

export default function App() { return <CartProvider><BrowserRouter><Navbar /><Routes><Route path="/" element={<main><h1>Shop simply.</h1><p>Find what you need, then check out in a few clicks.</p><Link className="button" to="/cart">Open cart</Link></main>} /><Route path="/cart" element={<Cart />} /><Route path="/checkout" element={<Checkout />} /><Route path="/orders" element={<Orders />} /><Route path="/orders/:id" element={<OrderDetails />} /><Route path="/confirmation" element={<OrderConfirmation />} /></Routes></BrowserRouter></CartProvider>; }
