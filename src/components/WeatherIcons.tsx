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
import { RiMistFill } from "react-icons/ri";
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

const nightIconMap: { [key: string]: JSX.Element } = {
  Clear: <FiMoon />,
  Clouds: <BsFillCloudSunFill />,
  // fallback to same icons for others
};

export const WeatherIcon = ({
  main,
  icon,
  size= 24
}: {
  main: string;
  icon: string;
  size?: number;
}) => {
  const isNight = icon?.includes("n");
  if (isNight && nightIconMap[main]) return <>{nightIconMap[main]}</>;
  const IconComponent = iconMap[main] || FiSun;
  return <><IconComponent size={size}/></>;
};
