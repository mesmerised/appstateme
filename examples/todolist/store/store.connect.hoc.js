import { connect } from '../appstateme';
import TodoListStore from './store';
import * as TodoListActions from '../actions';

// connect store with actions to create an HOC
export default connect(TodoListStore, TodoListActions);
