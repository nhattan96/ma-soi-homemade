import React, { useState } from "react";
import './pop-up-login-user.scss'

export const PopupLoginUser = (props) => {
    const [isClose, setIsClose] = useState(false)

    const handleClickPopUp = () => {
        setIsClose(prev => !prev)
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h1>Online</h1>
            <div style={{
                background: "gray",
                padding: 10,
                margin: 10,
                minWidth: '200px'
            }}>
                {
                    props.allUser.map((item, index) => (<div>
                        <div key={item.data.id}>
                            {item?.data.userName}
                        </div>
                        <hr />
                    </div>)
                    )
                }
            </div>
            <div> Tổng : {props.allUser?.length}</div>
        </div>
    )
}

export default PopupLoginUser 