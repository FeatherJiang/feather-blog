import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

const style = {
  pagination: {
    display: 'flex',
  },
  pre: {
    flex: '0 0 40px',
  },
  pageWapper: {
    flex: '1 0 auto',
    textAlign: 'center',
    lineHeight: '40px',
  },
  next: {
    flex: '0 0 40px',
  },
};

function Pagination(props) {
  return (
    <div className="Pagination" style={style.pagination}>
      <div className="pre" style={style.pre}>
        {
          props.page !== 1 ?
            <FloatingActionButton mini onClick={props.onClickPre}>
              <KeyboardArrowLeftIcon />
            </FloatingActionButton> : null
        }
      </div>
      <div className="pageWapper" style={style.pageWapper}>
        <span>{props.page}</span>
      </div>
      <div className="next" style={style.next}>
        {
          props.count - (props.page * props.limit) >= 1 ?
            <FloatingActionButton mini onClick={props.onClickNext}>
              <KeyboardArrowRightIcon />
            </FloatingActionButton> : null
        }
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onClickPre: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default Pagination;
