import React from 'react';
import {connect} from 'react-redux';
import {
    selectUser, createTodo, markDone,
    deleteTodo, addTagToTodo, removeTagFromTodo,
} from '../../utils/store/models/actions';
import {todos, user, users} from '../../utils/store/models//selectors';

class Busket extends React.Component<any, any> {
    render() {
        const {
            todos,users,selectedUser,
            selectUser,createTodo,
        } = this.props;

        console.log('Props received by Busket component:', this.props);

        const todoItems = todos.map((todo: any) => {
            return (
                <ul key={todo.id}>
                    <li>{`tags: ${todo.tags}`}</li>
                    <li>{`done: ${todo.done}`}</li>
                    <li>{`text: ${todo.text}`}</li>
                </ul>
            );
        });

        const userChoices = users.map((user: any) => {
            return <option key={user.id} value={user.id}>{user.name}</option>;
        });

        const onUserSelect = (userId: any) => {
            selectUser(userId);
        };

        const onCreate = ({text, tags}: any) => createTodo({ text, tags, user: selectedUser.id});
        
        return (
            <div>
                <h1>Todos for {selectedUser.name}</h1>
                <div onSelect={onUserSelect}>
                    {userChoices}
                </div>
                <ul className="list-group">
                    {todoItems}
                </ul>
                <h2>Add Todo for {selectedUser.name}</h2>
            </div>
        );
    }
}

// This function takes the Redux state, runs the
// selectors and returns the props passed to App.
function stateToProps(state: any) {
    return {
        todos: todos(state),
        selectedUser: user(state),
        users: users(state),
    };
}

// This maps our action creators to props and binds
// them to dispatch.
const dispatchToProps = {
    selectUser,
    createTodo,
    markDone,
    deleteTodo,
    addTagToTodo,
    removeTagFromTodo,
};

export default connect(stateToProps, dispatchToProps)(Busket);