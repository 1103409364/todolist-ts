import React, { useState } from 'react';
import { SFC } from 'react';
import { ChangeEvent } from 'react';
import style from './Header.module.scss';

// interface TodoItem {
//   id: number;
//   content: string;
//   complete: boolean;
// }
interface HeaderProps {
  name: string;
  handleAddClick(todoItem: object): void;
}
// React.FunctionComponent为对Header组件的类型测试，后面是传入的值的类型,
// 在 React 的声明文件中 已经定义了一个 SFC 类型，使用这个类型可以避免我们重复定义
const Header: SFC<HeaderProps> = ({ name, ...restProps }) => {
  let initItem: TodoItem = {
    id: 0,
    content: '',
    complete: false
  };
  const [todoItem, setTodo] = useState(initItem);
  const [tips, setTips] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let content: string = e.target.value.trimStart();

    let item: TodoItem = {
      id: Date.now(),
      content,
      complete: false
    };
    setTips('');
    setTodo(item);
  };

  const addTodoItem = (): void => {
    if (todoItem.content === '') {
      setTips('输入内容为空！');
      return;
    }
    restProps.handleAddClick(todoItem);
    setTodo(initItem);
  };

  return (
    <div className={style.todoHeader}>
      <div className={style['todo-header']}>{name}</div>
      <div className={style['input-wrap']}>
        <input
          type="text"
          value={todoItem.content}
          onChange={handleChange}
          placeholder="请输入"
        />
        <button onClick={addTodoItem}>+</button>
      </div>
      <span className={style.tips}>{tips}</span>
    </div>
  );
};

export default Header;
