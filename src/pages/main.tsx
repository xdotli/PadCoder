import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ApiCaller from '../api/apicaller';

import {
  ProblemsetQuestionList,
  Problem,
  Category,
  Provider,
  ProblemDetail,
} from '../api/interfaces';
import TerminalSvg from '../svg/terminal';
import {
  MainScreenNavigationProp,
  CodingRouteParams,
} from '../api/navigation-types';
import Chevron from '../svg/chevron';
import {useRecoilState} from 'recoil';
import {selectedQuestionAtom} from '../atoms';
import {QuestionView} from '../components/QuestoinView';

interface TreeViewProps {
  provider: Provider;
}

interface CategoryProps {
  provider: Provider;
  category: Category;
}

interface QuestionNodeProps {
  question: Problem;
}

interface CategoryNodeContext {
  expandedCategoryId: string | null;
  setExpandedCategoryId: (category: string) => void;
}

const CategoryNodeContext = React.createContext<CategoryNodeContext>({
  expandedCategoryId: null,
  setExpandedCategoryId: () => {},
});

const QuestionNode: React.FC<QuestionNodeProps> = ({question}) => {
  const [selectedQuestion, setSelectedQuestion] =
    useRecoilState(selectedQuestionAtom);

  const handlePress = () => {
    setSelectedQuestion(question.titleSlug);
  };

  return (
    <View className="pl-8">
      <Pressable onPress={handlePress}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-xl p-2">{`[${question.frontendQuestionId}] ${question.title}`}</Text>
      </Pressable>
    </View>
  );
};

