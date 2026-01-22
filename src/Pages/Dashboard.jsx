import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CSS/Dashboard.css"
import { useStore } from "../Context/StoreContext";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { customers, orders, category, products } = useStore();

    console.log(customers, orders, category, products)
    const navigate = useNavigate();

    useEffect(() => {
        console.log("user from Dashboard", user);

        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    if (!user) return null;


    const totalRevenue = orders
        .filter(order => order.status === "Delivered")
        .reduce((acc, order) => {
            const orderTotal = order.items.reduce((sum, item) => {
                const product = products.find(p => p._id === item.productId.toString());
                return sum + (product ? parseFloat(product.price) * item.qty : 0);
            }, 0);
            return acc + orderTotal;
        }, 0);


    return (
        <>
            <div className="admin-header-outer">
                <div className="admin-header-logo" onClick={() => navigate('/')}><span className='ecom'>E</span><span className='shop'>Shop</span></div>


                <div className="admin-btn-logout" onClick={logout} role="button" tabIndex={0}>
                    <span className="admin-log">Log</span><span className="admin-out">Out</span>
                </div>

            </div>
            <div className="admin-card-outer">
                <h3>Admin Dashboard</h3>
                <div className="admin-card-main">
                    <div className="admin-card">
                        <h5>Total Customers</h5>
                        <p>Active:</p><span>{customers.filter(c => c.isActive).length}</span>
                        <p>InActive:</p><span>{customers.filter(c => !c.isActive ).length}</span>
                        <p>Deleted:</p><span>{customers.filter(c => c.isDeleted).length}</span>
                        <hr />
                        <h6>Total:</h6><span>{customers.length}</span>
                    </div>

                    <div className="admin-card">
                        <h5>Orders Customers</h5>
                        <p>Pending:</p><span>{orders.filter(o => o.status === "Pending").length}</span>
                        <p>Delivered:</p><span>{orders.filter(o => o.status === "Delivered").length}</span>
                        <p>Cancelled:</p><span>{orders.filter(o => o.status === "Cancelled").length}</span>
                        <hr />
                        <h6>orders:</h6><span>{orders.length}</span>
                    </div>

                    <div className="admin-card">
                        <h5>Products</h5>
                        <p>Category:</p><span>{category.length}</span>
                        <p>Items:</p><span>{products.length}</span>
                        <hr />
                        <h6>Products:</h6><span>{products.length}</span>
                    </div>
                    <div className="admin-card">
                        <h5>Total Revenue</h5>
                        <p>From Delivered Orders:</p><span>₹{totalRevenue}</span>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Dashboard;
