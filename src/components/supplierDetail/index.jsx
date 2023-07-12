import { useState } from 'react'
import './index.less'
import { Button, TextField } from '@material-ui/core'
import { useLocation, useNavigate } from 'react-router'
import { postData } from '../../service/fetch'

export default function SupplierDetail() {

    const [code,setCode] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const submit = () => {
        postData('/purchaser/auth_code',{
            supplier_id: location.state.id,
            code: code
        }).then(
            res => {
                console.log(res.data)
                localStorage.setItem('supplier_id',location.state.id)
                navigate('/home/market')
                // TODO success navigate
                // TODO fail message code error
            }
        )
    }

    return (
        <div className='supplier-detail-wrapper'>
            <div className='header-box'>
                <div className='box1'>
                    {/* <div className='box1-title'>供应商名称</div>
                    <div className='box1-name'>巨能造电器有限公司</div>
                    <div className='box1-content'>本公司成立于1956年，在不断变革的科技世界中，我们以创新引领的态度，致力于将电器与美学完美融合。我们的使命是为客户提供卓越的电器产品和解决方案，通过精心设计和卓越性能，为用户带来无与伦比的使用体验。</div> */}
                </div>
            </div>
            <div className='content-box'>
                <div className='content-box-title'>
                    我们的产品
                </div>
                <div className='product-box'>
                    <img src="http://rx3wjdm68.bkt.clouddn.com/laundrymachine.jpeg" alt="" />
                    <img src="http://rx3wjdm68.bkt.clouddn.com/phone.png" alt="" />
                    <img src="http://rx3wjdm68.bkt.clouddn.com/refridgerator.jpg" alt="" />
                    <img src="http://rx3wjdm68.bkt.clouddn.com/tv.jpeg" alt="" />
                    <img src="http://rx3wjdm68.bkt.clouddn.com/airconditioner.jpeg" alt="" />
                </div>
                <div className='code-box'>
                    <div className='code-box-title'>邀请码: </div>
                    <TextField 
                        className='input-field' 
                        variant='outlined' 
                        id='outlined-basic' 
                        label='邀请码'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    >
                    </TextField>
                    <Button className='submit' onClick={submit}>确定</Button>
                </div>
                <div className='tips-box'>
                    <div className='tips-content'>tips: 请联系我们获取邀请码</div>
                    <div className='contack-box'>
                        <div className='phone'>电话：13456257981</div>
                        <div className='email'>邮箱：4137379@qq.com</div>
                    </div>
                </div>
                <div className='back'>
                    <img src='http://rxebx5s7b.bkt.clouddn.com/back.png' onClick={() => navigate('/supplier')} alt="" />
                </div>
            </div>
        </div>
    )
}
