import {schema} from './models';
import {createSelector} from 'redux-orm';

export const ormSelector = (state) => {
    return state.orm;
};

export const todos = createSelector(
    ormSelector,
    state => state.selectedUserId,
    schema.createSelector((orm, userId) => {
        return orm.Todo.withRefs.filter({ user: userId }).map(todo => {
            const obj = Object.assign({}, todo.ref);
            obj.tags = todo.tags.withRefs.map(tag => tag.name);

            return obj;
        });
    })
);

export const user = createSelector(
    ormSelector,
    state => state.selectedUserId,
    schema.createSelector((orm, selectedUserId) => {
        return orm.User.withId(selectedUserId).ref;
    })
);

export const users = createSelector(
    ormSelector,
    schema.createSelector((orm) => {
        return orm.User.all().toRefArray();
    })
);