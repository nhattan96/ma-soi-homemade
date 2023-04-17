import React, { useEffect, useState } from "react";

import {
    addDoc,
    collection,
    query,
    orderBy,
    onSnapshot,
    limit,
    serverTimestamp,
    doc
} from "firebase/firestore";
import PopupLoginUser from "../pop-up-login-user/pop-up-login-user";
import { findAllUserLogin, updateRole } from "../network/network";
import { Role } from "../common/common";
import { db } from "../firebase";


const HostRoom = (props) => {
    const minUsers = 7
    const maxUsers = 10

    const [totalThuongDan, setTotalThuongDan] = useState(1)
    const [totalSoi, setTotalSoi] = useState(1)
    const [totalBaoVe, setTotalBaoVe] = useState(1)
    const [totalBanSoi, setTotalBanSoi] = useState(1)
    const [totalPhuThuy, setTotalPhuThuy] = useState(1)
    const [totalThoSan, setTotalThoSan] = useState(1)
    const [totalTienTri, setTotalTienTri] = useState(1)

    const [totalRoleSelected, setTotalRoleSelected] = useState(0)

    useEffect(() => {
        debugger

        const unsubscribe = onSnapshot(doc(db, "user-login", props.userLogin.id ? props.userLogin.id : props.allUserLogin.find(item=>item.data.userName === props.userLogin.userName).id), snapshot => {
            props.onGetUserLogin(snapshot.data())
        })
        return () => unsubscribe;

    }, [])

    useEffect(() => {
        setTotalRoleSelected(prev => +totalThuongDan + +totalSoi + +totalBaoVe + +totalBanSoi + +totalPhuThuy + +totalThoSan + +totalTienTri)
    }, [totalThuongDan, totalSoi])

    var gen_nums = [];

    function in_array(array, el) {
        for (var i = 0; i < array.length; i++)
            if (array[i] == el) return true;
        return false;
    }

    function get_rand(array) {
        var rand = array[Math.floor(Math.random() * array.length)];
        if (!in_array(gen_nums, rand)) {
            gen_nums.push(rand);
            return rand;
        }
        return get_rand(array);
    }

    const handleStartGame = async () => {
        const allUser = await findAllUserLogin()

        for (let index = 0; index < allUser.length; index++) {
            const role = get_rand(Role)
            updateRole(allUser[index].id, role.role)
        }


    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>

            {
                !props.userLogin?.role && (

                    <div>
                        <PopupLoginUser allUser={props.allUserLogin}></PopupLoginUser>
                        {
                            props.isHost && <div>
                                <div>Tổng role: {totalRoleSelected} </div>
                                <hr />
                                <div>
                                    <label className="form-label">Thường dân</label>
                                    <select onChange={e => {
                                        setTotalThuongDan(prev => {
                                            // setTotalRoleSelected(prev => totalThuongDan + totalSoi + totalBaoVe + totalBanSoi + totalPhuThuy + totalThoSan + totalTienTri)
                                            return e.target.value
                                        })
                                    }}
                                        className="form-select" aria-label="Thường dân">
                                        <option selected value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3">4</option>
                                    </select>
                                </div>
                                <br />
                                <label className="form-label">Sói</label>
                                <select onChange={e => {
                                    setTotalSoi(e.target.value)
                                }} className="form-select" aria-label="Sói">
                                    <option selected value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                                <br />
                                <label className="form-label">Bảo vệ</label>
                                <select onChange={e => {
                                    setTotalBaoVe(e.target.value)
                                }} className="form-select" aria-label="Bảo vệ">
                                    <option value="1">1</option>
                                </select>
                                <br />
                                <label className="form-label">Bán sói</label>
                                <select onChange={e => {
                                    setTotalBanSoi(e.target.value)
                                }} className="form-select" aria-label="Bán sói">
                                    <option value="1">1</option>
                                </select>
                                <br />
                                <label className="form-label">Phù thủy</label>
                                <select onChange={e => {
                                    setTotalPhuThuy(e.target.value)
                                }} className="form-select" aria-label="Phù thủy">
                                    <option value="1">1</option>
                                </select>
                                <br />
                                <label className="form-label">Thợ săn</label>
                                <select onChange={e => {
                                    setTotalThoSan(e.target.value)
                                }} className="form-select" aria-label="Thợ săn">
                                    <option value="1">1</option>
                                </select>
                                <br />
                                <label className="form-label">Tiên tri</label>
                                <select onChange={e => {
                                    setTotalTienTri(e.target.value)
                                }} className="form-select" aria-label="Tiên tri">
                                    <option value="1">1</option>
                                </select>
                                <br />
                            </div>
                        }
                    </div>
                )
            }

            {!props.userLogin?.role && props.isHost && <button onClick={handleStartGame} className="btn btn-success">Vào thui</button>}

            {props.userLogin?.role && <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h1>Chúc mừng bạn đã chuyển sinh thành</h1>
                <hr />
                <img style={{
                    width: '400px'
                }} src={Role.find(item => item.role === props.userLogin?.role).img} alt="" />
            </div>}
        </div>
    )
}


export default HostRoom