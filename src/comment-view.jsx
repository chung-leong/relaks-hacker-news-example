import { h } from 'preact';
import { PureComponent } from './pure-component.jsx';
import { CommentList } from './comment-list.jsx';

/** @jsx h */

class CommentView extends PureComponent {
  render() {
    const { comment, reply } = this.props;
    let iconClass = 'fa-heart ' + (reply ? 'far' : 'fas');
    let author, text;
    if (comment) {
      if (!comment.deleted) {
        author = `${comment.by}:`;
        text = <HTML markup={comment.text} />;
      } else {
        iconClass = 'fa-sad-tear fas';
        author = '[deleted]';
      }
    } else {
      author = <span className="pending">...</span>;
      text = '\u00a0';
    }
    return (
      <div className="comment">
        <div className="icon">
          <i className={iconClass} />
        </div>
        <div className="contents">
          <div className="by">{author}</div>
          <div className="text">{text}</div>
          {this.renderReplies()}
        </div>
      </div>
    );
  }

  renderReplies() {
    const { comment } = this.props;
    if (!comment || !comment.kids || comment.kids.length === 0) {
      return null;
    }
    const listProps = { commentIDs: comment.kids, replies: true };
    return (
      <div className="replies">
        <CommentList {...listProps} />
      </div>
    );
  }
}

function HTML(props) {
  const markup = { __html: props.markup };
  return <span dangerouslySetInnerHTML={markup} />;
}

export { CommentView };
