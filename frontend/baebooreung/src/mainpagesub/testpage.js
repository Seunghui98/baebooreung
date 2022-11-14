import axios from 'axios';
import React, { useEffect, useState } from 'react';

const { naver } = window;
const BASE_URL = "https://k7c207.p.ssafy.io:8000"

const TestPage = () => {
  function make_LatLng(now_loc_temp) {
    return `${now_loc_temp.join(',')}`
  }
  function setTowCenter(a, b) {
    return [(a[0] + b[0])/2, (a[1] + b[1])/2]
  }

  
  const ssafyLatLng = [126.8116,35.2053]
  const cloudStoneLatLng = [126.85224,35.14228]
  const ssafy_cloudstone_route_temp = {
    start: make_LatLng(ssafyLatLng),
    goal: make_LatLng(cloudStoneLatLng),
    option: "trafast"
  }
  const [SsafyCloudStoneCourse, setSsafyCloudStoneCourse] = useState([])
  async function cal_course(route) {
    const course = []
    await axios({
      url: "https://k7c207.p.ssafy.io:8000/user-service/map",
      method: "post",
      data: route,
    }).then((res)=> {
      const path = res.data.route.trafast[0].path
      for (let i = 0; i <= path.length - 1; i++) {
        course.push(new naver.maps.LatLng(path[i][1], path[i][0]))
      }
      console.log(course)
      setSsafyCloudStoneCourse(course)
    })
  }

  const [center, setCenter] = useState(cloudStoneLatLng)
  function dateFormat(date) {
    let dateFormat2 = date.getFullYear() +
      '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
      '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
    return dateFormat2;
  }
  let toDay = dateFormat(new Date('2022-11-09'));

  async function search_region_date_all_route() {
    await axios({
      url: BASE_URL + '/business-service/route/navigps',
      method: "post",
      data: {
        region: "GWANGJU",
        date: "2022-11-09"
      }
    }).then((res) => {
      console.log(res)
    }).catch((err)=> {
      console.log(err)
    })
  }
  
  // useEffect(() => {
    let map = new naver.maps.Map('map', {
      center: setTowCenter(ssafyLatLng, cloudStoneLatLng),
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT
      }
    });
    let marker = new naver.maps.Marker({
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
    })
    marker = new naver.maps.Marker({
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
    })
    let polyline = new naver.maps.Polyline({
      map: map,
      path: SsafyCloudStoneCourse,
      strokeColor: "#000000",
      strokeStyle: "solid",
      strokeLineCap: "round",
      strokeWeight: 5,
      strokeOpacity: 1
    })
  // }, []);

  // console.log(SsafyCloudStoneCourse)
  cal_course(ssafy_cloudstone_route_temp)
  // console.log(SsafyCloudStoneCourse)
  useEffect(() => {
  }, [ssafyLatLng])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  )
}

export default TestPage;