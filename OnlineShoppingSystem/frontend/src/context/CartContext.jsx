import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const storageKey = 'online-shopping-cart';

export function CartProvider({ children }) {
	const [items, setItems] = useState(() => JSON.parse(localStorage.getItem(storageKey) || '[]'));

	useEffect(() => localStorage.setItem(storageKey, JSON.stringify(items)), [items]);

	const addItem = (product) => setItems((current) => {
		const existing = current.find((item) => item.id === product.id);
		if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
		return [...current, { ...product, quantity: 1 }];
	});
	const updateQuantity = (id, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item));
	const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));
	const clearCart = () => setItems([]);
	const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	const value = useMemo(() => ({ items, addItem, updateQuantity, removeItem, clearCart, itemCount, total }), [items, itemCount, total]);
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
