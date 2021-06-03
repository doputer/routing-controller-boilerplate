import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Login = ({ onLogin }) => {
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
      .post('http://localhost:3000/user/login', {
        email,
        password,
      })
      //.then(res=>res.json())
      .then((res) => {
        //sessionStorage.setItem('user_email',email)
        //sessionStorage.setItem('user_name',res.data);
        //onLogin(sessionStorage.getItem('user_name'));
        console.log(res.data);
        history.push('/test');
      })
      .catch((e) => {
        console.log(e);
        if (e.message === 'Request failed with status code 500') {
          alert('아이디가 존재하지 않습니다.');
        }
      });
  };

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

        <br />
        <button type="submit">login</button>
      </form>
      <br />
      <button>구글로 로그인</button>
      <br />
      <button>네이버로 로그인</button>
    </div>
  );
};

export default Login;
