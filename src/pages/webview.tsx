import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import WebView from 'react-native-webview';

export const WebViewPage = () => {
  const navigator: any = useNavigation();
  const handleNavigationStateChange = async (newNavState: any) => {
    const url = newNavState.url;
    if (url === 'https://leetcode.com/') {
      CookieManager.getAll(true).then(async res => {
        await AsyncStorage.setItem(
          '@session_value',
          res.LEETCODE_SESSION.value,
        );
        await AsyncStorage.setItem(
          '@session_expiration',
          res.LEETCODE_SESSION.expires?.substring(0, 10) as string,
        );
        await AsyncStorage.setItem('@csrftoken', res.csrftoken.value);
        await CookieManager.clearAll(true);

        navigator.navigate('main');
      });
    }
  };
  return (
    <WebView
      originWhitelist={['*']}
      limitsNavigationsToAppBoundDomains={true}
      source={{uri: 'https://leetcode.com/accounts/login/'}}
      onNavigationStateChange={handleNavigationStateChange}
      thirdPartyCookiesEnabled={true}
    />
  );
};
