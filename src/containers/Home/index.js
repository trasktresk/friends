import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Container from '../../components/Layout';
import Search from '../../components/Search';
import { actions, selectors } from '../../reducers/users';
import User from '../../components/User';
import css from './home.scss';

class Home extends PureComponent {

    componentDidMount() {
        console.log(this.props.filter);
    }

    render() {
        const { users, filter } = this.props;
        const filtered = selectors.getFilteredUsers(users, filter);

        return (
            <Container>
                <div className={css.searchW}>
                    <Search />
                </div>
                <div className={css.resultBox}>
                    {filtered.map(user => <User key={user.id} {...user}>{user.name}</User>)}
                </div>
            </Container>
        );
    }
}

export default connect(
    state => ({
        users: state.users.all,
        filter: state.users.filter
    }),
    dispatch => ({
        updateFilter: bindActionCreators(actions.updateFilter, dispatch)
    })
)(Home);
