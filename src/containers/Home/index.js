import React, {PureComponent} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import Container from '../../components/Layout';
import Search from '../../components/Search';
import { actions, selectors } from '../../reducers/users';
import User from '../../components/User';
import css from './home.scss';

class Home extends PureComponent {

    render() {
        const { users, filter, updateFilter } = this.props;
        const filtered = selectors.getFilteredUsers(users, filter);

        return (
            <Container>
                <div className={css.searchW}>
                    <Search
                        users={users}
                        filter={filter}
                        updateFilter={updateFilter}
                    />
                </div>
                <div className={css.resultBox}>
                    {filtered.map(user => <User key={user.id} {...user} />)}
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
