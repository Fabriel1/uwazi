import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

const MarkdownLink = ({ url, label, icon, className, children }) => (
  icon ?
    <div className={`icon-link ${className}`}>
      <Link to={url} href={url}>
        <div><i className={`fa fa-${icon}`} /></div>
        <span>{label}</span>
      </Link>
    </div>
    : <Link to={url} href={url}>{children}</Link>
);

MarkdownLink.defaultProps = {
  icon: '',
  className: ''
};

MarkdownLink.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default MarkdownLink;
