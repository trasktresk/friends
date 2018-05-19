import React from 'react';

import css from './layout.scss';

export default class Container extends React.PureComponent {
    render() {
        return (
            <div className={css.container}>{this.props.children}</div>
        );
    }
}