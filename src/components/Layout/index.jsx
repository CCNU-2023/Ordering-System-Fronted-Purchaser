import './index.less'
import { AppBar, IconButton, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';

const Header = () => {

    const navigate = useNavigate()
    const [selected,setSelected] = useState(0)

    return (
        <>
            <AppBar className='header' position='static'>
                <div className='logo-box' onClick={() => navigate('/login')}>
                    <img src='http://rxebx5s7b.bkt.clouddn.com/logo.png' alt="Ordering Hub" />
                </div>
                <div className='goods-box' onClick={() => {setSelected(0);navigate('/home/market')}}>
                    <img className='icon' src={selected === 0?'http://rxebx5s7b.bkt.clouddn.com/goods-active.svg':'http://rxebx5s7b.bkt.clouddn.com/goods.svg'} alt="" />
                    <div className={`goods-title ${selected === 0? 'active':''}`}>商品</div>
                </div>
                <div className='order-box' onClick={() => {setSelected(1);navigate('/home/order')}}>
                    <img className='icon' src={selected === 1?'http://rxebx5s7b.bkt.clouddn.com/order-active.svg':'http://rxebx5s7b.bkt.clouddn.com/order.svg'} alt="" />
                    <div className={`order-title ${selected === 1? 'active':''}`}>订单</div>
                </div>
                <div className='search-field'>
                    <InputBase
                        className='input-box'
                        placeholder="搜索供应商"
                    />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
                <div className='person-box' onClick={() => {setSelected(2);navigate('/home/person')}}>
                    <img className='icon' src={selected === 2?'http://rxebx5s7b.bkt.clouddn.com/person-active.svg':'http://rxebx5s7b.bkt.clouddn.com/person.svg'} alt="" />
                    <div className={`person-title ${selected === 2? 'active':''}`}>个人中心</div>
                </div>
                <div className='shop-box' onClick={() => {setSelected(3);navigate('/home/cart')}}>
                    <img className='icon' src={selected === 3?'http://rxebx5s7b.bkt.clouddn.com/shop-active.svg':'http://rxebx5s7b.bkt.clouddn.com/shop.svg'} alt="" />
                    <div className={`shop-title ${selected === 3? 'active':''}`}>购物车</div>
                </div>
            </AppBar>
        </>
    )
}

export default function Layout() {
    return (
        <div className='layout-wrapper'>
            <Header />
            <Outlet />
        </div>
    )
}
