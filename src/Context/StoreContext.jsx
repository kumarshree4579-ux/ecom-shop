import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    customerRes,
                    orderRes,
                    categoryRes,
                    productRes
                ] = await Promise.all([
                    fetch('/Products/Customers.json'),
                    fetch('/Products/orders.json'),
                    fetch('/Products/products-category.json'),
                    fetch('/Products/products.json')
                ]);
                setCustomers(await customerRes.json());
                setOrders(await orderRes.json());
                setCategory(await categoryRes.json());
                setProducts(await productRes.json());
            } catch (error) {
                console.error("Failed to load store data:", error);
            }
        };

        loadData();
    }, []);

    return (
        <StoreContext.Provider value={{ customers, orders, category, products }}>
            {children}
        </StoreContext.Provider>
    )
}
export const useStore = () => useContext(StoreContext)