import {Model, many, fk} from 'redux-orm';
import {Schema} from 'redux-orm'
import {
    CREATE_TODO,
    MARK_DONE,
    DELETE_TODO,
    ADD_TAG_TO_TODO,
    REMOVE_TAG_FROM_TODO,
} from './actionTypes';

export class Todo extends Model {
    static reducer(action, SessionSpecificModel, session) {
        const {payload, type} = action;
        switch (type) {
        case CREATE_TODO:
            const tagIds = action.payload.tags.split(',').map(str => str.trim());
            const props = Object.assign({}, payload, { tags: tagIds });
            Todo.create(props);
            break;
        case MARK_DONE:
            Todo.withId(payload).set('done', true);
            break;
        case DELETE_TODO:
            Todo.withId(payload).delete();
            break;
        case ADD_TAG_TO_TODO:
            Todo.withId(payload.todo).tags.add(payload.tag);
            break;
        case REMOVE_TAG_FROM_TODO:
            Todo.withId(payload.todo).tags.remove(payload.tag);
            break;
        }

        return Todo.getNextState();
    }
}
Todo.modelName = 'Todo';
Todo.fields = {
    tags: many('Tag', 'todos'),
    user: fk('User', 'todos'),
};

export class Tag extends Model {
    static reducer(state, action, Tag) {
        const { payload, type } = action;
        switch (type) {
        case CREATE_TODO:
            const tags = payload.tags.split(',');
            const trimmed = tags.map(name => name.trim());
            trimmed.forEach(name => Tag.create({ name }));
            break;
        case ADD_TAG_TO_TODO:
            if (!Tag.filter({ name: payload.tag }).exists()) {
                Tag.create({ name: payload.tag });
            }
            break;
        }
    }
}
Tag.modelName = 'Tag';
Tag.backend = {idAttribute: 'name'};

export class User extends Model {}
User.modelName = 'User';

export const schema = new Schema();
schema.register(Todo, Tag, User);

export default schema;