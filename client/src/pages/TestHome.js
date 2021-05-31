import React from 'react';
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Login from './Login';


const TestHome = () => {
    const [isLogin, setIsLogin]=useState(false);
    const [userName, setUserName]=useState('');
  
    //로그인 성공하면 이름 받아오기
    const onLogin=(userName)=>{
      setUserName(userName)
    }
    
    //리로드를 해줘야 하는가??
    const onLogOut=(event)=>{
      event.preventDefault();
      sessionStorage.removeItem('user_name');
      document.location.href='/'
      console.log('isLogin?',isLogin)
    }
  
    //로그인 상태 확인
    useEffect(()=>{
      console.log(userName);
      if(sessionStorage.getItem('user_name')===null){
        setUserName('');
        setIsLogin(false);
        console.log('isLogin?',isLogin);
      } else{
        setIsLogin(true);
        console.log('isLogin?',isLogin);
      }
    })
    //deps에 isLogin 써줘야되지 않나..
    //리로드하면 세션스토리지에는 정보가 남아있고 home에 이름은 안뜨는데 어떻게 해야하는지?
    
    return (
        <>
            <ul>
                <li>
                    <Link to="/login">login</Link>
                </li>
                <li>
                    <Link to="/test">home</Link>
                </li>
                <button onClick={onLogOut}>로그아웃</button>
            </ul>
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            <Login onLogin={onLogin}/>
                        </Route>
                        <Route exact path="/test">
                            Hello {isLogin? userName:''}
                        </Route>
                    </Switch>
                </Router>
            </div>
        </>
    );
};

export default TestHome;