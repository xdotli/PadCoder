import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Animated,
  FlatList,
  GestureResponderEvent,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import ApiCaller from '../api/apircaller';
import ApiCaller from '../api/apicaller';

import {ProblemsetQuestionList, Problem} from '../api/interfaces';
import TerminalSvg from '../svg/terminal';
import {
  MainScreenNavigationProp,
  CodingRouteParams,
} from '../api/navigation-types';
import Chevron from '../svg/chevron';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode[];
  level?: number;
  onNodePress?: (node: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({data, level = 0, onNodePress}) => {
  const renderItem = ({item}: ListRenderItemInfo<TreeNode>) => {
    const hasChildren = item.children && item.children.length > 0;

    const handleNodePress = () => {
      if (onNodePress) {
        onNodePress(item);
      }
      if (hasChildren) {
        setExpandedNodes(prev => ({...prev, [item.id]: !prev[item.id]}));
      }
    };

    return (
      <View className={`pl-${level === 0 ? 0 : 4}`}>
        <Pressable
          onPress={handleNodePress}
          className="flex flex-row items-center px-4 py-2">
          <Text className="grow text-xl">{item.label}</Text>
          <Chevron expanded={expandedNodes[item.id]} />
        </Pressable>
        {hasChildren && expandedNodes[item.id] && (
          <TreeView
            data={item.children!}
            level={level + 1}
            onNodePress={onNodePress}
          />
        )}
      </View>
    );
  };

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {},
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      extraData={expandedNodes}
      nestedScrollEnabled
    />
  );
};

export const MainPage: React.FC = () => {
  const navigator: any = useNavigation();

  const [openNode, setOpenNode] = useState('');
  const [questionData, setQuestionData] = useState<ProblemsetQuestionList>();

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      '@csrftoken',
      '@session_value',
      '@session_expiration',
    ]).then(() => {
      navigator.navigate('entry');
    });
  };

  const treeData: TreeNode[] = [
    {
      id: 'leetcode',
      label: 'LeetCode',
      children: [
        {
          id: 'all',
          label: 'All',
          children: [
            {
              id: '1.1.1',
              label: 'Node 1.1.1',
            },
            {
              id: '1.1.2',
              label: 'Node 1.1.2',
            },
          ],
        },
        {
          id: 'company',
          label: 'Company',
          children: [],
        },
        {
          id: 'difficulty',
          label: 'Difficulty',
          children: [
            {
              id: 'easy',
              label: 'Easy',
              children: [],
            },
            {
              id: 'medium',
              label: 'Medium',
              children: [],
            },
            {
              id: 'hard',
              label: 'Hard',
              children: [],
            },
          ],
        },
      ],
    },
  ];
  const fetchQuestions = async () => {
    const questions = await ApiCaller.getInstance().getProblems('', {}, 50, 0);

    if (questions) {
      setQuestionData(questions);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <View className="flex flex-row w-screen h-screen">
      <View className="h-full w-[29.3vw] bg-[#FBFBFB] dark:bg-[#1D1D1D]">
        <Text className="pl-[2.27vw] pt-[7.42vh] text-[3.08vw] font-semibold text-dark dark:text-white">
          PadCoder
        </Text>

        <ScrollView className="flex flex-col max-h-[79vh] p-6">
          <TreeView data={treeData} />
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
