import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const BookSvg = () => {
  const {height, width} = useWindowDimensions();

  const computedWidth = (60 * width) / 1265;
  const computedHeight = (40 * height) / 1024;
  const bookXML = `<svg width="${computedWidth}" height="${computedHeight}" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M29.8865 12V42M29.8865 12C31.885 5.42084 39.4332 2.06147 55.8674 2.00001C56.1302 1.99919 56.3905 2.04173 56.6334 2.1252C56.8763 2.20866 57.097 2.3314 57.2828 2.48632C57.4686 2.64125 57.6158 2.82531 57.7159 3.0279C57.8159 3.23048 57.867 3.44758 57.866 3.66668V33.6667C57.866 34.1087 57.6554 34.5326 57.2806 34.8452C56.9058 35.1577 56.3975 35.3333 55.8674 35.3333C39.8792 35.3333 33.7024 38.0219 29.8865 42C26.093 38.0417 19.8938 35.3333 3.90553 35.3333C2.67144 35.3333 1.907 34.4948 1.907 33.4656V3.66668C1.90601 3.44758 1.95702 3.23048 2.05711 3.0279C2.15719 2.82531 2.30437 2.64125 2.49014 2.48632C2.67592 2.3314 2.89663 2.20866 3.13955 2.1252C3.38248 2.04173 3.6428 1.99919 3.90553 2.00001C20.3397 2.06147 27.8879 5.42084 29.8865 12Z" stroke="#FFAA44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  return <SvgXml xml={bookXML} />;
};

export default BookSvg;
