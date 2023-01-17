import React from 'react';
import {Appearance, useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const TerminalSvg = () => {
  const {height, width} = useWindowDimensions();
  const fillColor =
    Appearance.getColorScheme() === 'dark' ? '#3E3E40' : '#9C9C9C';
  const shader =
    Appearance.getColorScheme() === 'dark' ? '#81818399' : '#BCBCBC';
  const computedWidth = (144 * width) / 1265;
  const computedHeight = (105 * height) / 1024;

  const LCXML = `<svg width="${computedWidth}" height="${computedHeight}" viewBox="0 0 144 105" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_f_734_2)">
  <rect x="10" y="10" width="124" height="85" rx="9" fill="${shader}"/>
  </g>
  <rect width="124" height="85" rx="9" fill="${fillColor}"/>
  <rect x="66" y="61" width="38" height="11" rx="5.5" fill="white"/>
  <path d="M26 66L50 42.5L26 19" stroke="white" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
  <filter id="filter0_f_734_2" x="0" y="0" width="144" height="105" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
  <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_734_2"/>
  </filter>
  </defs>
  </svg>
  `;

  return <SvgXml xml={LCXML} />;
};

export default TerminalSvg;
