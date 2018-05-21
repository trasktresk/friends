import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './search.scss';


class Search extends Component {

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

    static defaultProps = {
        filter: {
            name: '',
            gender: null,
            ageFrom: '',
            ageTo: '',
            company: ''
        }
    };

    static propTypes = {
        userId: PropTypes.number,
        filter: PropTypes.shape({
            name: PropTypes.string.isRequired,
            gender: PropTypes.string,
            ageFrom: PropTypes.string,
            ageTo: PropTypes.string,
            company: PropTypes.string.isRequired
        })
    };

    onGenderClick(gender) {
        const { updateFilter, filter, userId } = this.props;

        if (userId) {
            updateFilter(userId, { ...filter, gender });
        } else {
            updateFilter({ ...filter, gender });
        }
    }

    onNameInput(e) {
        const { updateFilter, filter, userId } = this.props;

        if (userId) {
            updateFilter(userId, { ...filter, name: e.target.value });
        } else {
            updateFilter({ ...filter, name: e.target.value });
        }
    }

    onAgeFromInput(e) {
        const { updateFilter, filter, userId } = this.props;
        const ageFrom = e.target.value;

        if (userId) {
            updateFilter(userId, { ...filter, ageFrom });
        } else {
            updateFilter({ ...filter, ageFrom });
        }
    }

    onAgeToInput(e) {
        const { updateFilter, filter, userId } = this.props;
        const ageTo = e.target.value;

        if (userId) {
            updateFilter(userId, { ...filter, ageTo });
        } else {
            updateFilter({ ...filter, ageTo });
        }
    }

    onCompanyInput(e) {
        const { updateFilter, filter, userId } = this.props;

        if (userId) {
            updateFilter(userId, { ...filter, company: e.target.value });
        } else {
            updateFilter({ ...filter, company: e.target.value });
        }
    }

    render() {
        const { filter } = this.props;

        return (
            <div>
                <input
                    type="text"
                    className={[css.field, css.fieldBig].join(' ')}
                    placeholder="Search"
                    value={filter.name}
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
                            onChange={() => {}}
                            checked={filter.gender === 'male'}
                        />
                        <label htmlFor="male" className={css.filterGenderLabel} onClick={e => this.onGenderClick('male')}>male</label>

                        &nbsp;/&nbsp;

                        <input
                            id="female"
                            className={css.filterGenderRadio}
                            name="gender"
                            type="radio"
                            value="female"
                            onChange={() => {}}
                            checked={filter.gender === 'female'}
                        />
                        <label htmlFor="female" className={css.filterGenderLabel} onClick={e => this.onGenderClick('female')}>female</label>

                        &nbsp;/&nbsp;

                        <input
                            id="not-specified"
                            className={css.filterGenderRadio}
                            name="gender"
                            type="radio"
                            value="not-specified"
                            checked={filter.gender === null}
                            onChange={() => {}}
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
                            value={filter.ageFrom}
                            onInput={this.onAgeFromInput}
                        />
                        <span className={css.filterLabel}>to</span>
                        <input
                            type="text"
                            className={[css.field, css.fieldSecondary, css.fieldSecondaryAge].join(' ')}
                            value={filter.ageTo}
                            onInput={this.onAgeToInput}
                        />
                    </div>

                    <div className={css.boxVm}>
                        <span className={css.filterLabel}>works for</span>
                        <input
                            type="text"
                            className={[css.field, css.fieldSecondary, css.fieldSecondaryWork].join(' ')}
                            value={filter.company}
                            onInput={this.onCompanyInput}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
