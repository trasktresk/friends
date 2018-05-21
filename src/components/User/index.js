import React from 'react';
import { Link } from 'react-router-dom';

import css from './user.scss';

const User = ({ id, name, gender, age, company }) => {
    return (
        <div className={css.box}>
            <div className={css.boxAva}>
                <img src={`https://ui-avatars.com/api/?size=44&font-size=0.33&name=${name}`} alt=""/>
            </div>
            <div className={css.boxDetails}>
                <Link to={`/person/${id}`} className={css.name}>{name}</Link>
                <div className={css.info}>{gender}, {age} y.o., works for {company}</div>
            </div>

        </div>
    );
};

export default User;