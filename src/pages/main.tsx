import {styled} from 'nativewind';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

const StyledSafeArea = styled(SafeAreaView);
export const MainPage: React.FC = () => {
  return (
    <StyledSafeArea>
      <Text>Main</Text>
    </StyledSafeArea>
  );
};
