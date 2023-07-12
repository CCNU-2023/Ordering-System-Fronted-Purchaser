import { AppBar, Button, Card, Snackbar, TextField} from '@material-ui/core'
import './index.less'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postData } from '../../service/fetch'

export default function Login() {

    const navigate = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isEmail,setIsEmail] = useState(true)
    const [open,setOpen] = useState(false)

    const checkEmail = () => {
        const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z]{2,3})$/
        setIsEmail(isEmail.test(email))
    }

    const handleClose = () => {
        setOpen(false)
    }

    const login = () => {
        if(password==='' || email==='' || !isEmail) {
            setOpen(true)
            return
        }
        postData("/user/login", {
            email: email,
            password: password,
        }).then((data) => {
            console.log(data);
            localStorage.setItem('token',data.data.token);
            if(data.data.identity === 0) {
                navigate('/supplier')
            } else {
                window.location.href = 'http://43.138.31.87:5174/login/'
            }
        });
    };

    const toSupplier = () => {
        window.location.href = 'http://43.138.31.87:5174/login/'
    }

    return (
        <div className='login-wrapper'>
            <AppBar className='header' position='static'>
                <img src='http://rxebx5s7b.bkt.clouddn.com/logo.png' alt="" />
            </AppBar>
            <div className='form-box'>
                <div className='form'>
                    <div className='form-title'>订货王</div>
                    <TextField 
                        className='input-field' 
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={checkEmail}
                        id='outlined-basic' 
                        label="邮箱" 
                        variant='outlined' 
                        error={!isEmail} 
                        helperText={isEmail?'':'邮箱格式有误'}
                    >
                    </TextField>
                    <TextField 
                        className='input-field' 
                        type='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id='outlined-basic' 
                        label="密码" 
                        variant='outlined'
                    >
                    </TextField>
                    <div className='tip' onClick={() => {navigate('/register')}}>没有账号？去注册</div>
                    <div className='btn-box'>
                        <Button 
                            className='login-btn' 
                            variant="outlined" 
                            onClick={login}
                        >
                            登录
                        </Button>
                        <Button 
                            className='login-btn' 
                            variant="outlined" 
                            onClick={toSupplier}
                        >
                            供货商
                        </Button>
                    </div>
                </div>
                <Snackbar 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open} 
                    autoHideDuration={6000} 
                    onClose={handleClose}
                    message="测试"
                >
                </Snackbar>
            </div>
            <div className='intro-box'>
                <div className='intro-box-title'>我们的服务</div>
                <div className='service-list'>
                    <Card className='service-card'>
                        <div className='card-header'>
                            <img src='http://rxebx5s7b.bkt.clouddn.com/plane.png'></img>
                            <div className='card-name'>厂家直销</div>
                        </div>
                        <div className='card-content'>
                            B2B互联网渠道分销管理系统，与源头厂家直接对接
                        </div>
                    </Card>
                    <Card className='service-card'>
                        <div className='card-header'>
                            <img src='http://rxebx5s7b.bkt.clouddn.com/plane.png'></img>
                            <div className='card-name'>零成本入驻</div>
                        </div>
                        <div className='card-content'>
                            供应商成功注册账号即可免费入驻本平台
                        </div>
                    </Card>
                    <Card className='service-card'>
                        <div className='card-header'>
                            <img src='http://rxebx5s7b.bkt.clouddn.com/analysis.png'></img>
                            <div className='card-name'>销售分析</div>
                        </div>
                        <div className='card-content'>
                            将销量分析数据可视化，提供用户评价与反馈
                        </div>
                    </Card>
                    <Card className='service-card'>
                        <div className='card-header'>
                            <img src='http://rxebx5s7b.bkt.clouddn.com/size.png'></img>
                            <div className='card-name'>扩大经营规模</div>
                        </div>
                        <div className='card-content'>
                            通过系统、服务、资源支持企业打造区域联营平台、整合资源共同服务市场
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
