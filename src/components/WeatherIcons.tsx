import { type JSX } from "react";
import {
  FiSun,
  FiCloud,
  FiCloudRain,
  FiCloudSnow,
  FiCloudDrizzle,
  FiZap,
  FiWind,
  FiMoon,
} from "react-icons/fi";
import { BsFillCloudSunFill } from "react-icons/bs";
import { LuHaze } from "react-icons/lu";
import { RiMistFill, RiMoonCloudyFill } from "react-icons/ri";
import { GiFog } from "react-icons/gi";
import { MdStorm } from "react-icons/md";
import type { IconType } from "react-icons";

const iconMap: { [key: string]: IconType } = {
  Clear: FiSun,
  Clouds: FiCloud,
  Rain: FiCloudRain,
  Drizzle: FiCloudDrizzle,
  Thunderstorm: FiZap,
  Snow: FiCloudSnow,
  Mist: RiMistFill,
  Smoke: FiWind,
  Haze: LuHaze,
  Dust: FiWind,
  Fog: GiFog,
  Sand: MdStorm,
  Ash: FiWind,
  Squall: FiWind,
  Tornado: FiWind,
};

const nightIconMap: { [key: string]: IconType } = {
  Clear: FiMoon,
  Clouds: RiMoonCloudyFill,
  Rain: FiCloudRain,
  Drizzle: FiCloudDrizzle,
  Thunderstorm: FiZap,
  Snow: FiCloudSnow,
  Mist: RiMistFill,
  Smoke: FiWind,
  Haze: LuHaze,
  Dust: FiWind,
  Fog: GiFog,
  Sand: MdStorm,
  Ash: FiWind,
  Squall: FiWind,
  Tornado: FiWind,
};

export const WeatherIcon = ({
  icon,
  size = 24,
}: {
  icon: string;
  size?: number;
}) => {

  return (
    <>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" style={{width:"100px",height:"100px"}}/>
    </>
  );
};
