/* eslint-disable react-hooks/exhaustive-deps */
import './index.less'
import { Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getJson, putData } from '../../service/fetch';

const Price = () => {

    const [rows,setRows] = useState([])

    const [orderId,setOrderId] = useState('')
    const [total,setTotal] = useState(0)
    const [status,setStatus] = useState(0)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        console.log(location)
        if(location.state) {
            const newOrderId = location.state.orderId
            setOrderId(newOrderId)
            const newStatus = location.state.status
            setStatus(newStatus)
            getJson(`/order/product?order_id=${newOrderId}&page=${1}`).then(
                res => {
                    console.log(res.data)
                    setRows(res.data)
                    let newTotal = 0
                    for(let i in res.data) {
                        newTotal += res.data[i].product.order_price * res.data[i].cart.num 
                    }
                    setTotal(newTotal)
                }
            )
        } else {
            console.log(location)
            const query = location.search
            const regex = /out_trade_no=([^&]+)/;
            let match = regex.exec(query)
            let newOrderId = match ? match[1] : null;
            getJson(`/order/product?order_id=${newOrderId}&page=${1}`).then(
                res => {
                    console.log(res.data)
                    setRows(res.data)
                    setStatus(res.data[0].cart.status)
                    let newTotal = 0
                    for(let i in res.data) {
                        newTotal += res.data[i].product.order_price * res.data[i].cart.num 
                    }
                    setTotal(newTotal)
                }
            )
        }
    },[])

    const submit = () => {
        putData(`/order/status?order_id=${orderId}&status=2`).then(
            res => {
                console.log(res.data)
                navigate('/home/pay',{state: {orderId: orderId,total: total}})
            }
        )
    }

    return (
        <div className='price-box'>
            <div className='table-box'>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>序号</TableCell>
                            <TableCell align='right'>商品</TableCell>
                            <TableCell align="right">数量</TableCell>
                            <TableCell align="right">单价</TableCell>
                            <TableCell align="right">小计</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.length > 0 && rows.map((row,index) => (
                            <TableRow key={index + 'a'}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{row.product.name}</TableCell>
                                <TableCell align="right">{row.cart.num}</TableCell>
                                <TableCell align="right">{row.product.order_price}</TableCell>
                                <TableCell align="right">{row.cart.num * row.product.order_price}</TableCell>
                            </TableRow>
                        ))}
                            <TableRow className='total'>
                                <TableCell rowSpan={3} colSpan={3}/>
                                <TableCell colSpan={1}>运费</TableCell>
                                <TableCell align="right">2.5</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={1}>总计</TableCell>
                                <TableCell align="right">{total}</TableCell>
                            </TableRow>
                            {status === 0 && <TableRow>
                                <TableCell colSpan={1}/>
                                <TableCell><Button className='pay-btn' onClick={submit}>付款</Button></TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <div className='pagination'>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </div> */}
            </div>
        </div>
    )
}

const Logistics = () => {
    const [rows,setRows] = useState([])

    // const [orderId,setOrderId] = useState('')
    // const [status,setStatus] = useState(0)
    const [time,setTime] = useState('')
    const [track,setTrack] = useState('')
    const location = useLocation()
    // /order/single/info


    
    useEffect(() => {

        console.log(location)
        if(location.state) {
            const newOrderId = location.state.orderId
            getJson(`/order/product?order_id=${newOrderId}&page=${1}`).then(
                res => {
                    console.log(res.data)
                    setRows(res.data)

                }
            )
            
            getJson(`/order/single/info?order_id=${newOrderId}`).then(
                res => {
                    console.log(res.data)
                    setTime(res.data[0].order.createdAt)
                    setTrack(res.data[0].tracking_number)
                }
            )

        } else {
            console.log(location)
            const query = location.search
            const regex = /out_trade_no=([^&]+)/;
            let match = regex.exec(query)
            let newOrderId = match ? match[1] : null;
            getJson(`/order/product?order_id=${newOrderId}&page=${1}`).then(
                res => {
                    console.log(res.data)
                    setRows(res.data)
                }
            )
            
            getJson(`/order/single/info?order_id=${newOrderId}`).then(
                res => {
                    console.log(res.data)
                    setTime(res.data[0].order.createdAt)
                    setTrack(res.data[0].tracking_number)
                }
            )

        }
    },[])

    return (
        <div className='price-box'>
            <div className='table-box'>
                <div className='logistics-info'>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="right">物流公司</TableCell>
                                <TableCell align="right">发货日期</TableCell>
                                <TableCell align="right">快递单号</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">kunkun物流</TableCell>
                                    <TableCell align="right">{time}</TableCell>
                                    <TableCell align="right">{track}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>序号</TableCell>
                            <TableCell align='right'>商品</TableCell>
                            <TableCell align="right">数量</TableCell>
                            <TableCell align="right">单价</TableCell>
                            <TableCell align="right">小计</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row,index) => (
                            <TableRow key={index + 'a'}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{row.product.name}</TableCell>
                                <TableCell align="right">{row.cart.num}</TableCell>
                                <TableCell align="right">{row.product.order_price}</TableCell>
                                <TableCell align="right">{row.cart.num * row.product.order_price}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <div className='pagination'>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </div> */}
            </div>
        </div>
    )
}

export default function OrderDetail() {

    const [value, setValue] = useState(0);

    const [orderId,setOrderId] = useState('')
    const [total,setTotal] = useState(0)
    const [status,setStatus] = useState(0)

    const location = useLocation()

    useEffect(() => {

        console.log(location)
        if(location.state) {
            const newOrderId = location.state.orderId
            setOrderId(newOrderId)
            const newStatus = location.state.status
            setStatus(newStatus)
            getJson(`/order/product?order_id=${newOrderId}&page=${1}`).then(
                res => {
                    console.log(res.data)
                    let newTotal = 0
                    for(let i in res.data) {
                        newTotal += res.data[i].product.order_price * res.data[i].cart.num 
                    }
                    setTotal(newTotal)
                }
            )
        } else {
            console.log(location)
            const query = location.search
            const regex = /out_trade_no=([^&]+)/;
            let match = regex.exec(query)
            let newOrderId = match ? match[1] : null;
            getJson(`/order/product?order_id=${newOrderId}&page=${1}`).then(
                res => {
                    console.log(res.data)
                    setStatus(res.data[0].cart.status)
                    let newTotal = 0
                    for(let i in res.data) {
                        newTotal += res.data[i].product.order_price * res.data[i].cart.num 
                    }
                    setTotal(newTotal)
                }
            )
        }
    },[])

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    return (
        <div className='order-detail-wrapper'>
            <div className='info-box'>
                <div className='box1'>
                    <div className='name'>订单编号</div>
                    <div className='content'>{orderId}</div>
                </div>
                <div className='box2'>
                    <div className='name'>订单状态</div>
                    <div className='content'>{status === 0? '待审核' : '待发货'}</div>
                </div>
                <div className='box2'>
                    <div className='name'>订单金额</div>
                    <div className='content'>{total}</div>
                </div>
            </div>
            <div className='tabbar'>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="订单详情" />
                        {status ===0 && <Tab label="物流" />}
                    </Tabs>
                </Paper>
            </div>
            {
                value === 0
                ? <Price />
                : <Logistics />
            }
        </div>
    )
}
