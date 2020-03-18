import React from 'react';
import { ScrollView } from 'react-native';
import OpenComment from '@components/OpenComment';
import ClosedComment from '@components/ClosedComment';

export default function Comments(props) {
  const { t, i18n, userid } = props;
  const comments = props.comments ? props.comments : [];
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <ClosedComment /> */}
      {comments.map((value, index) => {
        return (
          <OpenComment
            userid={userid}
            comment={value}
            t={t}
            replyPressed={props.replyPressed}
            key={index}
            deletePressed={props.deletePressed}
            userLevel={props.userLevel}
            viewComment={props.viewComment}
            refreshCommentList={props.refreshCommentList}
          />
        );
      })}
    </ScrollView>
  );
}
