import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const Chevron = () => {
  const {height, width} = useWindowDimensions();

  const computedWidth = (10 * width) / 1265;
  const computedHeight = (10 * height) / 1024;
  const bookXML = `
  <svg width=${computedWidth} height=${computedHeight} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 11L6 6L1 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  return <SvgXml xml={bookXML} />;
};

export default Chevron;
