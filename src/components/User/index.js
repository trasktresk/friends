import React from 'react';
import css from './user.scss';

const User = ({ name, gender, age, company }) => {
    return (
        <div className={css.box}>
            <div className={css.name}>{name}</div>
            <div className={css.info}>
                {gender}, {age} y.o., works for {company}
            </div>
        </div>
    );
};

export default User;