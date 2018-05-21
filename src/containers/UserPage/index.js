import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from '../../components/Layout';
import Search from '../../components/Search';
import User from '../../components/User';
import { actions, selectors } from '../../reducers/users';
import css from './userPage.scss';

class UserPage extends Component {
    static defaultProps = {
        user: {
            friends: [],
            filter: {
                name: '',
                gender: null,
                ageFrom: '',
                ageTo: '',
                company: ''
            }
        }
    };

    static propTypes = {
        user: PropTypes.shape({
            friends: PropTypes.array,
            filter: PropTypes.shape({
                name: PropTypes.string.isRequired,
                gender: PropTypes.string,
                ageFrom: PropTypes.string,
                ageTo: PropTypes.string,
                company: PropTypes.string.isRequired
            })
        })
    };

    render() {
        const { user, users, updateFilter } = this.props;
        const friends = user.friends.map(friendId => {
            return users.find(user => user.id === friendId);
        });
        const filtered = selectors.getFilteredUsers(friends, user.filter);

        return (
            <Container>
                <div className={css.btnBox}>
                    <Link to="/" className={css.btn}>Home</Link>
                </div>
                <div className={css.info}>
                    <div className={css.infoAva}>
                        <img src={`https://ui-avatars.com/api/?size=134&name=${user.name}`} alt=""/>
                    </div>
                    <div className={css.infoBox}>
                        <div className={css.infoItem}><strong>Name:</strong> {user.name}</div>
                        <div className={css.infoItem}><strong>Age:</strong> {user.age}</div>
                        <div className={css.infoItem}><strong>Gender:</strong> {user.gender}</div>
                        <div className={css.infoItem}><strong>Works for:</strong> {user.company}</div>
                        <div className={css.infoItem}><strong>E-mail:</strong> {user.email}</div>
                    </div>
                </div>
                <div className={css.searchW}>
                    <Search
                        users={users}
                        filter={user.filter}
                        updateFilter={updateFilter}
                        userId={user.id}
                    />
                </div>
                <h1 className={css.header}>Friends</h1>
                <div className={css.result}>
                    {filtered.map(user => <User key={user.id} {...user} />)}
                </div>
            </Container>
        );
    }
}

export default connect(
    (state, props) => ({
        user: selectors.getUserById(state.users.all, parseInt(props.match.params.id, 10)),
        users: state.users.all,
        filter: state.users.filter
    }),
    dispatch => ({
        updateFilter: bindActionCreators(actions.updateUserFriendsFilter, dispatch)
    })
)(UserPage);

