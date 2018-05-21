export const USERS_INITIAL_UPDATE = 'USERS_INITIAL_UPDATE';
export const USERS_UPDATE_FILTER = 'USERS_UPDATE_FILTER';
export const USERS_UPDATE_FRIENDS_FILTER = 'USERS_UPDATE_FRIENDS_FILTER';

const initialFilter = {
    name: '',
    gender: null,
    ageFrom: '',
    ageTo: '',
    company: ''
};

const initialState = {
    all: [],
    filter: initialFilter
};

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case USERS_INITIAL_UPDATE:
            return { ...state, all: action.payload.map(user => ({...user, filter: initialFilter})) };
        case USERS_UPDATE_FILTER:
            return { ...state, filter: action.payload };
        case USERS_UPDATE_FRIENDS_FILTER:
            return {
                ...state,
                all: state.all.map(user => {
                    if (user.id === action.payload.userId) {
                        user.filter = action.payload.filterObj;
                    }
                    return user;
                })
            };
        default:
            return state;
    }
}

export const actions = {
    updateFilter(filterObj) {
        return { type: USERS_UPDATE_FILTER, payload: filterObj };
    },
    updateUserFriendsFilter(userId, filterObj) {
        return {
            type: USERS_UPDATE_FRIENDS_FILTER,
            payload: { userId, filterObj }
        };
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

        return filtered;
    },

    getUserById(users, id) {
        return users.find(user => user.id === id);
    }
};