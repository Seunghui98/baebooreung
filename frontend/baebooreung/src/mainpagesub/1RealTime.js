import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './1RealTime.module.css'
const { naver } = window;

const BASE_URL = "https://k7c207.p.ssafy.io:8000"


const RealTime = (props) => {
  const [allRealTimeTask, setAllRealTimeTask] = useState([])
  async function search_route() {
    await axios({
      url: BASE_URL + '/business-service/route/navigps',
      method: "post",
      data: {
        region: props.myParams.region,
        date: new Date(props.myParams.pickDate).getMonth() + 1 > 10 ? (new Date(props.myParams.pickDate).getDate() > 10 ? `${new Date(props.myParams.pickDate).getFullYear()}-${new Date(props.myParams.pickDate).getMonth() + 1}-${new Date(props.myParams.pickDate).getDate()}` : `${new Date(props.myParams.pickDate).getFullYear()}-${new Date(props.myParams.pickDate).getMonth() + 1}-0${new Date(props.myParams.pickDate).getDate()}`) : `${new Date(props.myParams.pickDate).getFullYear()}-0${new Date(props.myParams.pickDate).getMonth() + 1}-0${new Date(props.myParams.pickDate).getDate()}`
      }
    }).then((res) => {
      setAllRealTimeTask(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  function make_LatLng(now_loc_temp) {
    return `${now_loc_temp.join(',')}`
  }

  function setTwoCenter(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  }
  function make_waypoints(waypoints_temp) {
    return waypoints_temp.join('|') + ':'
  }

  const ssafyLatLng = [126.8116, 35.2053]
  const cloudStoneLatLng = [126.85224, 35.14228]
  const [SsafyCloudStoneCourse, setSsafyCloudStoneCourse] = useState([])
  const ssafy_cloudstone_route_temp = {
    start: make_LatLng(ssafyLatLng),
    goal: make_LatLng(cloudStoneLatLng),
    option: "trafast",
    // waypoints: make_waypoints()
  }

  const [zoom, setZoom] = useState(13)
  const [now_loc, setStart] = useState([126.8116, 35.2053]) // 전남대A출발지
  const [center, setCenter] = useState(setTwoCenter(ssafyLatLng, cloudStoneLatLng))

  async function cal_course(requestBody) {
    const course = []
    await axios({
      url: "https://k7c207.p.ssafy.io:8000/user-service/map",
      method: "post",
      data: requestBody,
    }).then((res) => {
      const path = res.data.route.trafast[0].path
      for (let i = 0; i <= path.length - 1; i++) {
        course.push(new naver.maps.LatLng(path[i][1], path[i][0]))
      }
      setSsafyCloudStoneCourse(course)
    })
  }

  const [params_temp, setParamsTemp] = useState(0)

  useEffect(() => {
    let map = new naver.maps.Map('map', {
      center: center,
      zoom: zoom,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
      }
    });

    let marker1 = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(cloudStoneLatLng),
      animation: 0,
      icon: {
        content: '<img src="https://user-images.githubusercontent.com/97590478/201602320-4ceeb1a1-d80c-40e2-97a3-56c5e87e8f58.png" alt="" ' +
          'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
          '-webkit-user-select: none; position: absolute; width: 90px; height: 90px; left: 0px; top: 0px; transform:translate(-50%, -50%);">',
        size: new naver.maps.Size(22, 35),
        anchor: new naver.maps.Point(11, 35)
      }
    });

    let marker2 = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(ssafyLatLng),
      animation: 0,
      icon: {
        content: '<img src="https://user-images.githubusercontent.com/97590478/201608034-9d564762-236c-49cf-8b30-cdf3fd1787a2.png" alt="" ' +
          'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
          '-webkit-user-select: none; position: absolute; width: 150px; height: 90px; left: 0px; top: 0px; transform:translate(-50%, -50%);">',
        size: new naver.maps.Size(22, 35),
        anchor: new naver.maps.Point(11, 35)
      }
    });

    let polyline = new naver.maps.Polyline({
      map: map,
      path: SsafyCloudStoneCourse,
      strokeColor: "#0094EE",
      strokeStyle: "solid",
      strokeLineCap: "round",
      strokeWeight: 15,
      strokeOpacity: 1
    })
  }, [SsafyCloudStoneCourse]);

  useEffect(() => {
    setTimeout(() => {
      setParamsTemp(params_temp + 1)
    }, 300000)
  }, [params_temp])

  useEffect(() => {
    search_route()
  }, [params_temp, zoom])

  return (
    <div style={{ width: '100%', height: '100%', position: "relative" }}>
      {
        props.myParams.region === "" ?
          <div className={styles.effect}>
            <div className={styles.ment}>
              지역, 대학, 시간 순서로 선택해주세요.
            </div>
          </div>
          : <></>
      }
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  )
}

export default RealTime;