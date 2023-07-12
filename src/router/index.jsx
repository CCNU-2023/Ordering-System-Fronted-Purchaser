import { Navigate } from "react-router-dom"
import Login from "../components/login"
import Register from "../components/register"
import Supplier from "../components/supplier"
import Layout from "../components/Layout"
import Market from "../components/market"
import GoodsDetail from "../components/goodsDetail"
import Orders from "../components/orders"
import OrderDetail from "../components/orderDetail"
import Person from "../components/person"
import Cart from "../components/cart"
import SubmitOrder from "../components/submitOrder"
import Pay from "../components/pay"
import SupplierDetail from "../components/supplierDetail"

const router = [
    {
        path: '/',
        element: <Navigate to='/login' />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path:'/register',
        element: <Register />
    },
    {
        path: '/supplier',
        element: <Supplier />
    },
    {
        path: '/supplier/detail',
        element: <SupplierDetail />
    },
    {
        path: '/home',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Navigate to='market' />
            },
            {
                path: 'market',
                element: <Market />
            },
            {
                path: 'market/goods',
                element: <GoodsDetail />
            },
            {
                path: 'order',
                element: <Orders />
            },
            {
                path: 'order/detail',
                element: <OrderDetail />
            },
            {
                path: 'person',
                element: <Person />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'cart/submit',
                element: <SubmitOrder />
            },
            {
                path: 'pay',
                element: <Pay />
            }
        ]
    }
]

export default router