import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Animated} from 'react-native';

interface ChevronProps {
  expanded: boolean;
}

const Chevron: React.FC<ChevronProps> = ({expanded}) => {
  const rotation = new Animated.Value(0);
  const {height, width} = useWindowDimensions();

  React.useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 30,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const rotationDeg = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const computedWidth = (10 * width) / 1265;
  const computedHeight = (10 * height) / 1024;
  const chevronXml = `
  <svg width=${computedWidth} height=${computedHeight} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 11L6 6L1 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  return (
    <Animated.View
      style={{
        transform: [{rotate: rotationDeg}],
      }}>
      <SvgXml xml={chevronXml} />
    </Animated.View>
  );
};

export default Chevron;
