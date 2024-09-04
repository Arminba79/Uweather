import Component, { PageEl } from "@/components/Libs/Component";
import Copy from "@/components/Libs/Copy";
import Router from "next/router";
import Window from "@/components/Libs/Window";
import TextBox from "@/components/Libs/TextBox";
import Icon2Titles from "@/components/Libs/Icon2Titles";
import Icon3Titles from "@/components/Libs/Icon3Titles";
import { parse } from "path";
import "boxicons/css/boxicons.min.css";
import { url } from "inspector";

export default (p) => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {
  let styles = global.styles;

  return (
    <section className="bg-black flex items-center justify-center h-screen container-fluid">
      <section className=" bg-cover  bg-center w-full h-full flex bg-[url('https://cdn.ituring.ir/research/73/ax2.jpg')]">
        {/* right */}
        <div className="w-4/12 h-full bg-[#050505bd] flex flex-col gap-10 justify-between items-center">
          {/* up box */}
          <div className="flex gap-5 py-7">
            <span className="text-gray-400 font-bold">Search</span>
            <input
              type="text"
              className=" bg-transparent border-b border-gray-500 outline-0  "
            />
          </div>

          <hr className="mt-52 w-10/12  border-gray-500 " />
          {/* down box */}
          <div className="w-full  h-1/2 flex flex-col justify-center gap-12">
            <div className="flex justify-between mx-7 font-bold">
              {/* humidity */}
              <div className="text-lg ">
                <span className="text-white">{props.weather.humidity}</span>
              </div>

              <div className=" text-gray-400 text-lg flex gap-2 justify-center items-center">
                
                <span>: Humidity</span>
                <i className='bx bx-water' ></i>
                
                </div>
            </div>

            <div className="flex justify-between  font-bold mx-7">
              {/* uv */}
              <div className="text-lg flex m ">
                <span className="text-white">{props.weather.uvIndex}</span>
              </div>

              <div className=" text-gray-400 text-lg flex gap-2 justify-center items-center">
                
                <span>: Uvindex</span>
                <i className='bx bxs-radiation'></i>
                
                </div>
              
            </div>

            <div className="flex justify-between mx-7 font-bold">
              {/* Feels like */}
              <div className="text-lg ">
                <span className="text-white"> {props.weather.FeelsLikeC} </span>
              </div>

              <div className=" text-gray-400 text-lg flex gap-2 justify-center items-center">
                
                <span>: Fells like</span>
                <i className='bx bx-happy-heart-eyes'></i>
                
                </div>
            </div>

            <div className="flex justify-between mx-7 font-bold">
              {/* Pressure */}
              <div className="text-lg ">
                <span className="text-white">{props.weather.pressure}</span>
              </div>

              <div className=" text-gray-400 text-lg flex gap-2 justify-center items-center">
                
                <span>: Pressure </span>
                <i className='bx bx-water' ></i>
                
                </div>
            </div>
          </div>
        </div>

        {/* left */}
        <div className="w-8/12  flex flex-col-reverse  justify-between bg-[#00000065]">
          <div className=" h-1/3 flex justify-center ">
            {/* icon and status */}
            <div className=" w-3/12 flex flex-col justify-center gap-3 items-center ">
              <i className="bx bxs-sun text-white text-6xl"></i>
              <span className="text-white font-bold">Clear</span>
            </div>

            {/* city and time */}
            <div className=" w-4/12 flex flex-col justify-center items-center ">
              {/* city */}
              <span className="text-white font-bold text-5xl">
                {props.city}
              </span>
              {/* date */}
              <div className="text-white font-bold flex gap-5">
                <span>{props.time.date}</span>
                <span>{props.time.time}</span>
              </div>
            </div>

            {/* dama */}
            <div className=" w-3/12 flex justify-end flex-col ">
              <span className="text-white flex items-center justify-end gap-2">
                <span className="mt-16">°C</span>
                <span className=" text-[9rem]">{props.weather.temp_C}</span>
              </span>
              <span className="text-gray-500 font-bold text-xs">
                Made by Armin [ PHOENIX ]
              </span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context);
  var {
    uid,
    name,
    image,
    imageprop,
    lang,
    cchar,
    unit,
    workspace,
    servid,
    servsecret,
    usedquota,
    quota,
    quotaunit,
    status,
    regdate,
    expid,
    role,
    path,
    devmod,
    userip,
  } = session;

  let res = await fetch("https://cdn.ituring.ir/research/api/weather/");
  let data = await res.json();

  let Date = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Tehran"
  );
  let time = await Date.json();

  let weather = await data.current_condition[0];
  let city = await data.nearest_area[0].areaName[0].value;

  return {
    props: {
      data: global.QSON.stringify({
        weather,
        city,
        time,
        session,
        // nlangs,
      }),
    },
  };
}
