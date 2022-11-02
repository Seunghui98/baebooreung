import styles from './Main.module.css';

import { useState } from 'react';

import MainFrame from "./MainFrame";
import DashBoard from "./DashBoard";
import Chatting from "./Chatting";
import NaverMapApi from '../navermap/NaverMapApi';

const Main = () => {
  // console.log('')
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
