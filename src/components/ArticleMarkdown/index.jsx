import React from 'react';
import PropTypes from 'prop-types';
import Mark from 'marked';

const style = {
  articleMarkdown: {
    padding: '20px',
  },
};

export default class ArticleMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  componentWillMount() {
    const content = Mark(this.props.source);
    this.setState({ content });
  }
  /* eslint-disable */
  render() {
    return (
      <div
        className="ArticleMarkdown"
        style={style.articleMarkdown}
        dangerouslySetInnerHTML={{ __html: this.state.content }}
      />
    );
  }
  /* eslint-enable */
}

ArticleMarkdown.propTypes = {
  source: PropTypes.string.isRequired,
};

