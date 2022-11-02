import styles from './MainFrame.module.css'
import React, { useEffect } from 'react';
import logo from '../assets/images/logo_short.png'
import dashboard from '../assets/images/dashboard.png'
import notice from '../assets/images/logo_short.png'
import map from '../assets/images/map.png'
import chat from '../assets/images/chat.png'
import logout from '../assets/images/logout.png'


const MainFrame = ({ SetMainId }) => {

  return (
    <div className={styles.main_display_flex} style={{ height: "100%" }}>
      <div className={styles.main_justify_content_space_between}>
        <div className={styles.main_display_flex_direction_col}>
          <img className={styles.main_logo_image} src={logo} alt="" />
          <button className={styles.button_style} onClick={() => { SetMainId(0) }}>
            <img className={styles.main_frame_logo_image} src={dashboard} alt="" />
            &nbsp;&nbsp;&nbsp;대시보드
          </button>
          <button className={styles.button_style} onClick={() => { SetMainId(1) }}>
            <img className={styles.main_frame_logo_image} src={map} alt="" />
            &nbsp;&nbsp;&nbsp;드라이버위치
          </button>
          <button className={styles.button_style} onClick={() => { SetMainId(2) }}>
            <img className={styles.main_frame_logo_image} src={notice} alt="" />
            &nbsp;&nbsp;&nbsp;공지사항
          </button>
          <button className={styles.button_style} onClick={() => { SetMainId(3) }}>
            <img className={styles.main_frame_logo_image} src={chat} alt="" />
            &nbsp;&nbsp;&nbsp;채팅
          </button>
        </div>
        <div className={styles.main_display_flex_direction_col}>
          <button>
            &entp;내 이름&entp;
            <img className={styles.main_frame_logo_image} src={logout} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.main_content}>
      </div>
    </div>
  )
}

export default MainFrame;