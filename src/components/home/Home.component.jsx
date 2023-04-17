import React, { useState, useEffect } from "react";
import { homeicon } from "../../assets/home/index";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  serverTimestamp
} from "firebase/firestore";
import { findAllUserLogin } from "../network/network";

const Home = (props) => {

  const [userName, setUsername] = useState(null);

  const handleInputUsername = (event) => {
    setUsername(event.target.value)
  };

  const getAllUserLogin = async () => {
    return await findAllUserLogin(props.dbCollection)
  }

  const joinGameHost = async (event) => {

    event.preventDefault();

    if (userName.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const prepareData = {
      userName: userName,
      createdAt: serverTimestamp(),
      isHost: true,
      role: null
    }

    const allUser = await getAllUserLogin()

    if (allUser.find(item => item.userName === prepareData.userName)) {
      alert("Trùng tên rồi má!");
      return;
    }

    if (allUser.find(item => item.isHost === prepareData.isHost)) {
      alert("Có host rùi má ui, chọn cái còn lại đi!!");
      return;
    }

    const test = await addDoc(collection(props.dbCollection, "user-login"), prepareData).then(res => {
      props.onGetUserLogin({
        ...prepareData,
        id: res.id
      });
      console.log('sucess')
    })

  };

  const joinGameNormal = async (event) => {

    event.preventDefault();

    if (userName.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const prepareData = {
      userName: userName,
      createdAt: serverTimestamp(),
      isHost: false,
      role: null
    }

    const allUser = await getAllUserLogin()

    if (allUser.find(item => item.userName === prepareData.userName)) {
      alert("Trùng tên rồi má!");
      return;
    }

    const test = await addDoc(collection(props.dbCollection, "user-login"), prepareData).then(res => {
      props.onGetUserLogin({
        ...prepareData,
        id: res.id
      });
      console.log('sucess')
    })

  };

  return (
    <div
    >
      <h1>Hello mấy ông bà già!</h1>
      <img
        style={{
          width: "300px",
        }}
        src={homeicon}
        alt=""
      />
      <br />
      <div className="mb-3">
        <input
          placeholder="Nhập tên đi ông bà già"
          type="email"
          className="form-control"
          onChange={handleInputUsername}
          id="username"></input>
      </div>
      <br />
      <button onClick={joinGameHost} type="button" disabled={props.host && props.host.length > 0 && true} className="btn btn-warning">
        Trưởng phòng
      </button>
      <br />
      <button onClick={joinGameNormal} type="button" className="btn btn-success">
        Vào game có sẵn
      </button>
    </div>
  );
};

export default Home;
