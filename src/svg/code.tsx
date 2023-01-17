import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const CodeSvg = () => {
  const {height, width} = useWindowDimensions();

  const computedWidth = (60 * width) / 1265;
  const computedHeight = (40 * height) / 1024;
  const codeXML = `<svg width="${computedWidth}" height="${computedHeight}" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.8953 36L1.90698 22L17.8953 8M41.8777 36L57.866 22L41.8777 8M35.8821 2L23.8909 42" stroke="#FFAA44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={codeXML} />;
};

export default CodeSvg;
