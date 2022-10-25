import React, { useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const scrollToTop = () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  })
}

function MyPage3(props) {
  const [pwCheck,setPwCheck] = useState("1");
  const [pw,setPw] = useState("");
  const [pw2,setPw2] = useState("");
  const [error3,setError3] = useState("primary"); // 비밀번호 확인 에러
  const [pwLabel,setPwLabel] = useState("비밀번호 확인"); // 비밀번호 확인 에러


  const change = () => {
    console.log("비밀번호 변경 하러 옴");

    if(pw2 !== pw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
   
    if(pwCheck !== 0) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if(pw.length < 4) {
      alert("비밀번호는 최소 4자리의 숫자 또는 문자로 이루어져야 합니다.")
      return;
    }


    axios.post('http://localhost:3001/userPw', null, {
      params: { 
        email: window.localStorage.getItem("email"),
        pw: pw
      }
    })
      .then(res => {  
        console.log(res.data)
        alert("비밀번호가 변경되었습니다.")
        document.location.href = '/'
      })
      .catch(function(error){
       console.log(error);
    })
  }

  const pwCheck2 = () => {

        if(pw === pw2) { // 0을 받아오면 성공했다는 알람
          console.log(pw);
          console.log("비밀번호 일치");
          setPwLabel("비밀번호 확인")
          setError3("primary");
          setPwCheck(0);
          return;
        }else { // 0이외의 값이라면 실패했다는 알람
          console.log("비밀번호 다름");
          setPwLabel("일치하지 않는 비밀번호")
          setError3("error");
          setPwCheck(1);
          return;
        }
     
  }


  useEffect(()=>{
    pwCheck2();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pw2])




  return (
    <div id="bigContainer">
      <div id="sideLeft">
        <ul className="sidebarList2">
          <a className="href2" href="QnAKnowledge">
            {" "}
            <li className="sidebarListItem2 active">내 정보</li>
          </a>
          &nbsp;
          <a className="href2" href="QnADesignated">
            <li className="sidebarListItem2">활동 리스트</li>
          </a>
          &nbsp;
          <a className="href2" href="QnAQuestion">
            <li className="sidebarListItem2">지정헌혈 현황</li>
          </a>
          <br></br>
          <button id="top" onClick={scrollToTop} type="button">
            {" "}
            Top
          </button>
        </ul>
      </div>
      <div className="container">
        <h1 className="sidebarTitle">마이페이지</h1>
        <span align="center" className="hello">
          사용자 계정을 확인 및 수정할 수 있는 공간입니다.
        </span>
        <hr />
        <div align="center">
          <p>
            <Box 
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
             
              <TextField
                id="outlined-basic"
                label="비밀번호"
                type="password"
                variant="outlined"
                onChange={(event) => setPw(event.target.value)}
              /><br></br>
              <TextField
                id="outlined-basic"
                label={pwLabel}
                type="password"
                variant="outlined"
                color={error3}
                onChange={(event) => setPw2(event.target.value)}
              /><br></br>
             
            </Box>
            
          </p>
          <Button2 onClick={change}>비밀번호 변경</Button2>
        </div>
      </div>
    </div>
  );
}



export default MyPage3;


const Button2 = styled.button`
&:hover{
  background: #555;
  color: #fff;
  border: none;
}
background: #000;
color: #fff;
border: none;
font-size: large;
margin-bottom:6%;
`;

// const Radio = styled.input.attrs((props) => ({
//   type: "radio",
//   size: props.size || "1em",
// }))`
  
//   width:1.25em;
//   height:1.25em;
  
// `;