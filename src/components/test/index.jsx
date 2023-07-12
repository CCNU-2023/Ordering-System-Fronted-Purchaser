import { useEffect, useState } from "react";
import "./index.less";
import { getJson, postData } from "../../service/fetch";

function Test() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [identify, setIdentify] = useState("");
  const [address, setAdderss] = useState("");
  const [ccode, setCcode] = useState("");
  const [logo, setLogo] = useState("");
  const [cimage, setCimage] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (count === 0) {
      const randomNum = 10 + Math.random() * 200;
      setCount(randomNum);
    }
  }, [count]);

  const signUp = () => {
    postData("/user/register", {
      email: email,
      password: password,
      code: code,
      identity: identify,
    }).then((data) => {
      console.log(data);
      localStorage.setItem('token',data.data.token);
    });
  };

  const signIn = () => {
    postData("/user/login", {
      email: email,
      password: password,
    }).then((data) => {
      console.log(data);
      localStorage.setItem('token',data.data.token);
    });
  };

  async function getCode() {
    postData('/user/verify',{
      email: email
    }).then(
      data => {
        console.log(data)
      }
    )
  }

  const getUserInfo = () => {
    getJson("/user/info").then((data) => {
      console.log(data);
    });
  };

  const changeInfo = () => {
    postData("/user/info", {
      address: address,
      certificate_code: ccode,
      logo: logo,
      certificate_image: cimage,
      phone: phone,
    }).then((data) => {
      console.log(data);
    });
  };

  const getUserInfoAdmin = () => {
    getJson(`/admin/info?id=${6}`).then((data) => {
      console.log(data);
    });
  }

  const getAllInfoAdmin = () => {
    getJson(`/admin/all_info?identity=${0}&statu=${0}&page=${1}&size=${10}`).then((data) => {
      console.log(data);
    });
  }


  return (
    <div className="box">
      <button onClick={() => setCount(0)}>{count}</button>

      <div className="form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="输入邮箱"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="输入密码"
        />
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="输入验证码"
        />
        <input
          type="text"
          value={identify}
          onChange={(e) => setIdentify(e.target.value)}
          placeholder="0:商家 1:供货商"
        />
      </div>

      <div className="btn">
        <button onClick={getCode}>获取验证码</button>
        <button onClick={signUp}>注册</button>
        <button onClick={signIn}>登录</button>
        <button onClick={getUserInfo}>获取用户信息</button>
      </div>

      <div className="form">
        <input
          type="text"
          value={address}
          onChange={(e) => setAdderss(e.target.value)}
          placeholder="输入地址"
        />
        <input
          type="text"
          value={ccode}
          onChange={(e) => setCcode(e.target.value)}
          placeholder="输入验证码"
        />
        <button onClick={getCode}>获取验证码</button>
        <input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          placeholder="输入logo"
        />
        <input
          type="text"
          value={cimage}
          onChange={(e) => setCimage(e.target.value)}
          placeholder="输入营业执照"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="输入手机号"
        />
      </div>
      <button onClick={changeInfo}>修改用户信息</button>
      <button onClick={getUserInfoAdmin}>管理员获取用户信息</button>
      <button onClick={getAllInfoAdmin}>管理员获取某类用户信息</button>
    </div>
  );
}

export default Test;