const CategoryNode: React.FC<CategoryProps> = ({provider, category}) => {
  const [questionData, setQuestionData] =
    React.useState<ProblemsetQuestionList>();
  const {expandedCategoryId, setExpandedCategoryId} =
    React.useContext(CategoryNodeContext);

  const isExpanded = expandedCategoryId === category.id;

  const filter =
    category.label === 'All'
      ? {}
      : {
          difficulty: category.id.toUpperCase(),
        };

  const [currentPage, setCurrentPage] = React.useState(0);

  const fetchQuestions = async (page: number) => {
    const offset = page * 10;
    const questions = await ApiCaller.getInstance().getProblems(
      '',
      filter,
      10,
      offset,
    );

    if (questions) {
      setQuestionData(prevData => {
        const updatedQuestions = [
          ...(prevData?.questions || []),
          ...questions.questions,
        ];
        const slicedQuestions = updatedQuestions.slice(-10);
        return {...questions, questions: slicedQuestions};
      });
      setCurrentPage(page);
    }
  };

  const handleEndReached = () => {
    fetchQuestions(currentPage + 1);
  };

  const handleRefresh = () => {
    if (currentPage > 0) {
      fetchQuestions(currentPage - 1);
    }
  };

  const handlePress = async () => {
    if (isExpanded) {
      setExpandedCategoryId('');
    } else {
      setExpandedCategoryId(category.id);
      if (!questionData) {
        setCurrentPage(0);
        await fetchQuestions(0);
      }
    }
  };

  return (
    <View className="pl-4 flex flex-col max-h-[50vh]">
      <Pressable
        className="flex flex-row items-center"
        onPress={() => handlePress()}>
        <Text className="grow text-xl p-2">{category.label}</Text>
        <Chevron expanded={isExpanded} />
      </Pressable>
      {isExpanded && (
        <FlatList
          data={questionData?.questions}
          renderItem={({item}) => <QuestionNode question={item} />}
          keyExtractor={(item, index) => item.frontendQuestionId.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5} // Adjust this value as needed
          refreshing={false} // You can use a state variable to manage this if needed
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

const TreeView: React.FC<TreeViewProps> = ({provider}) => {
  const [categoryData, setCategoryData] = React.useState<Category[]>();
  const [expanded, setExpanded] = React.useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = React.useState('');

  const fetchCategories = async () => {
    const categories = await ApiCaller.getInstance().getCategories(provider.id);

    if (categories) {
      setCategoryData(categories);
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryNodeContext.Provider
      value={{expandedCategoryId, setExpandedCategoryId}}>
      <View className="flex flex-col max-h-[80vh]">
        <Pressable
          className="flex flex-row items-center"
          onPress={() => {
            setExpanded(!expanded);
          }}>
          <Text className="grow text-xl p-2">{provider.label}</Text>
          <Chevron expanded={expanded} />
        </Pressable>
        {expanded &&
          categoryData?.map((category, index) => (
            <CategoryNode key={index} provider={provider} category={category} />
          ))}
      </View>
    </CategoryNodeContext.Provider>
  );
};

const NoQuestionPage: React.FC = () => (
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
);

const WithQuestionPage: React.FC<{questionDetail: ProblemDetail}> = ({
  questionDetail,
}) => {
  const navigator = useNavigation<MainScreenNavigationProp>();
  const handlePress = () => {
    navigator.navigate('coding', {
      titleSlug: questionDetail.titleSlug,
    } as CodingRouteParams);
  };

  return (
    <View className="flex flex-col h-screen w-[70.7vw] bg-[#FBFBFB] dark:bg-[#1D1D1D]">
      <Pressable className="ml-[2.271vw] mt-[5vh]">
        <Text className="text-black dark:text-white text-[3.077vw]">
          {questionDetail?.title}
        </Text>
      </Pressable>
      <QuestionView question={questionDetail} />
      <View className="flex flex-row p-6 pr-12 border-1 h-[12vh] items-center">
        <View className="grow"></View>
        <Pressable
          className="w-32 h-[4.199vh] rounded-[20px] border-[#FFAA44] border-2 justify-between items-center"
          onPress={handlePress}>
          <Text className="pt-[0.6vh] text-[#FFAA44] text-[1.47vw] leading-tight">
            Coding
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const MainPage: React.FC = () => {
  const navigator: any = useNavigation();

  const [providers, setProviders] = React.useState<Provider[]>();
  const [selectedQuestion, setSelectedQuestion] =
    useRecoilState(selectedQuestionAtom);
  const [questionDetail, setQuestionDetail] = React.useState<ProblemDetail>();

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      '@csrftoken',
      '@session_value',
      '@session_expiration',
    ]).then(() => {
      navigator.navigate('entry');
    });
  };

  const fetchProviders = async () => {
    const providers = await ApiCaller.getInstance().getProviders();

    if (providers) {
      setProviders(providers);
    }
  };

  const fetchQuestionDetail = async () => {
    const questionDetail = await ApiCaller.getInstance().getProblemDetail(
      selectedQuestion,
    );
    setQuestionDetail(questionDetail);
  };

  React.useEffect(() => {
    fetchProviders();
    if (!!selectedQuestion) {
      fetchQuestionDetail();
    }
  }, [selectedQuestion]);

  return (
    <View className="flex flex-row w-screen h-screen">
      <View className="h-full w-[29.3vw] bg-[#FBFBFB] dark:bg-[#1D1D1D]">
        <Text className="pl-[2.27vw] pt-[7.42vh] text-[3.08vw] font-semibold text-dark dark:text-white">
          PadCoder
        </Text>

        <View className="flex flex-col max-h-[79vh] h-full p-6">
          {providers?.map((provider, index) => (
            <TreeView key={index} provider={provider} />
          ))}
        </View>

        <Pressable
          className="absolute ml-[2.344vw] mt-[92.188vh] w-[10.33vw] h-[4.199vh] rounded-[20px] border-[#FFAA44] border-2 justify-between items-center"
          onPress={() => handleLogout()}>
          <Text className="pt-[0.6vh] text-[#FFAA44] text-[1.47vw] leading-tight">
            Log out
          </Text>
        </Pressable>
      </View>

      {!selectedQuestion && !questionDetail && <NoQuestionPage />}
      {!!selectedQuestion && questionDetail && (
        <WithQuestionPage questionDetail={questionDetail} />
      )}
    </View>
  );
};
