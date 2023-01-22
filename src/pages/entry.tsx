import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import ApiCaller from '../api/apicaller';
import {Credential} from '../api/interfaces';
import BookSvg from '../svg/book';
import CodeSvg from '../svg/code';
import EnvelopeSvg from '../svg/envelope';

export const EntryPage: React.FC = () => {
  const navigator: any = useNavigation();
  const getToken = async () => {
    try {
      const csrftoken = await AsyncStorage.getItem('@csrftoken');
      const lastLogin = (await AsyncStorage.getItem(
        '@last_login',
      )) as unknown as number;
      const session = await AsyncStorage.getItem('@session_value');
      const expireDate = 14 * 24 * 60 * 60 * 1000;
      const now = new Date().getTime();
      const isExpired = now - (lastLogin || now) >= expireDate;
      if (csrftoken && !isExpired && session) {
        ApiCaller.getInstance().setCredential({
          session,
          csrftoken,
        } as Credential);

        await AsyncStorage.setItem('@last_login', String(now));
        navigator.navigate('main');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  });

  const handleGetStarted = () => {
    navigator.navigate('main');
  };

  return (
    <SafeAreaView className="h-screen w-screen bg-[#FFFDF3] dark:bg-[#27292E]">
      <Text className="pl-[9.38vw] pt-[10.52vh] text-[4.76vw] leading-tight font-bold text-black dark:text-white">
        Welcome to <Text className="text-[#FFAA44]">PadCoder.</Text>
      </Text>
      <View className="flex flex-col justify-between pl-[10.03vw] pt-[15.78vh] w-[43.61vw] h-[50.49vh]">
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
        className="absolute mt-[81.54vh] ml-[75.34vw] w-[18.24vw] h-[6.83vh] bg-[#FFAA44] rounded-[20px] items-center justify-center"
        onPress={() => handleGetStarted()}>
        <Text className="text-white text-2xl">Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
};
