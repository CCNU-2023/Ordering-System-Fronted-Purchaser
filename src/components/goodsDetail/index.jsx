/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import './index.less'
import { Button, Divider, IconButton, TextField, Typography } from '@material-ui/core'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useLocation, useNavigate } from 'react-router'
import { getJson, postData } from '../../service/fetch'
import { message } from 'antd';


export default function GoodsDetail() {

    const [count,setCount] = useState(0)
    const location = useLocation()
    const [goods,setGoods] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const code = location.state.code
        getJson(`/product/single/info?code=${code}`).then(
            res => {
                console.log(res.data)
                setGoods(res.data)
                getJson(`/admin/info?id=${res.data.supplier_id}`)
            }
        )
    },[])

    const addGoods = () => {
        const newCount = count + 1
        setCount(newCount)
    }

    const removeGoods = () => {
        if(count > 0) {
            const newCount = count - 1
            setCount(newCount) 
        }
    }

    const handleCount = (e) => {

        if(parseInt(e.target.value) < 0 || e.target.value < 0) {
            setCount(0)
        } else {
            setCount(parseInt(e.target.value))
        }
    }

    const putToCart = () => {
        if(count <= 0) {
            message.error({
                content: '数量不能为0!',
                duration: 3
            })
            return
        }
        postData(`/cart/add?supplier_id=${goods.supplier_id}`,{
            code: goods.code,
            num: count
        }).then(
            res => {
                console.log(res.data)
                message.success({
                    content: '已添加到购物车',
                    duration: 3
                })
            }
        )
    }

    const submit = () => {
        if(count <= 0) {
            message.error({
                content: '数量不能为0!',
                duration: 3
            })
            return
        }
        postData(`/cart/add?supplier_id=${goods.supplier_id}`,{
            code: goods.code,
            num: count
        }).then(
            res => {
                console.log(res.data['购物车信息id'])
                message.success({
                    content: '已添加到购物车',
                    duration: 3
                })
                const rows = [{
                    id: goods.id,
                    cartId: res.data['购物车信息id'],
                    name: goods.name,
                    image: goods.picture,
                    num: count,
                    price: goods.order_price
                }]
                navigate('/home/cart/submit',{state: {rows: rows}})
            }
        )
    }

    return (
        <div className='goodsDetail-wrapper'>
            <div className='photos-box'>
                <div className='show-photo'>
                    <img src={goods.picture} alt="" />
                </div>
                {/* <div className='photo-items'>
                    {
                        pics.map(
                            (pic,index) => 
                            <div 
                                onClick={() => {setSelected(pic)}} 
                                key={index + 'pic'}  
                                className={`photo-box ${selected === pic? 'photo-active': ''}`}
                            >
                                <img src={pic} alt='' />
                            </div>
                        )
                    }
                </div> */}
            </div>
            <div className='info-box'>
                <Typography gutterBottom variant="h5" color='textSecondary' component="h3">
                    {goods.name}
                </Typography>
                <Typography gutterBottom variant="h5"  component="h3">
                    <img className='cny-icon' src='http://rxebx5s7b.bkt.clouddn.com/cny.svg' />{goods.order_price + '/' + goods.unit}
                </Typography>
                <Divider />
                <div className='detail-info'>
                    <div>供应商: 青青草原有限公司</div>
                    <div>产地: 湖北武汉</div>
                    <div>类别:<span>{goods.category}</span> </div>
                    <div>描述：<span className='description'>{goods.description}</span></div>
                </div>
            </div>
            <div className='order-box'>
                <div className='order-box-name'>订货数量</div>
                <div className='amount-box'>
                    <IconButton className='count-btn' onClick={removeGoods}>
                        <RemoveIcon></RemoveIcon>
                    </IconButton>
                    <TextField 
                        type='number'
                        className='input-field' 
                        value={count} 
                        onChange={handleCount}
                        focused
                    />
                    <IconButton className='count-btn' onClick={addGoods}>
                        <AddIcon></AddIcon>
                    </IconButton>
                </div>
                <div className='store-amount'></div>
                <Divider />
                <div className='price-box'>
                    <div className='price-box-name'>总计: </div>
                    <div className='price'><img className='cny-icon' src='http://rxebx5s7b.bkt.clouddn.com/cny.svg'/>{count * goods.order_price}</div>
                </div>
                <div className='btn-box'>
                    <Button className='buy' onClick={submit}>立即购买</Button>
                    <Button className='add' onClick={putToCart}>加入购物车</Button>
                </div>
            </div>
        </div>
    )
}
