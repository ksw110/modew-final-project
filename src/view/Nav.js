import React, { useState } from "react";
import searchLogo from "../images/main_search.png"
import menuLogo from "../images/main_menu.png"
import { Link } from "react-router-dom";
import "../sources/css/Nav.css";

const Nav = () => {
// 로그인/회원가입 모달창 열림 여부와 입력값을 관리하는 state 변수 설정
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    pw: "",
    name: "",
    birthday: "",
    tel: ""
  });


// 입력값이 변경될 때마다 state 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };  


// 회원가입 폼에서 Submit 버튼 클릭 시 서버로 데이터를 전송
  const handleClick = () => {
    const { email, pw, name, birthday, tel } = inputs;
    const textbox = {
      email,
      pw,
      name,
      birthday,
      tel
    };
    fetch("http://localhost:3002/user", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(textbox),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

// 로그인/회원가입 모달창 열기/닫기 이벤트 핸들러
  const handleLoginClick = (event) => {
    event.preventDefault();
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const handleLoginModalClose = () => {
    setIsLoginOpen(false);
  };

  const handleSignupClick = (event) => {
    event.preventDefault();
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const handleSignupModalClose = () => {
    setIsSignupOpen(false);
  };

// Nav 컴포넌트의 렌더링 결과를 반환
  return (
    <>
    {/* 네비게이션 바 메뉴 */}
      <ul>
        <li>
          <a href="" onClick={handleLoginClick}>
            Login
          </a>
        </li>
        <li>
          <a href="" onClick={handleSignupClick}>
            Sign up
          </a>
        </li>
        <li>
          <a href="">My Page</a>
        </li>
        <li>
          <a href="">My Drive</a>
        </li>
        <li>
          <img src="" />
          <img src={searchLogo} alt="main_search.png" />
        </li>
        <li>
          <img src="" />
          <img src={menuLogo} alt="main_menu.png" />
        </li>
      </ul>
      
    {/* 회원가입 모달창 */}
      {isSignupOpen && (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Sign Up</h3>
          <button onClick={handleSignupModalClose}>X</button>
        </div>
        <div className="modal-body">
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <label htmlFor="pw">Password</label>
            <input
              type="password"
              name="pw"
              value={inputs.pw}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={inputs.birthday}
              onChange={handleChange}
            />
            <label htmlFor="tel">Phone Number</label>
            <input
              type="tel"
              name="tel"
              value={inputs.tel}
              onChange={handleChange}
            />
            <button onClick={handleClick}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )}
</>
);
};

export default Nav;
