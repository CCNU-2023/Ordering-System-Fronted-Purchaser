import React, { useEffect, useState } from 'react'
import './index.less'
import { AppBar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase, TextField, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
// import pic1 from '../../assets/pic1.jpg'
// import pic2 from '../../assets/pic2.jpg'
// import pic3 from '../../assets/pic3.jpg'
// import pic4 from '../../assets/pic4.jpg'
// import pic5 from '../../assets/pic5.jpg'
// import pic6 from '../../assets/pic6.jpg'
import { getJson, postData } from '../../service/fetch';
import { useNavigate } from 'react-router';



// eslint-disable-next-line react/prop-types
const SupplierCard = ({ id, name, pic }) => {

    const [open, setOpen] = React.useState(false);
    const [code, setCode] = React.useState('')
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        postData(`/purchaser/ifcoop?supplier_id=${id}`).then(
            res => {
                if(res.data.status === 0) {
                    setOpen(true)
                } else {
                    localStorage.setItem('supplier_id',id)
                    navigate('/home/market')
                }
            }
        )
    }

    const subscribe = () => {
        postData('/purchaser/auth_code',{
            supplier_id: id,
            code: code
        }).then(
            res => {
                console.log(res.data)
                localStorage.setItem('supplier_id',id)
                navigate('/home/market')
                // TODO success navigate
                // TODO fail message code error
            }
        )
    }

    const toDetail = () => {
        // TODO 查看供货商详情
        navigate('/supplier/detail',{state:{id:id}})
    }

    return (
        <>
            <Card className='card-box'>
                <CardActionArea onClick={toDetail}>
                    <CardMedia
                        className='img-box'
                        image={pic}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            成立于1956年的（株）好丽友是韩国三大制果企业之一。
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={toDetail}>
                        详情
                    </Button>
                    <Button size="small" color="primary" onClick={handleClick}>
                        选择
                    </Button>
                </CardActions>
            </Card>
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">订阅</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            还未与改供货商建立关联，请输入邀请码！
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="邀请码"
                            value={code}
                            type="text"
                            onChange={(e) => setCode(e.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={subscribe} color="primary">
                            加盟
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}


export default function Supplier() {

    // const [pics, setPics] = useState([
    //     pic1, pic2, pic3, pic4, pic5, pic6
    // ])

    const [rows, setRows] = useState([])

    useEffect(() => {
        getJson(`/admin/all_info?identity=${1}&status=${1}&page=${0}&size=${10}`).then(
            res => {
                console.log(res.data)
                setRows(res.data? res.data : [])
            }
        )
    }, [])

    return (
        <div className='supplier-wrapper'>
            <AppBar className='header' position='static'>
                <img src='http://rxebx5s7b.bkt.clouddn.com/logo.png' alt="Ordering Hub" />
            </AppBar>
            <div className='search-wrapper'>
                <div className='wrapper-title'>选择一个供应商进行了解</div>
                <div className='search-field'>
                    <InputBase
                        className='input-box'
                        placeholder="搜索供应商"
                    />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>
                <Button className='search-button'>搜索关键词</Button>
            </div>
            <div className='cards-wrapper'>
                {rows.map(
                    (row, index) => <SupplierCard key={index + 'a'} id={row.id} name={row.name} pic={row.logo} />
                )}
            </div>
        </div>
    )
}
