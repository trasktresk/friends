export const USERS_INITIAL_UPDATE = 'USERS_INITIAL_UPDATE';
export const USERS_UPDATE_FILTER = 'USERS_UPDATE_FILTER';

const initialState = {
    all: [],
    filter: {
        name: '',
        gender: null,
        ageFrom: 0,
        ageTo: 0,
        company: ''
    }
};

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case USERS_INITIAL_UPDATE:
            return { ...state, all: action.payload };
        case USERS_UPDATE_FILTER:
            return { ...state, filter: action.payload };
        default:
            return state;
    }
}

export const actions = {
    updateFilter(filterObj) {
        return { type: USERS_UPDATE_FILTER, payload: filterObj };
    }
};

export const selectors = {
    getFilteredUsers(users, filter) {
        let filtered = users;

        if (filter.name) {
            filtered = filtered.filter(user => user.name.toLowerCase().includes(filter.name.toLowerCase()));
        }

        if (filter.gender) {
            filtered = filtered.filter(user => user.gender === filter.gender);
        }

        if (filter.ageFrom) {
            filtered = filtered.filter(user => user.age >= filter.ageFrom);
        }

        if (filter.ageTo) {
            filtered = filtered.filter(user => user.age <= filter.ageTo);
        }

        if (filter.company) {
            filtered = filtered.filter(user => user.company.toLowerCase().includes(filter.company.toLowerCase()));
        }

        return filtered === users ? [] : filtered;
    }
};