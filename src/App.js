import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './components/home/Home.component';
import { db } from "./components/firebase";
import HostRoom from './components/host-room/Host-room.component';
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  serverTimestamp,
  getDocs
} from "firebase/firestore";
import { deleteData, findAllUserLogin, findHost } from './components/network/network';
import PopupLoginUser from './components/pop-up-login-user/pop-up-login-user';

const App = () => {
  const [userLogin, setUserLogin] = useState(null)
  const [host, setHost] = useState(null)
  const [message, setMessage] = useState(null)
  const [allUserLogin, setAllUserLogin] = useState([])
  const [isStart, setIsStart] = useState(false)

  const [actions, setActions] = useState([])

  const getHost = async () => {
    const data = await findHost(db)
    setHost(prev => data)
  }

  useEffect(() => {
    getHost()
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "user-login"), snapshot => {
      setAllUserLogin(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
      return () => unsubscribe;
    })
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "actions"), snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })).filter(item => item.actionName = 'start')

      if (data.length > 0) {
        setIsStart(true)
      }

      return () => unsubscribe;
    })
  }, [])



  const getUserLogin = (userLogin) => {
    setUserLogin(prev => userLogin)
  }

  return (
    <div className="App">
      {!isStart && !userLogin && <Home dbCollection={db} onGetUserLogin={getUserLogin} host={host} ></Home>}
      {userLogin && <HostRoom userLogin={userLogin} allUserLogin={allUserLogin} isHost={userLogin && userLogin.isHost} onGetUserLogin={getUserLogin}></HostRoom>}
      <div>
        {isStart && (<div>asds</div>)}
      </div>
      <button onClick={deleteData}>Delete</button>

    </div>
  );
}

export default App;
