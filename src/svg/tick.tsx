import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {SvgXml} from 'react-native-svg';

interface TickSvgProps {
  completed: boolean;
}

const TickSvg: React.FC<TickSvgProps> = ({completed}) => {
  const {width, height} = useWindowDimensions();

  const computedWidth = (16 * 1.2 * width) / 1265;
  const computedHeight = (12.8 * 1.2 * height) / 1024;
  const acXML = `<svg width=${computedWidth} height=${computedHeight} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 2L6.8 14.8L2 10" stroke="#12B022" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  const emptyXML = `<svg width=${computedWidth} height=${computedHeight} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  
  </svg>`;

  if (completed) {
    return <SvgXml className="ml-5 mt-1" xml={acXML} />;
  }

  return <SvgXml className="ml-5 mt-1" xml={emptyXML} />;
};

export default TickSvg;
