import {atom} from 'recoil';
import {Token} from './types/token';

export const tokenState = atom({
  key: 'tokenState',
  default: null as unknown as Token,
});
