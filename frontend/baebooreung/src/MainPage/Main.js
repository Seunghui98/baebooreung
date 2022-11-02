import styles from './Main.module.css';

import { useState } from 'react';

import MainFrame from "./MainFrame";
import DashBoard from "./DashBoard";
import Chatting from "./Chatting";
import Notice from "./Notice";
import NaverMapApi from '../navermap/NaverMapApi';

const Main = () => {
  // console.log('')
  const [MainId, setactiveId] = useState(0);
  const clickhandler = (Id) => {
    setactiveId(Id);
  }

  const contents = {
    0: <DashBoard />,
    1: <NaverMapApi />,
    2: <Notice />,
    3: <Chatting />
  }

  return (
    <div style={{ height: "100%" }}>
      <div style={{ display: "flex" }}>
        <div>
          <MainFrame SetMainId={clickhandler} />
        </div>
        <div style={{ display: "block", width: "100%" }}>
          {contents[MainId]}
        </div>
      </div>
    </div>
  );
};

export default Main;
