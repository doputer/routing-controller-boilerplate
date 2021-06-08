import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login';

const Login = () => {

  //const NAVER_CLIENT_ID="k6Zo49ffk5DdFP6xZMrb"
  // const naverLogin=()=>{
  //   const login=new window.naver.LoginWithNaverId({
  //     clientId:NAVER_CLIENT_ID,

  //   })
  // }
    

  //url 이동
  const history = useHistory();


  //login창 email, password 값 업데이트
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const { email, password } = login;
  const changeLoginInput = (event) => {
    const { value, name } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  //login 버튼 클릭
  const onSubmit = (event) => {
    event.preventDefault(); //page reload 방지

    if (!email || !password) { 
      alert('이메일 또는 비밀번호를 입력해주세요');
      return;
    }

    //데이터 보내기
    axios
      .post('http://localhost:3000/user/login',{
        
            email:email,
            password:password
        
      })
      .then((res) => {
        console.log(res)
        sessionStorage.setItem('user_name',res.data.nickname);
        history.push('/test');
      })
      .catch((e) => {
        console.log(e);
        if (e.message === 'Request failed with status code 500') {
          alert('아이디가 존재하지 않습니다.');
        }
      });
  };

  //구글 소셜로그인
  const GOOGLE_CLIENT_ID='231282964469-2qoq6mkvrthdhnvl7ijpi0f4oic12osl.apps.googleusercontent.com'

  //네이버 소셜 로그인
  const NAVER_CLIENT_ID='k6Zo49ffk5DdFP6xZMrb'

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmit}
      >
        <label>Email</label>
        <input
          type="email"
          value={email}
          name="email"
          onChange={changeLoginInput}
        />

        <label>pw</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={changeLoginInput}
        />
        <button type="submit">로그인</button>
        </form>

        <br/>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="구글로 로그인"
          onSuccess={(res)=>{
            sessionStorage.setItem('user_name',res.Ft.Ue)
            history.push('/test')
          }}
          onFailure={()=>alert('로그인에러')}
          cookiePolicy={'single_host_origin'}
        />
        <br/>
        <Link to={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}`}>
          네이버로 로그인
        </Link>
        <button>네이버로 로그인</button>
        <Link to="/register">회원가입</Link>
    </div>
  );
};

export default Login;
