import {useNavigation} from '@react-navigation/native';
import {styled} from 'nativewind';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import LCSvg from '../svg/lc';

const StyledSafeArea = styled(SafeAreaView);
export const LoginPage: React.FC = () => {
  const [isSelect, setIsSelect] = useState<Boolean>(false);
  const navigator: any = useNavigation();
  const handleLogin = () => {
    navigator.navigate('webview');
  };
  return (
    <StyledSafeArea className="h-screen w-screen bg-[#FFFDF3] dark:bg-[#27292E]">
      <View className="flex flex-col justify-between pl-[8.03vw] mt-[10.99vh] w-full h-[17.38vh]">
        <Text className="text-[5.53vw] font-bold leading-tight text-black dark:text-white">
          Before coding...
        </Text>
        <Text className="text-[2.13vw] leading-tight text-black dark:text-white">
          You'll need to select a provider. You can always change it by logging
          out from the main menu.
        </Text>
      </View>
      <Pressable
        className="flex flex-col mt-[12.11vh] ml-[46.45vw] w-[7.75vw] h-[14.48vh] justify-between"
        onPress={() => setIsSelect(!isSelect)}>
        {isSelect ? (
          <>
            <LCSvg fillColor="#FFAA44" />
            <Text className="text-[1.76vw] leading-tight text-black dark:text-white">
              LeetCode
            </Text>
          </>
        ) : (
          <>
            <LCSvg fillColor="#707070" />
            <Text className="text-[1.76vw] leading-tight text-neutral-600">
              LeetCode
            </Text>
          </>
        )}
      </Pressable>

      {isSelect && (
        <Pressable
          className="absolute mt-[68.46vh] ml-[30.55vw] bg-[#FFAA44] w-[38.9vw] h-[5.37vh] rounded-[10px] items-center justify-center"
          onPress={() => handleLogin()}>
          <Text className="text-[1.76vw] leading-tight text-white">
            Sign me in to LeetCode
          </Text>
        </Pressable>
      )}
    </StyledSafeArea>
  );
};
