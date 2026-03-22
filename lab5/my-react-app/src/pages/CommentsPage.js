import React from 'react';
import CommentList from '../components/CommentList';

// Зміни лише перший рядок і виклик компонента:
function CommentsPage({ comments, onAddComment, user }) { // Додали user
  return (
    <main>
      <CommentList comments={comments} onAddComment={onAddComment} user={user} /> 
    </main>
  );
}

export default CommentsPage;