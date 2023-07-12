/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './index.less'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, TextField, Typography } from '@material-ui/core'
// import pic1 from '../../assets/pic1.jpg'
// import pic2 from '../../assets/pic2.jpg'
// import pic3 from '../../assets/pic3.jpg'
// import pic4 from '../../assets/pic4.jpg'
// import pic5 from '../../assets/pic5.jpg'
// import pic6 from '../../assets/pic6.jpg'
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router'
import { getJson, postData } from '../../service/fetch'
import { message } from 'antd';


const GoodsCard = (props) => {

    // eslint-disable-next-line react/prop-types
    const {row} = props
    const navigate = useNavigate()

    const [count,setCount] =  useState(0)

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

    const putToCart = () => {
        if(count <= 0) {
            message.error({
                content: '数量不能为0!',
                duration: 3
            })
            return
        }
        postData(`/cart/add?supplier_id=${row.supplierId}`,{
            code: row.code,
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

    return (
        <Card className='card-box'>
        <CardActionArea onClick={() => navigate('goods',{state:{code: row.code}})}>
            <CardMedia
                className='img-box'
                image={row.picture}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                    {row.name}
                </Typography>
                <div className='goods-content'>
                    {row.description}
                </div>
            </CardContent>
        </CardActionArea>
        <CardActions className='card-action'>
            <div className='total-price'>{count * row.order_price}</div>
            <div>/</div>
            <div className='single-price'>{row.order_price}</div>
            <IconButton onClick={removeGoods}>
                <RemoveIcon></RemoveIcon>
            </IconButton>
            <TextField 
                className='input-field' 
                value={count} 
                onChange={e => setCount(e.target.value)}
            />
            <IconButton onClick={addGoods}>
                <AddIcon></AddIcon>
            </IconButton>
            <Button size='small' color='primary' onClick={putToCart}>订购</Button>
        </CardActions>
    </Card>
    )
} 

export default function Market() {

    // const [pics,setPics] = useState([
    //     pic1,pic2,pic3,pic4,pic5,pic6
    // ])

    const [rows,setRows] = useState([])
    const navigate = useNavigate()
    const [attention,setAttention] = useState(false)

    useEffect(() => {
        const supplier_id = localStorage.getItem('supplier_id')
        if(!supplier_id){
            navigate('/supplier')
        }
        getJson(`/product/purchaser/info?supplier_id=${supplier_id}&page=${1}`).then(
            res => {
                console.log(res.data)
                if(res.data.length === 0) setAttention(true)
                setRows(res.data)
            }
        )
    },[])

    return (
        <div className='market-wrapper'>
            <div className='rank-box'>
                <div className='rank-box-name'>综合排序</div>
                <div className='price'>
                    <div className='price-name'>价格</div>
                    <img className='icon' src="" alt="" />
                </div>
                <div className='sales'>
                    <div className='sales-name'>销量</div>
                    <img className='icon' src="" alt="" />
                </div>
            </div>
            {rows.length > 0 && <div className='goods-box'>
                {/* {pics.map(
                    (pic,index) => <GoodsCard key={index+'a'} pic={pic}/>
                )}
                {pics.map(
                    (pic,index) => <GoodsCard key={index+'b'} pic={pic}/>
                )} */}
                {
                    rows.map(
                        (row,index) => <GoodsCard key={index+'a'} row={row}/>
                    )
                }
                {/* <div className='pagination'>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </div> */}
            </div>}
            {
                attention && <div className='attention'>暂无商品供应</div>
            }
            {/* <div className='back'>
                <img src='http://rxebx5s7b.bkt.clouddn.com/back.png' onClick={() => navigate('/supplier')} alt="" />
            </div> */}
        </div>
    )
}
