import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import ApiCaller from '../api/apicaller';
import {ProblemsetQuestionList} from '../api/interfaces';
import TerminalSvg from '../svg/terminal';

export const MainPage: React.FC = () => {
  const [questionData, setQuestionData] = useState<ProblemsetQuestionList>();
  const navigator: any = useNavigation();

  const fetchQuestions = async () => {
    const questions = await ApiCaller.getInstance().getProblems(
      '',
      {difficulty: 'EASY'},
      50,
      0,
    );

    if (questions) {
      setQuestionData(questions);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

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
    <View className="flex flex-row w-screen h-screen">
      <View className="h-full w-[29.3vw] bg-[#FBFBFB] dark:bg-[#1D1D1D]">
        <Text className="pl-[2.27vw] pt-[7.42vh] text-[3.08vw] font-semibold text-dark dark:text-white">
          PadCoder
        </Text>
        <Pressable
          className="absolute ml-[2.344vw] mt-[52.188vh] w-[10.33vw] h-[4.199vh] rounded-[20px] border-[#FFAA44] border-2 justify-between items-center"
          onPress={() => navigator.navigate('coding')}>
          <Text className="pt-[0.6vh] text-[#FFAA44] text-[1.47vw] leading-tight">
            Coding
          </Text>
        </Pressable>
        <Pressable
          className="absolute ml-[2.344vw] mt-[92.188vh] w-[10.33vw] h-[4.199vh] rounded-[20px] border-[#FFAA44] border-2 justify-between items-center"
          onPress={() => handleLogout()}>
          <Text className="pt-[0.6vh] text-[#FFAA44] text-[1.47vw] leading-tight">
            Log out
          </Text>
        </Pressable>
      </View>
      <View className="flex-1 bg-[#FFFDF3] dark:bg-[#27292E]">
        <View className="flex flex-col w-[20.7vw] h-[20.02vh] ml-[25.5vw] mt-[40.72vh] justify-between items-center">
          <TerminalSvg />
          <Text className="text-[1.47vw] leading-tight text-[#B5B5B5] whitespace-nowrap">
            Select a question to begin
          </Text>
          <Text className="mt-[-1.5vh] text-[1.47vw] leading-tight text-[#B5B5B5]">
            Enjoy!
          </Text>
        </View>
      </View>
    </View>
  );
};
