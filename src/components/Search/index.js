import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { actions, selectors } from '../../reducers/users';
import css from './search.scss';


class Search extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            genderSelected: null
        };

        this.onGenderClick = this.onGenderClick.bind(this);
        this.onNameInput = this.onNameInput.bind(this);
        this.onAgeFromInput = this.onAgeFromInput.bind(this);
        this.onAgeToInput = this.onAgeToInput.bind(this);
        this.onCompanyInput = this.onCompanyInput.bind(this);
    }

    static defaultProps = {};

    static propTypes = {};

    componentDidUpdate() {
        console.log(this.state.genderSelected);
    }

    onGenderClick(gender) {
        const { updateFilter, filter } = this.props;

        updateFilter({ ...filter, gender });
        this.setState({ genderSelected: gender });
    }

    onNameInput(e) {
        const { updateFilter, filter } = this.props;

        updateFilter({ ...filter, name: e.target.value });
    }

    onAgeFromInput(e) {
        const { updateFilter, filter } = this.props;
        const ageFrom = parseInt(e.target.value, 10) || 0;

        updateFilter({ ...filter, ageFrom });
    }

    onAgeToInput(e) {
        const { updateFilter, filter } = this.props;
        const ageTo = parseInt(e.target.value, 10) || 0;

        updateFilter({ ...filter, ageTo });
    }

    onCompanyInput(e) {
        const { updateFilter, filter } = this.props;

        updateFilter({ ...filter, company: e.target.value });
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    className={[css.field, css.fieldBig].join(' ')}
                    placeholder="Search"
                    onInput={this.onNameInput}
                />

                <div className={css.filters}>
                    <div>
                        <input
                            id="male"
                            className={css.filterGenderRadio}
                            name="gender"
                            type="radio"
                            value="male"
                            checked={this.state.genderSelected === 'male'}
                        />
                        <label htmlFor="male" className={css.filterGenderLabel} onClick={e => this.onGenderClick('male')}>male</label>

                        &nbsp;/&nbsp;

                        <input
                            id="female"
                            className={css.filterGenderRadio}
                            name="gender"
                            type="radio"
                            value="female"
                            checked={this.state.genderSelected === 'female'}
                        />
                        <label htmlFor="female" className={css.filterGenderLabel} onClick={e => this.onGenderClick('female')}>female</label>

                        &nbsp;/&nbsp;

                        <input
                            id="not-specified"
                            className={css.filterGenderRadio}
                            name="gender"
                            type="radio"
                            value="not-specified"
                            defaultChecked
                        />
                        <label
                            htmlFor="not-specified"
                            className={css.filterGenderLabel}
                            onClick={e => this.onGenderClick(null)}
                        >not specified</label>
                    </div>

                    <div className={css.boxVm}>
                        <span className={css.filterLabel}>age from</span>
                        <input
                            type="text"
                            className={[css.field, css.fieldSecondary, css.fieldSecondaryAge].join(' ')}
                            onInput={this.onAgeFromInput}
                        />
                        <span className={css.filterLabel}>to</span>
                        <input
                            type="text"
                            className={[css.field, css.fieldSecondary, css.fieldSecondaryAge].join(' ')}
                            onInput={this.onAgeToInput}
                        />
                    </div>

                    <div className={css.boxVm}>
                        <span className={css.filterLabel}>works for</span>
                        <input
                            type="text"
                            className={[css.field, css.fieldSecondary, css.fieldSecondaryWork].join(' ')}
                            onInput={this.onCompanyInput}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        filter: state.users.filter
    }),
    dispatch => ({
        updateFilter: bindActionCreators(actions.updateFilter, dispatch)
    })
)(Search);
