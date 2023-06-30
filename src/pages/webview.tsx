import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import WebView from 'react-native-webview';
import ApiCaller from '../api/apicaller';
import {Credential} from '../api/interfaces';

export const WebViewPage = () => {
  const navigator: any = useNavigation();
  const handleNavigationStateChange = async (newNavState: any) => {
    const url = newNavState.url;
    if (url === 'https://leetcode.com/') {
      const cookies = await CookieManager.getAll(true);

      if (cookies && cookies.LEETCODE_SESSION && cookies.csrftoken) {
        const session = cookies.LEETCODE_SESSION.value;
        const csrftoken = cookies.csrftoken.value;
        ApiCaller.getInstance().setCredential({
          session,
          csrftoken,
        } as Credential);
        await AsyncStorage.setItem('@session_value', session);

        await AsyncStorage.setItem('@csrftoken', csrftoken);

        await CookieManager.clearAll(true);
        navigator.navigate('main');
      }
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
