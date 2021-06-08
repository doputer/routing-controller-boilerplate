import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Resister = () => {
  
  const [registerInput, setRegisterInput] = useState({
    nickname: '',
    email: '',
    password: '',
    pwCheck: '',
  });
  const { nickname, email, password, pwCheck } = registerInput;

  //setting input
  const changeRegisterInput = event => {
    const { value, name } = event.target;
    setRegisterInput({
      ...registerInput,
      [name]: value,
    });
  };

  const history = useHistory();

  //submit
  //왜 함수로 안묶어줘도 되는거지?
  const [isAuth, setIsAuth]=useState(false);
  const onRegisterSubmit = (event) => {
        event.preventDefault();
        
        if(!isAuth) return alert('인증되지 않은 이메일입니다.');

        //server 전송
        //form에 있는데 주소 명시해줘야 하나?
        axios.post('http://localhost:3000/user/register',{
            nickname:nickname,
            email:email,
            password:password
        }).then(res=>{
            console.log(res.data);
            history.push('/login');
        }).catch((e)=>console.log(e))
    }

    //인증번호 입력
    const [isAuthInput, setIsAuthInput] = useState(false);
    const [authNumInput,setAuthNumInput]=useState('');
    const changeAuthNum=(event)=>{
        setAuthNumInput(event.target.value);
    }
    
    //인증번호 입력창
    const [isExpired, setIsExpired]=useState(false);
    const [isRunning,setIsRunning]=useState(false);
    const [authNum,setAuthNum]=useState('')
    
    const sendAuth=(event)=>{
        event.preventDefault();
        setIsAuthInput(true);
        setIsExpired(false);
        setIsRunning(true);
        setMinutes(10);
        setSeconds(10);
        axios.post('/user/emailAuth',{
            email
        })
        .then(res=>{
            console.log(res)
            //setAuthNum(res);
        })
        .catch((e)=>{
            console.log(e)
            alert('서버통신오류')
        });
    }
    
    useEffect(()=>{
        if (!isRunning) return;
        const timer=setTimeout(()=>{
            setIsExpired(true);
            setIsRunning(false);
            return (alert('인증시간 만료'));
        },10300) //5분: 300000ms, 0이 뜨기 전 만료 버그때문에 0.3초 늘림

        return ()=>clearInterval(timer);
    },[isRunning])

    const confirmAuth=(event)=>{
        event.preventDefault();
        // axios.post('/user/emailAuth',{
        //     params:{
        //         authNum:authNumInput
        //     }
        // })
        // .then(res=>{
        //     alert('인증되었습니다.');
        //     setIsAuth(false);
        // })
        // .catch((e)=>{
        //     console.log(e);
        //     alert('인증코드 불일치');
        // })
        // .finally(()=>{
        //     setAuthNum('');
        //     setIsExpired(false);
        //     setIsRunning(false);
        // })
        if (authNum===authNumInput){
            alert('인증되었습니다');
            setIsAuthInput(false);
            setIsAuth(true);
        }else{
            alert('인증코드 불일치')
        }
        setAuthNum('');
        setIsExpired(false);
        setIsRunning(false);
    }

    //timer
    const [minutes,setMinutes]=useState(0);
    const [seconds, setSeconds]=useState(10);
    useEffect(()=>{
        //if (!isRunning) return
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
              setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
              if (parseInt(minutes) === 0) {
                  clearInterval(countdown);
              } else {
                setMinutes(parseInt(minutes) - 1);
                setSeconds(59);
              }
            }
          }, 1000);
          return () => clearInterval(countdown);
    },[minutes,seconds])


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

            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onRegisterSubmit}>
                <label>nickname</label>
                <input type="text" name="nickname" value={nickname} onChange={changeRegisterInput}/>
                
                <br/>

                <label>이메일 주소</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={changeRegisterInput}
                />
                <button 
                    type="button" 
                    onClick={sendAuth}
                >
                    {isExpired? '재인증':'인증하기'}
                </button>
                {
                    isAuthInput && (
                        <form>
                            <label>인증번호</label> 
                            <span>
                                {minutes}:{seconds<10? `0${seconds}`:seconds}
                            </span>
                            <input 
                                type="text" 
                                value={authNumInput} 
                                onChange={changeAuthNum} 
                                disabled={isExpired? true:false}/>
                            { 
                                !isExpired &&
                                <button 
                                    type="submit" 
                                    onClick={confirmAuth}
                                >
                                    확인
                                </button>
                            }
                        </form>
                    )
                }
                
                <br/>

        <label>비밀번호 등록</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={changeRegisterInput}
        />

        <br />

        <label>비밀번호 확인</label>
        <input
          type="password"
          name="pwCheck"
          value={pwCheck}
          onChange={changeRegisterInput}
        />

        <br />

        <button type="submit" style={{ marginTop: '20px' }}>
          회원 가입하기
        </button>
      </form>
    </div>
  );
};

export default Resister;
