import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {styled} from 'nativewind';
import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {tokenState} from '../atoms';
import BookSvg from '../svg/book';
import CodeSvg from '../svg/code';
import EnvelopeSvg from '../svg/envelope';
import {Token} from '../types/token';

const StyledSafeArea = styled(SafeAreaView);

export const EntryPage: React.FC = () => {
  const [_, setToken] = useRecoilState(tokenState);
  const navigator: any = useNavigation();
  const getToken = async () => {
    try {
      const csrftoken = await AsyncStorage.getItem('@csrftoken');
      const expiration = await AsyncStorage.getItem('@session_expiration');
      const session = await AsyncStorage.getItem('@session');
      if (csrftoken && expiration && session) {
        setToken({session, expiration, csrftoken} as unknown as Token);
      }

      navigator.navigate('main');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  });

  const handleGetStarted = () => {
    navigator.navigate('login');
  };

  return (
    <StyledSafeArea className="h-screen w-screen bg-[#FFFDF3] dark:bg-[#27292E]">
      <Text className="pl-[9.38vw] pt-[7.52vh] text-[7.52vh] leading-tight font-bold text-black dark:text-white">
        Welcome to <Text className="text-[#FFAA44]">PadCoder.</Text>
      </Text>
      <View className="flex flex-col justify-between pl-[10.03vw] pt-[11.78vh] w-[43.61vw] h-[50.49vh]">
        <View className="flex-1 flex-row">
          <CodeSvg />
          <Text className="pl-10 text-[2.21vw] text-black dark:text-white">
            Coding anytime, anywhere
          </Text>
        </View>
        <View className="flex-1 flex-row">
          <BookSvg />
          <Text className="pl-10 text-[2.21vw] text-black dark:text-white">
            Sharpen the coding skills.
          </Text>
        </View>
        <View className="flex-1 flex-row">
          <EnvelopeSvg />
          <Text className="pl-10 text-[2.21vw] text-black dark:text-white">
            Ace the technical interview.
          </Text>
        </View>
      </View>
      <Pressable
        className="absolute mt-[81.54vh] ml-[75.34vw] w-[18.24vw] h-[6.83vh] bg-[#FFAA44] rounded-3xl items-center justify-center"
        onPress={() => handleGetStarted()}>
        <Text className="text-white text-2xl">Get Started</Text>
      </Pressable>
    </StyledSafeArea>
  );
};
