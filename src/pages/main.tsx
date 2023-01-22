import React, {ReactNode, useEffect, useState} from 'react';
import {Animated, Pressable, ScrollView, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiCaller from '../api/apicaller';
import {ProblemsetQuestionList, Problem} from '../api/interfaces';
import TerminalSvg from '../svg/terminal';
import {MainScreenNavigationProp} from 'api/navigation-types';
import Chevron from '../svg/chevron';

interface TreeNodeProps {
  label: string;
  children: ReactNode;
}

const TreeNode = ({label, children}: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isExpanded ? 1 : 0,
      duration: 30,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(isExpanded => !isExpanded);
  };

  const rotationDeg = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View>
      <Pressable
        onPress={handleToggle}
        className="flex flex-row items-center px-4 py-2">
        <Text className="grow text-xl">{label}</Text>
        <Animated.View
          style={{
            transform: [{rotate: rotationDeg}],
          }}>
          <Chevron />
        </Animated.View>
      </Pressable>
      {isExpanded && children && (
        <View style={{paddingLeft: 40}}>{children}</View>
      )}
    </View>
  );
};

interface QuestionNodeProps {
  question: Problem;
}

const QuestionNode: React.FC<QuestionNodeProps> = ({question}) => {
  const navigator = useNavigation<MainScreenNavigationProp>();

  const handlePress = () => {
    navigator.navigate('coding', {
      titleSlug: question.titleSlug,
      frontendQuestionId: question.frontendQuestionId,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Text className="text-xl p-2">{`[${question.frontendQuestionId}] ${question.title}`}</Text>
    </Pressable>
  );
};

export const MainPage: React.FC = () => {
  const [questionData, setQuestionData] = useState<ProblemsetQuestionList>();
  const navigator: any = useNavigation();

  const fetchQuestions = async () => {
    const questions = await ApiCaller.getInstance().getProblems('', {}, 50, 0);

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

        <ScrollView className="flex flex-col max-h-[75vh] p-6">
          {/* <TreeView /> */}

          <TreeNode label="LeetCode">
            <TreeNode label="All">
              {questionData?.questions.slice(0, 10).map(ele => (
                <QuestionNode question={ele} />
              ))}
            </TreeNode>
            <TreeNode label="Company">
              <Text>Yeah</Text>
            </TreeNode>

            <TreeNode label="Difficulty">
              <TreeNode label="Easy">
                <Text>Yeah</Text>
              </TreeNode>
              <TreeNode label="Medium">
                <Text>Yeah</Text>
              </TreeNode>
              <TreeNode label="Hard">
                <Text>Yeah</Text>
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </ScrollView>

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
