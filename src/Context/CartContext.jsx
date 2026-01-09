import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    //Add to cart
    const addToCart = (product) => {
        const exist = cart.find((item) => item._id === product._id)
        if (exist) {
            setCart(cart.map((item) =>
                item._id === product._id ? { ...item, qty: item.qty + 1 } : item
            ))
        }
        else {
            setCart([...cart, { ...product, qty: 1 }])
        }
    }

    // Increase Qty
    const IncreaseQty = (id) => {
        setCart(cart.map((item) =>
            item._id === id ? { ...item, qty: item.qty + 1 } : item
        ))
    }

    // Decrease Qty
    const DecreaseQty = (id) => {
        setCart(cart.map((item) =>
            item._id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
        ))
    }

    //remove 
    const removeItem = (id) => {
        setCart(cart.filter((item) => item._id !== id))
    }

    return (
        <cartContext.Provider value={{ cart, addToCart, IncreaseQty, DecreaseQty, removeItem }}>
            {children}
        </cartContext.Provider>
    );
}
export const useCart = () => useContext(cartContext)