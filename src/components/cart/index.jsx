import { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    TextField,
} from "@material-ui/core";
import "./index.less";
// import hly from '../../assets/hly.jpg'
import { useNavigate } from "react-router";
import { deleteData, getJson } from "../../service/fetch";


export default function Cart() {
    const [rows, setRows] = useState([]);

    const [countSelected,setCountSelected] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const navigate = useNavigate()
    const [attention,setAttention] = useState(false)

    useEffect(() => {
        const supplier_id = localStorage.getItem('supplier_id')
        getJson(`/cart/all/info?supplier_id=${supplier_id}&page=${1}`).then(
            // cartid,pic,name,num,price,selectd
            res => {
                console.log(res.data)
                let newRows = res.data.filter(item => item.orderId === null)
                console.log(newRows)
                if(newRows.length === 0) {
                    setAttention(true)
                }
                for(let i in newRows){
                    newRows[i].selected = false
                }
                setRows(newRows)
            }
        )
    },[])

    useEffect(() => {
        let price = 0
        for(let i in rows){
            if(rows[i].selected) price += rows[i].productPrice * rows[i].num
        }
        setTotalPrice(price)
        console.log(price)
    },[rows])

    const handleSelected = (row) => {
        const newRows = rows.map(
            item => {
                if(item.cartId === row.cartId){
                    const selected = !item.selected
                    if(selected === true) {
                        setCountSelected(countSelected => countSelected + 1)
                    } else {
                        setCountSelected(countSelected => countSelected - 1)
                    }
                    return {...item,selected}
                } else return item
            }
        )
        setRows(newRows)
    }

    const handleSelectedAll = () => {
        const newRows = rows.map(
            item => {
                const selected = !(countSelected === rows.length)
                return {...item,selected}
            }
        )
        const newCount = countSelected === rows.length? 0 : rows.length
        setCountSelected(newCount)
        setRows(newRows)
    }

    const handleChange = (row,e) => {
        const newRows = rows.map(
            item => {
                if(item.cartId === row.cartId) {
                    const num = e.target.value >= 0 ? e.target.value : 0
                    return {...item,num}
                } else return item
            }
        )
        setRows(newRows)
    }

    const removeRow = (row) => {
        const newRows = rows.filter(item => item.cartId !== row.cartId)
        setRows(newRows)
        deleteData(`/cart/delete?cart_id=${row.cartId}`).then(
            res => {
                console.log(res.data)
                // const supplier_id = localStorage.getItem('supplier_id')
                // getJson(`/cart/all/info?supplier_id=${supplier_id}&page=${1}`).then(
                //     // cartid,pic,name,num,price,selectd
                //     res => {
                //         console.log(res.data)
                //         let newRows = res.data.filter(item => item.orderId === null)
                //         console.log(newRows)
                //         if(newRows.length === 0) {
                //             setAttention(true)
                //         }
                //         for(let i in newRows){
                //             newRows[i].selected = false
                //         }
                //         setRows(newRows)
                //     }
                // )
            }
        )
    }

    const submit = () => {
        if(rows.length === 0) {
            console.log('无商品！！！')
            return
        }
        let newRows = rows.filter(item => item.selected === true)
        newRows = newRows.map(
            item => {
                if(item.selected){
                    return {
                        id: item.productId,
                        cartId: item.cartId,
                        name: item.productName,
                        image: item.productImage,
                        num: item.num,
                        price: item.productPrice
                    }
                }
            }
        )
        console.log(newRows)
        navigate('submit',{state:{rows: newRows}})
    }

    return (
        <div className="cart-wrapper">
            <div className="table-box">
                <div className="table-header">
                    <div className="checkbox">
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            checked={countSelected === rows.length? true: false}
                            onChange={handleSelectedAll}
                        />
                    </div>
                    <div className="goods-title">商品</div>
                    <div className="amount-title">数量</div>
                    <div className="price-title">单价</div>
                    <div className="total-title">小计</div>
                    <div className="operation-title">操作</div>
                </div>
                <div className="divider"></div>
                <div className="table-body">
                    {
                        rows.map(
                            (row) => 
                            <div key={row.cartId} className="row-box">
                                <div className="table-row">
                                    <div className="checkbox">
                                        <Checkbox
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            checked={row.selected}
                                            onChange={() => handleSelected(row)}
                                        />
                                    </div>
                                    <img className="image-content" src={row.productImage} alt="" />
                                    <div className="goods-content">{row.productName}</div>
                                    <div className="amount-content">
                                        <TextField 
                                            value={row.num} 
                                            type="number"
                                            onChange={(e) => handleChange(row,e)}
                                        />
                                    </div>
                                    <div className="price-content">{row.productPrice}</div>
                                    <div className="total-content">{row.num * row.productPrice}</div>
                                    <div className="operation-content">
                                        <Button onClick={() => removeRow(row)}>删除</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {attention && <div className="attention">暂无商品</div>}
                </div>
                <div className="count-box">
                    <div className="total-price">合计（不含运费）: </div>
                    <div className="number">{totalPrice}</div>
                    <Button 
                        className="pay-btn" 
                        onClick={submit}
                    >
                        结算
                    </Button>
                </div>
            </div>
        </div>
    );
}
