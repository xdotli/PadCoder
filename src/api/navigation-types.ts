import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface RootStackParamList extends ParamListBase {
  main: undefined;
  coding: {titleSlug: string};
}

export type CodingRouteParams = {
  titleSlug: string, 
}

export type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'main'>;

export type CodingRouteNavigationProp = {params: CodingRouteParams};


