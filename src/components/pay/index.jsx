/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import './index.less'
import { Button, Radio } from '@material-ui/core'
import { useLocation } from 'react-router'
import { postData } from '../../service/fetch'
import pay1 from '../../assets/pay1.png'

export default function Pay() {

    const [value,setValue] = useState(1)
    const [orderId,setOrderId] = useState('')
    const [total,setTotal] = useState(0)
    const location = useLocation()

    useEffect(() => {
        console.log(location.state.orderId)
        const newOrderId = location.state.orderId
        const newTotal = location.state.total
        setOrderId(newOrderId)
        setTotal(newTotal)
    },[])

    // 
    const submit = () => {
        postData(`/alipay/order?outTradeNo=${orderId}&subject=${orderId}&totalAmount=${total}&description=${orderId}`).then(
            res => {
                const divForm = document.getElementsByTagName("div");
                console.log(divForm)
                if (divForm.length) {
                    document.body.removeChild(divForm[0]);
                }
                const div = document.createElement("div");
                div.innerHTML = res.data; // data就是接口返回的form 表单字符串
                document.body.appendChild(div);
                document.forms[0].setAttribute("target", "_blank"); // 新开窗口跳转
                document.forms[0].submit();
            }
        )
    }

    return (
        <div className='pay-wrapper'>
            <div className='price-box'>
                <div className='price-box-title'>待付金额: </div>
                <div className='price-box-number'>{total}</div>
                <div className='price-box-unit'>￥</div>
            </div>
            <div className='choice-box'>
                <div className='choice-box-title'>选择支付方式</div>
                <div className='choice-box-content'>
                    <div className='box' onClick={() => setValue(0)}>
                        <Radio checked={value === 0? true : false}/>
                        <img className='pay-icon' src={pay1} alt="" />
                        <div className='box-content'>货到付款</div>
                    </div>
                    <div className='box' onClick={() => setValue(1)}>
                        <Radio checked={value === 1? true : false}/>
                        <img className='pay-icon' src='http://rxebx5s7b.bkt.clouddn.com/alipay.png' alt="" />
                        <div className='box-content'>支付宝</div>
                    </div>
                </div>
            </div>
            <div className='pay-btn-box'>
                <Button className='pay-btn' onClick={submit}>确认支付</Button>
            </div>
        </div>
    )
}
