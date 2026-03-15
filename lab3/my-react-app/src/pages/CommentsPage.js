import React from 'react';
import CommentList from '../components/CommentList';

function CommentsPage({ comments, onAddComment }) {
  return (
    <main>
      <CommentList comments={comments} onAddComment={onAddComment} />
    </main>
  );
}

export default CommentsPage;