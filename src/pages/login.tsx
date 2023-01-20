import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import LCSvg from '../svg/lc';

export const LoginPage: React.FC = () => {
  const [isSelect, setIsSelect] = useState<Boolean>(false);
  const navigator: any = useNavigation();
  const handleLogin = () => {
    navigator.navigate('webview');
  };
  return (
    <SafeAreaView className="h-screen w-screen bg-[#FFFDF3] dark:bg-[#27292E]">
      <View className="flex flex-col justify-between pl-[8.03vw] mt-[10.99vh] w-full h-[15.38vh]">
        <Text className="text-[4.762vw] font-bold leading-tight text-black dark:text-white">
          Let's set up.
        </Text>
        <Text className="text-[2.13vw] leading-tight text-black dark:text-white">
          Please select a provider. You can change it by logging out later.
        </Text>
      </View>
      <Pressable
        className="flex flex-col mt-[18.11vh] ml-[46.45vw] w-[7.75vw] h-[14.48vh] justify-between"
        onPress={() => setIsSelect(!isSelect)}>
        {isSelect ? (
          <>
            <LCSvg fillColor="#FFAA44" />
            <Text className="mt-5 text-[1.76vw] leading-tight text-black dark:text-white">
              LeetCode
            </Text>
          </>
        ) : (
          <>
            <LCSvg fillColor="#707070" />
            <Text className="mt-5 text-[1.76vw] leading-tight text-neutral-600">
              LeetCode
            </Text>
          </>
        )}
      </Pressable>

      {isSelect && (
        <Pressable
          className="absolute mt-[75.46vh] ml-[35.385vw] bg-[#FFAA44] w-[29.3vw] h-[5.664vh] rounded-[10px] items-center justify-center"
          onPress={() => handleLogin()}>
          <Text className="text-[1.76vw] leading-tight text-white font-semibold">
            Sign me in to LeetCode
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};
