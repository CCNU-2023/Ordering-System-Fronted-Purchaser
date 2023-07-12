/* eslint-disable react-hooks/exhaustive-deps */
import './index.less'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getJson, postData } from '../../service/fetch';
import { message } from 'antd';

const Price = () => {

    const location = useLocation()
    const [total,setTotal] = useState(0)
    const [address,setAddress] = useState('')
    const [rows,setRows] = useState([])


    const navigate = useNavigate()

    useEffect(() => {
        const newRows = location.state.rows
        console.log(location.state)
        let newTotal = 0
        setRows(newRows)
        for(let i in newRows) {
            newTotal += newRows[i].num * newRows[i].price
        }
        setTotal(newTotal)
        getJson('/user/info').then(
            res => {
                setAddress(res.data.address)
            }
        )
    },[])

    const submit = () => {
        const carts = rows.map(
            // eslint-disable-next-line no-unused-labels
            item => {return {id: item.cartId}}
        )   

        console.log(carts)

        postData(`/order/add`,{
            supplier_id: localStorage.getItem('supplier_id'),
            carts: carts,
            address: address
        }).then(
            res => {
                console.log(res.data)
                message.success({
                    content: '订单创建成功',
                    duration: 5
                })
                navigate('/home/order')
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
                        {rows.map((row,index) => (
                            <TableRow key={index + 'a'}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.num}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.num * row.price}</TableCell>
                            </TableRow>
                        ))}
                            <TableRow className='total'>
                                <TableCell rowSpan={5} colSpan={3}/>
                                <TableCell colSpan={1}>商品金额</TableCell>
                                <TableCell align="right">{total}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={1}>运费</TableCell>
                                <TableCell align="right">111</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={1}>订单总额</TableCell>
                                <TableCell align="right">{total + 111}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={1}/>
                                <TableCell>
                                    <Button
                                        className='pay-btn'
                                        onClick={submit}
                                    >
                                        创建订单
                                    </Button>
                                    </TableCell>
                            </TableRow>
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


export default function SubmitOrder() {

    // const [value, setValue] = useState(0);

    // const handleChange = (event, newValue) => {
    //     console.log(newValue)
    //     setValue(newValue);
    // };

    const [address,setAddress] = useState('')

    useEffect(() => {
        getJson('/user/info').then(
            res => {
                setAddress(res.data.address)
            }
        )
    },[])

    return (
        <div className='submit-order-wrapper'>
            <div className='info-box'>
                <div className='box1'>
                    <div className='name'>收货地址: </div>
                    <div className='content'>{address}</div>
                </div>
            </div>
            <Price />
        </div>
    )
}
