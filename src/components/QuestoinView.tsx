import React from 'react';
import {ScrollView, useColorScheme, useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {ProblemDetail} from '../api/interfaces';

export interface QuestionViewProps {
  question: ProblemDetail;
}

export const QuestionView: React.FC<QuestionViewProps> = ({question}) => {
  const theme = useColorScheme();
  const {width} = useWindowDimensions();

  const tagStyles = {
    body: {
      color: theme === 'dark' ? '#FFFDF3' : 'black',
    },
  };
  return (
    <ScrollView className="ml-[2.271vw] mr-[2vw]">
      <RenderHTML
        tagsStyles={tagStyles}
        contentWidth={width}
        source={{html: question.content}}
      />
    </ScrollView>
  );
};
