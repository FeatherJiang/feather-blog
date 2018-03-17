import React from 'react';
import PropTypes from 'prop-types';
import Mark from 'marked';

const style = {
  articleMarkdown: {
    padding: '20px',
  },
};

export default function ArticleMarkdown(props) {
  /* eslint-disable */
  return (
    <div
      className="ArticleMarkdown"
      style={style.articleMarkdown}
      dangerouslySetInnerHTML={{ __html: Mark(props.content) }}
    />
  );
  /* eslint-enable */
}

ArticleMarkdown.propTypes = {
  content: PropTypes.string.isRequired,
};

