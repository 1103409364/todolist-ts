import React, { SFC } from 'react';
import style from './TodoBody.module.scss';
import { TODOTYPE } from './todoType';
import { timeFilter } from '../utils/filter';

// import { MouseEventHandler } from 'react';
// interface TodoItem {
//   id: number;
//   content: string;
//   complete: boolean;
// }

interface BodyProps {
  name: string;
  list: Array<TodoItem>;
  todoType: string;
  handleDelTodo(itemId: number): void;
  handleComplete(itemId: number): void;
  handleRestore(itemId: number): void;
}

const TodoBody: SFC<BodyProps> = ({ name, list, todoType, ...restProps }) => {
  // React.FunctionComponent为对icon组件的类型测试，后面是传入的值的类型
  const delTodo = (item: number): void => {
    restProps.handleDelTodo(item);
  };

  const completeTodo = (item: number): void => {
    restProps.handleComplete(item);
  };

  const restoreTodo = (item: number): void => {
    restProps.handleRestore(item);
  };

  return (
    <div className={style['todo-body']}>
      <ul>
        {list
          .filter(item => {
            if (todoType === TODOTYPE.UNDONE) {
              return !item.complete;
            }
            if (todoType === TODOTYPE.DONE) {
              return item.complete;
            }
            return item;
          })
          .map((item: TodoItem, i: number) => (
            <li
              key={item.id}
              className={`${style.item} ${
                style[item.complete ? 'complete' : '']
              }`}
            >
              <span className={style.time}>{timeFilter(item.id)}</span>
              <div className={style['content']}>{item.content}</div>
              <div className={style['btn-wrap']}>
                {item.complete ? (
                  <button
                    className={style['complete-btn']}
                    onClick={() => restoreTodo(item.id)}
                  >
                    撤销
                  </button>
                ) : (
                  <button
                    className={style['complete-btn']}
                    onClick={() => completeTodo(item.id)}
                  >
                    完成
                  </button>
                )}

                <button
                  className={style['del-btn']}
                  onClick={() => delTodo(item.id)}
                >
                  删除
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoBody;
