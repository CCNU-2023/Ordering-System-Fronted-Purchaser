import { AppBar, Button, Card, FormControl, FormControlLabel, Radio, RadioGroup, Snackbar, TextField} from '@material-ui/core'
import './index.less'
import { useState } from 'react'
import { postData } from '../../service/fetch'
import { useNavigate } from 'react-router'

export default function Register() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [code,setCode] = useState('')
    const [identity,setIdentity] = useState(0)
    const [isEmail,setIsEmail] = useState(true)
    const [open,setOpen] = useState(false)

    const navigate = useNavigate()

    const checkEmail = () => {
        const isEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-]{2,})+(.[a-zA-Z]{2,3})$/
        setIsEmail(isEmail.test(email))
    }

    const getCode = () => {
        if(email===''||!isEmail){
            return
        }
        postData('/user/verify',{
            email: email
        }).then(
            data => {
                console.log(data)
            }
        )
    }

    const handleClose = () => {
        setOpen(false)
    }

    const register = () => {

        if(password==='' || email==='' || code==='' || !isEmail){
            setOpen(true)
            return
        }

        postData("/user/register", {
            email: email,
            password: password,
            code: code,
            identity: identity,
        }).then((data) => {
            console.log(data);
            localStorage.setItem('token',data.data.token);
            if(identity === 0) {
                navigate('/supplier')
            } else {
                window.location.href = 'http://43.138.31.87:5174/login/'
            }
        });
    }

    return (
        <div className='register-wrapper'>
            <AppBar className='header' position='static'>
                <img onClick={() => navigate('/login')} src={'http://rxebx5s7b.bkt.clouddn.com/logo.png'} alt="Ordering Hub" />
            </AppBar>
            <div className='form-box'>
                <div className='form'>
                    <div className='form-title'>订货王</div>
                    <TextField 
                        className='input-field' 
                        type='email'  
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={checkEmail}
                        label="邮箱" 
                        variant='outlined' 
                        error={!isEmail} 
                        helperText={isEmail?'':'邮箱格式错误'}
                    >
                    </TextField>
                    <TextField 
                        className='input-field' 
                        type='password'  
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label="密码" 
                        variant='outlined'
                    > 
                    </TextField>
                    <FormControl id='radio-box' component="fieldset">
                        <div className='radio-title'>身份</div>
                        <RadioGroup 
                            className='radio-group' 
                            value={identity}
                            onChange={e => setIdentity(e.target.value)}
                            aria-label="gender" 
                            name="gender1" 
                            row 
                        >
                            <FormControlLabel value="0" control={<Radio />} label="商家" />
                            <FormControlLabel value="1" control={<Radio />} label="供货商" />
                        </RadioGroup>
                    </FormControl>
                    <div className='code-box'>
                        <TextField 
                            className='code-box-field' 
                            type='text' 
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            id='outlined-basic' 
                            label="验证码" 
                            variant='outlined'
                        >
                        </TextField>
                        <Button 
                            className='get-code-btn' 
                            color='primary' 
                            variant='outlined'
                            onClick={getCode}
                        >
                            获取验证码
                        </Button>
                    </div>
                    <Button className='register-btn' variant="outlined" onClick={register} >注册</Button>
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
