import React from 'react';
import { Link } from 'react-router-dom';

import css from './user.scss';

const User = ({ id, name, gender, age, company }) => {
    return (
        <div className={css.box}>
            <Link to={`/person/${id}`} className={css.name}>{name}</Link>
            <div className={css.info}>
                {gender}, {age} y.o., works for {company}
            </div>
        </div>
    );
};

export default User;