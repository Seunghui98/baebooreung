import styles from '../MainPage/Main.module.css';

import { useState } from 'react';

import MainFrame from "./MainFrame";
import DashBoard from "./DashBoard";
import Chatting from "./Chatting";
import DriverPosition from "./DriverPosition";
import NaverMapApi from '../NaverMap/NaverMapApi';

const Main = () => {
  console.log('')
  const [MainId, setactiveId] = useState(0);
  const clickhandler = (Id) => {
    setactiveId(Id); 
  }

  const contents = {
    0: <DashBoard />,
    1: <Chatting />,
    2: <NaverMapApi />,
  }

  return (
    <div className={styles.main_component} style={{height:"100%"}}>
      <div>
        <MainFrame SetMainId={clickhandler}/>
      </div>
      <div>
        {contents[MainId]}
        {/* <NaverMapApi/> */}
      </div>
    </div>
  );
};

export default Main;
