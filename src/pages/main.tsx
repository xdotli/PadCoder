import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import TerminalSvg from '../svg/terminal';

export const MainPage: React.FC = () => {
  const navigator: any = useNavigation();
  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      '@csrftoken',
      '@session_value',
      '@session_expiration',
    ]).then(() => {
      navigator.navigate('entry');
    });
  };
  return (
    <View className="flex flex-row w-screen h-screen bg-[#FFFDF3] dark:bg-[#27292E]">
      <View className="h-full w-[29.3vw] bg-[#FBFBFB] dark:bg-[#1D1D1D]">
        <Text className="pl-[2.27vw] pt-[7.42vh] text-[3.08vw] font-semibold text-dark dark:text-white">
          PadCoder
        </Text>
        <Pressable
          className="absolute ml-[32px] mt-[944px] w-[141px] h-[43px] rounded-[20px] border-[#FFAA44] border-2 justify-between items-center"
          onPress={() => handleLogout()}>
          <Text className="pt-[0.6vh] text-[#FFAA44] text-[1.47vw] leading-tight">
            Log out
          </Text>
        </Pressable>
      </View>
      <View className="flex-1 bg-[#FFFDF3] dark:bg-[#27292E]">
        <View className="flex flex-col w-[16.7vw] h-[20.02vh] ml-[27.84vw] mt-[40.72vh] justify-between items-center">
          <TerminalSvg />
          <Text className="text-[1.47vw] leading-tight text-[#B5B5B5]">
            Select a question to begin
          </Text>
          <Text className="text-[1.47vw] leading-tight text-[#B5B5B5]">
            Enjoy!
          </Text>
        </View>
      </View>
    </View>
  );
};
