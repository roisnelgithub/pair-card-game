import { IconProps } from "../types";

const GoldMedalIcon = ({ size = 24 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 120 120"
    width={size}
    widths={size}
  >
    <path
      d="M75.7 107.4 60 97.5l-15.7 9.9V41.1h31.4z"
      style={{
        fill: "#285fff",
      }}
    />
    <circle
      cx={60}
      cy={44.8}
      r={32.2}
      style={{
        fill: "#ffc54d",
      }}
    />
    <circle
      cx={60}
      cy={44.8}
      r={25.3}
      style={{
        fill: "#e8b04b",
      }}
    />
    <path
      d="m61.2 29.7 4.2 8.4c.2.4.6.7 1 .8l9.3 1.4c1.1.2 1.6 1.5.8 2.3l-6.7 6.6c-.3.3-.5.8-.4 1.2l1.6 9.3c.2 1.1-1 2-2 1.4l-8.3-4.4c-.4-.2-.9-.2-1.3 0L51 61.1c-1 .5-2.2-.3-2-1.4l1.6-9.3c.1-.4-.1-.9-.4-1.2l-6.7-6.6c-.8-.8-.4-2.2.8-2.3l9.3-1.4c.4-.1.8-.3 1-.8l4.2-8.4c.5-1 1.9-1 2.4 0z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
);
export default GoldMedalIcon;
