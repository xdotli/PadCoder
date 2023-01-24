import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';

import {ListLeaf} from './list-leaf';

export enum ExpandType {
  LEAF,
  NODE,
}

export interface ListNode {
  title: string;
  expandType: ExpandType;
  children: ListNode[] | ListLeaf []
}

interface ListNodeProps {
  title: string;
  // expandType: ExpandType;
  data: ListNode | ListLeaf;
}



export const ListNode = ({title, data}: ListNodeProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const _handlePress = () => {
    setIsCollapsed(!isCollapsed);
  }


  return (
    <View>
      <Pressable onPress={_handlePress}>
        <Text>{title}</Text>
        {!isCollapsed && data.children.map((child, index) => (
          <ListNode title={data.title} key={index} data={child} />
        ))}
      </Pressable>
    </View>
  );
};
