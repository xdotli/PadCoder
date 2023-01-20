import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import ApiCaller from '../api/apicaller';

export const CodingPage: React.FC = () => {
  const [content, setContent] = useState({});

  const getQuestionDetail = async () => {
    const data = await ApiCaller.getInstance().getProblemDetail('two-sum');

    if (data) {
      setContent(data);

      for (const snippet of data.codeSnippets) {
        if (snippet.langSlug === 'python3') {
          console.log(snippet.code);
        }
      }
    }
  };

  useEffect(() => {
    getQuestionDetail();
  }, []);

  return (
    <View className="flex flex-row w-screen h-screen">
      <View className="w-[507px] h-screen bg-[#FBFBFB] dark:bg-[#1D1D1D]">
        <Text>{content.content}</Text>
      </View>
      <View className="flex-1 flex-col">
        <View className="w-full h-[83.496vh] bg-[#FFFDF3] dark:bg-[#27292E]" />
        <View className="flex-1 bg-[#E7E7E7] dark:bg-black" />
      </View>
    </View>
  );
};
