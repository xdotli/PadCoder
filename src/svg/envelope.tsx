import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const EnvelopeSvg = () => {
  const {height, width} = useWindowDimensions();

  const computedWidth = (60 * width) / 1265;
  const computedHeight = (44 * height) / 1024;
  const envelopeXML = `<svg width="${computedWidth}" height="${computedHeight}" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M54.8477 12.17L31.3459 2.29044C30.8911 2.09938 30.3909 2 29.8838 2C29.3767 2 28.8765 2.09938 28.4217 2.29044L4.91987 12.17C4.01889 12.546 3.25929 13.1291 2.72689 13.8534C2.19449 14.5777 1.91049 15.4144 1.90698 16.2689L1.90698 37.4176C1.90698 39.9483 4.34688 42 7.35708 42H52.4159C55.4261 42 57.866 39.9483 57.866 37.4176L57.866 16.2689C57.862 15.4139 57.5772 14.5769 57.0438 13.8525C56.5104 13.1282 55.7497 12.5454 54.8477 12.17V12.17Z" stroke="#FFAA44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M48.8933 34.6682L31.5073 23.1505C30.9406 22.7751 30.2432 22.5713 29.5254 22.5713C28.8075 22.5713 28.1101 22.7751 27.5435 23.1505L10.1561 34.6682M37.0569 26.3054L55.3494 14.5059M3.69995 14.5059L22.396 26.5345" stroke="#FFAA44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={envelopeXML} />;
};

export default EnvelopeSvg;
