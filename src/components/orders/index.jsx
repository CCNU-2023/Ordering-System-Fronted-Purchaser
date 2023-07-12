import { useEffect, useState } from 'react'
import './index.less'
import { Button, IconButton, InputBase, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from 'react-router';
import { getJson, putData } from '../../service/fetch';


export default function Orders() {

    const navigate = useNavigate()

    const [anchorEl1, setAnchorEl1] = useState(null);
    // const [anchorEl2, setAnchorEl2] = useState(null);

    const [ostatus] = useState([
        '待审核','待发货','已发货','已完成','已取消'
    ])

    const [status,setStatus] = useState(0)
    // const [pstatus] = useState([
    //     '待付款','已付款','退款中','退款成功'
    // ])

    const [rows,setRows] = useState([])
    const [attention,setAttention] = useState(false)


    useEffect(() => {
        getJson(`/order/status?status=${status}&page=${1}`).then(
            res => {
                if(res.data.length === 0) {
                    setAttention(true)
                } else {
                    setAttention(false)
                }
                const newRows = res.data.map(
                    item => {
                        return {
                            orderId: item.order.id,
                            price: item.order.total_price,
                            consignee: item.purchaser.name,
                            orderStatus: ostatus[item.order.status]
                        }
                    }
                )
                console.log(newRows)
                setRows(newRows)
            }
        )
    },[ostatus, status])

    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    
    const handleClose1 = (index) => {
        setStatus(index)
        setAnchorEl1(null);
    };

    // const handleClick2 = (event) => {
    //     setAnchorEl2(event.currentTarget);
    // };
    
    // const handleClose2 = () => {
    //     setAnchorEl2(null);
    // };

    const submit = (orderId) => {
        console.log(orderId)
        navigate('detail',{state:{orderId: orderId,status: status}})
    }

    const cancel = (orderId) => {
        putData(`/order/status?order_id=${orderId}&status=-1`).then(
            res => {
                console.log(res.data)
                getJson(`/order/status?status=${status}&page=${1}`).then(
                    res => {
                        if(res.data.length === 0) {
                            setAttention(true)
                        }
                        const newRows = res.data.map(
                            item => {
                                return {
                                    orderId: item.order.id,
                                    price: item.order.total_price,
                                    consignee: item.purchaser.name,
                                    orderStatus: ostatus[item.order.status]
                                }
                            }
                        )
                        console.log(newRows)
                        setRows(newRows)
                    }
                )
            }
        )
    }

    return (
        <div className='orders-wrapper'>
            <div className='category-box'>
                <div className='search-field'>
                    <InputBase
                        className='input-box'
                        placeholder="请输入订单号/收货人/联系电话"
                    />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
                <div className='order-status'>
                    <Button 
                        className='select-btn'
                        aria-controls="simple-menu" 
                        aria-haspopup="true"
                        onClick={handleClick1}
                    >
                        订单状态
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl1}
                        keepMounted
                        open={Boolean(anchorEl1)}
                        onClose={handleClose1}
                    >
                        {
                            ostatus.map(
                                (item,index) => 
                                <MenuItem 
                                    key={index + 'o'}
                                    onClick={() => handleClose1(index)}
                                >
                                    {item}
                                </MenuItem>
                            )
                        }
                    </Menu>
                </div>
                {/* <div className='pay-status'>
                    <Button 
                        className='select-btn'
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={handleClick2}
                    >
                        付款状态
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={Boolean(anchorEl2)}
                        onClose={handleClose2}
                    >
                        {
                            pstatus.map(
                                (item,index) => 
                                <MenuItem 
                                    key={index + 'o'}
                                    onClick={handleClose2}
                                >
                                    {item}
                                </MenuItem>
                            )
                        }
                    </Menu>
                </div> */}
            </div>
            <div className='table-box'>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>订单号</TableCell>
                                <TableCell align="right">金额</TableCell>
                                <TableCell align="right">收货人</TableCell>
                                <TableCell align="right">订单状态</TableCell>
                                <TableCell align="right">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.length > 0 && rows.map((row) => (
                            <TableRow key={row.orderId + 'a'}>
                                <TableCell component="th" scope="row">
                                    {row.orderId}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.consignee}</TableCell>
                                <TableCell align="right">{row.orderStatus}</TableCell>
                                <TableCell align="right">
                                    <Button className='pay-btn' onClick={() => submit(row.orderId)}>{status === 0 ?'付款':'详情'}</Button>
                                    {status === 0?<Button className='cancel-btn' onClick={() => cancel(row.orderId)}>取消</Button>:''}
                                </TableCell>
                            </TableRow>
                        ))} 
                            {attention && <TableRow key={'a'}>
                                <TableCell colSpan={2}></TableCell>
                                <TableCell className='attention'>暂无订单</TableCell>
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
