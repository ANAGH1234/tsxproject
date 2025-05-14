import React from "react";

type IconProps = {
  width?: number;
  height?: number;
  fill?: string;
} & React.SVGProps<SVGSVGElement>;

const Icons = {
  award: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.84 1.64 5.43 4.15 6.68L7.5 22l4.5-2 4.5 2-1.65-6.32C17.36 14.43 19 11.84 19 9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5 0 2.14-1.36 4.01-3.38 4.71L12 18.1l-1.62-4.39C8.36 13.01 7 11.14 7 9c0-2.76 2.24-5 5-5zm-1 7h2v2h-2v-2zm0-4h2v3h-2V7z" />
    </svg>
  ),
  rank: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill="#2196F3"
    >
      <path d="M240-40v-329L110-580l185-300h370l185 300-130 211v329l-240-80-240 80Zm80-111 160-53 160 53v-129H320v129Zm20-649L204-580l136 220h280l136-220-136-220H340Zm98 383L296-558l57-57 85 85 169-170 57 56-226 227ZM320-280h320-320Z"></path>
    </svg>
  ),
  problemSolved: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill="green"
    >
      <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"></path>
    </svg>
  ),
  attempt: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill="#dc3545"
    >
      <path d="M740-208v-112h-40v128l86 86 28-28-74-74ZM480-800 243-663l237 137 237-137-237-137ZM120-321v-318q0-22 10.5-40t29.5-29l280-161q10-5 19.5-8t20.5-3q11 0 21 3t19 8l280 161q19 11 29.5 29t10.5 40v159h-80v-116L479-434 200-596v274l240 139v92L160-252q-19-11-29.5-29T120-321ZM720 0q-83 0-141.5-58.5T520-200q0-83 58.5-141.5T720-400q83 0 141.5 58.5T920-200q0 83-58.5 141.5T720 0ZM480-491Z"></path>
    </svg>
  ),

  greenCheck: ({
    width = 24,
    height = 24,
    fill = "green",
    ...props
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19l12-12-1.41-1.42z" />
    </svg>
  ),

  codeSlash: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <path d="M9.4 16.6L3.8 12l5.6-4.6L8 6 2 12l6 6zM16 18l6-6-6-6-1.4 1.4L19.2 12l-4.6 4.6z" />
    </svg>
  ),

  coinStack: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <path d="M12 4C7.59 4 4 5.79 4 8s3.59 4 8 4 8-1.79 8-4-3.59-4-8-4zm0 6c-3.87 0-6-1.29-6-2s2.13-2 6-2 6 1.29 6 2-2.13 2-6 2zm6 2c0 1.64-3.13 3-6 3s-6-1.36-6-3H4c0 2.21 3.59 4 8 4s8-1.79 8-4h-2zm0 4c0 1.64-3.13 3-6 3s-6-1.36-6-3H4c0 2.21 3.59 4 8 4s8-1.79 8-4h-2z" />
    </svg>
  ),

  timeIcon: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7V13L16 16L17 14.5L12.5 12V7H11Z" />
    </svg>
  ),

  user: ({
    width = 20,
    height = 20,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C9.79 2 8 3.79 8 6C8 8.21 9.79 10 12 10C14.21 10 16 8.21 16 6C16 3.79 14.21 2 12 2ZM12 12C8.13 12 2 14.17 2 18V20H22V18C22 14.17 15.87 12 12 12Z" />
    </svg>
  ),

  pin: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }: IconProps) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11Z" />
    </svg>
  ),
  lightningIcon: ({
    width = 24,
    height = 24,
    fill = "currentColor",
    ...props
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <path d="M11 21L17 10H12L13 3L6 14H11L10 21Z" />
    </svg>
  ),
};

export default Icons;
