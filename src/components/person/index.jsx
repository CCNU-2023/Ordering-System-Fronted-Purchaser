/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './index.less'
import { Button, TextField } from '@material-ui/core'
import { getJson, getToken, postData } from '../../service/fetch'
import * as qiniu from 'qiniu-js'
import { nanoid } from 'nanoid'

export default function Person() {

    // const [info, setInfo] = useState({})
    const [token,setToken] = useState('')
    const [pic,setPic] = useState('')
    const [edit,setEdit] = useState(false)
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')

    useEffect(() => {
        getJson('/user/info').then(
            res => {
                // setInfo(res.data)
                setAddress(res.data.address)
                setName(res.data.name)
                setEmail(res.data.email)
                setPhone(res.data.phone)
                setPic(res.data.certificate_image)
            }
        )
        getToken().then(
            res => {
                console.log(res.data.token)
                setToken(res.data.token)
            }
        )
    }, [])

    const changeInfo = () => {
        if(edit) {
            postData('/user/info',{
                name: name,
                email: email,
                address: address,
                phone: phone
            }).then(
                res => {
                    console.log(res.data)
                }
            )
        }
        setEdit(edit => !edit)
    }

    const selectImage = (e) => {
        const files = e.target.files
        /*  console.log(files) */
        if (!files) {
            return
        }//检测是否有图片
        const file = files[0]
        const key = file.name + nanoid(10)
        // const key= files[0].name
        // setFilename(key);
        // setFile(files[0])
        /* console.log(files[0]) */
        // let newPic = URL.createObjectURL(file)//获取url放在img用于预览图片
        /* setmsg({...msg,avatar}) */
        /*  console.log('pix'+pic); */
        //上传
        const putExtra = {}
        const config = {
            useCdnDomain: true,
            region: qiniu.region.cnEast2
        }
        const observable = qiniu.upload(files[0], key, token, putExtra, config)

        const observer = {
            next(res) {
                // ...
            },
            // eslint-disable-next-line no-unused-vars
            error(err) {
                // ...
                //   console.log(err);
                alert("选择失败，请再次选择头像");
            },
            complete(res) {
                /*  const avatar_url = "http://ossfresh-test.muxixyz.com/" + res.key
         */        /*  setmsg({...msg,avatar}) */
                /*  console.log(res) */
                console.log(res)
                setPic('http://orderpal.muxixyz.com/'+ res.key)
                postData('/user/info',{
                    certificate_image: 'http://orderpal.muxixyz.com/'+ res.key
                }).then(
                    res => {
                        console.log(res.data)
                    }
                )
            }
        }

        const subscription = observable.subscribe(observer)
    }

    return (
        <div className='person-wrapper'>
            <div className='person-info-box'>
                <div className='box1'>
                    <label className='box1-image' htmlFor='select1'>
                        <img src={pic} />
                        <input id='select1' className='change-image' onChange={(e) => selectImage(e)} type="file" accept='/image*' />
                    </label>
                    <div className='box1-info'>
                        {
                            edit
                            ?<div className='box1-info-name'>
                                <TextField type='text' value={name} onChange={(e) => setName(e.target.value)}></TextField>
                            </div>
                            :<div className='box1-info-name'>{name}</div>
                        }
                        {
                            edit
                            ?<div className='box1-info-email'>
                                <TextField type='text' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                            </div>
                            :<div className='box1-info-email'>{email}</div>
                        }
                        <input id='select2' className='change-image ' onChange={(e) => selectImage(e)} type="file" accept='/image*' />
                        <div className='btn-box'>
                            <label className='btn-label' htmlFor="select2">上传</label>
                            <Button className='change-info-btn' onClick={changeInfo}>{edit? '完成' : '修改信息'}</Button>
                        </div>
                    </div>
                </div>
                <div className='box2'>
                    <div className='phone'>
                        <div className='title'>联系电话:&nbsp;&nbsp;</div>
                        {
                            edit
                            ?<div className='content'>
                                <TextField value={phone} onChange={(e) => setPhone(e.target.value)}></TextField>
                            </div>
                            :<div className='content'>{phone}</div>

                        }
                    </div>
                    <div className='area'>
                        <div className='title'>地区:&nbsp;&nbsp;</div>
                        {
                            edit
                            ?<div className='content'>
                                <TextField value={address} onChange={(e) => setAddress(e.target.value)}></TextField>
                            </div>
                            :<div className='content'>{address}</div>

                        }
                    </div>
                    <div className='address'>
                        <div className='title'>收货地址:&nbsp;&nbsp;</div>
                        {
                            edit
                            ?<div className='content'>
                                <TextField value={address} onChange={(e) => setAddress(e.target.value)}></TextField>
                            </div>
                            :<div className='content'>{address}</div>

                        }
                    </div>
                </div>
            </div>
            <div className='other-info-box'>
                <div className='orders-box'>
                    <div className='title'>订单信息</div>
                    <div className='orders-info-box'>
                        <div className='item-box'>
                            <div className='item-box-title'>待付款&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div className='content'>3</div>
                        </div>
                        <div className='item-box'>
                            <div className='item-box-title'>待发货&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div className='content'>3</div>
                        </div>
                        <div className='item-box'>
                            <div className='item-box-title'>待收货&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div className='content'>3</div>
                        </div>
                        <div className='item-box'>
                            <div className='item-box-title'>退款中&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div className='content'>3</div>
                        </div>
                        <div className='item-box'>
                            <div className='item-box-title'>待评价&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div className='content'>3</div>
                        </div>
                    </div>
                </div>
                <div className='trade-box'>
                    <div className='title'>交易信息</div>
                    <div className='trade-info-box'>
                        <div className='title-box'>
                            <div className='title1'>供应商</div>
                            <div className='title2'>交易额</div>
                        </div>
                        <div className='item-box'>
                            <div className='item-box-title'>好丽友</div>
                            <div className='price'>123465789123</div>
                        </div>
                        <div className='item-box'>
                            <div className='item-box-title'>小鸡仔</div>
                            <div className='price'>12346578</div>
                        </div>
                        <div className='item-box'>
                            <div className='item-box-title'>好丽友</div>
                            <div className='price'>123465789123</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
