import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Resister = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [registerInput, setRegisterInput] = useState({
    nickname: '',
    email: '',
    password: '',
    pwCheck: '',
  });
  const { nickname, email, password, pwCheck } = registerInput;

  //setting input
  const changeRegisterInput = (event) => {
    const { value, name } = event.target;
    setRegisterInput({
      ...registerInput,
      [name]: value,
    });
  };

  const history = useHistory();

  //submit
  //왜 함수로 안묶어줘도 되는거지?
  const onRegisterSubmit = (event) => {
    event.preventDefault();

    //빈칸 확인
    if (!nickname || !email || !password || !pwCheck) {
      alert('비어있는 칸이 있습니다.');
      return;
    }

    //check password
    if (password !== pwCheck) {
      return alert('비밀번호가 다릅니다?'); //message 뭐라고 쓰지
    }

    //server 전송
    //form에 있는데 주소 명시해줘야 하나?
    axios
      .post('http://localhost:3000/user/register', {
        nickname,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        history.push('/login');
      })
      .catch((e) => console.log(e));
  };

  //인증번호 입력창
  const showAuth = (event) => {
    event.preventDefault();
    setIsAuth(true);
  };
  const closeAuth = (event) => {
    event.preventDefault();
    alert('인증되었습니다.');
    setIsAuth(false);
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
      <h2>회원가입</h2>

      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onRegisterSubmit}
      >
        <label>nickname</label>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={changeRegisterInput}
        />

        <label>이메일 주소</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={changeRegisterInput}
        />
        <button type="button" onClick={showAuth}>
          인증
        </button>
        {isAuth && (
          <>
            <label>인증번호</label>
            <input type="text" />
            <button type="button" onClick={closeAuth}>
              확인
            </button>
          </>
        )}

        <label>비밀번호 등록</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={changeRegisterInput}
        />

        <label>비밀번호 확인</label>
        <input
          type="password"
          name="pwCheck"
          value={pwCheck}
          onChange={changeRegisterInput}
        />

        <button type="submit" style={{ marginTop: '20px' }}>
          회원 가입하기
        </button>
      </form>
    </div>
  );
};

export default Resister;
