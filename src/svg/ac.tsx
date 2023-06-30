import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const ACSvg = () => {
  const width = useWindowDimensions().width;

  const computedWidth = (81 * width) / 1365;
  const acXML = `<svg width="${computedWidth}" height="${computedWidth}" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M78 40.5C78 19.7969 61.2031 3 40.5 3C19.7969 3 3 19.7969 3 40.5C3 61.2031 19.7969 78 40.5 78C61.2031 78 78 61.2031 78 40.5Z" stroke="#12B022" stroke-width="5" stroke-miterlimit="10"/>
  <path d="M59.25 24.875L33 56.125L21.75 43.625" stroke="#12B022" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={acXML} />;
};

export default ACSvg;
