import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <div className="section">
      
        <span className="subtitle is-4 text-light">Comments</span>
    
      <div className="box">
        {comments &&
          comments.map(comment => (
            <p className="pill mb-3" key={comment._id}>
              {comment.commentBody} {' '}
              <a>
                By {comment.username}
              </a>
            </p>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
