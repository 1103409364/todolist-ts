import React, { SFC, useState, useEffect } from 'react';
import Header from './components/Header';
import TodoBody from './components/TodoBody';
import Footer from './components/Footer';
import { TODOTYPE } from './components/todoType';
import { setStore, getStore } from './utils/storage';
import './App.scss';

// import { MouseEventHandler } from 'react';
// interface IconProps extends React.SVGAttributes<SVGElement> {
//   name: string;
//   handleClick: React.MouseEventHandler<Element>;
// }
// const fn: React.MouseEventHandler<SVGAElement | SVGUseElement> = e => {
//   console.log(e.target as HTMLDivElement);
// };

interface AppProps {
  name: string;
}
// 放到.d.ts中
// interface TodoItem {
//   id: number;
//   content: string;
//   complete: boolean;
// }

// 在 React 的声明文件中 已经定义了一个 SFC 类型，使用这个类型可以避免我们重复定义 children、 propTypes、 contextTypes、 defaultProps、displayName 的类型。
const App: SFC<AppProps> = ({ name, ...restProps }) => {
  // React.FunctionComponent(SFC)为对组件的类型测试，后面是传入的值的类型
  let initial: Array<TodoItem> = [];
  const [todoList, setTodoList] = useState(initial);
  const [todoType, setType] = useState(TODOTYPE.ALL);
  const [count, setCount] = useState(0);
  // useEffect中定义的副作用函数的执行不会阻碍浏览器更新视图，也就是说这些函数是异步执行的
  // 跳过一些不必要的计算:给useEffect传第二个参数即可。告诉react只有当这个参数的值发生改变时，才执行我们传的副作用函数（第一个参数）。
  // 当我们第二个参数传一个空数组[]时，其实就相当于[只在]首次渲染的时候执行。也就是componentDidMount加componentWillUnmount的模式。
  useEffect(() => {
    // 默认返回一个空数组
    let todolist = getStore('todolist', []);
    setTodoList(todolist);
  }, []); // 首次渲染时从本地缓存取，加上 todolist 会死循环

  useEffect(() => {
    setStore('todolist', todoList);
  }, [todoList]); // 只在todolist发生变化时执行

  useEffect(() => {
    document.title = `You add ${count} times`;
  }, [count]);

  const handleAddClick = (
    // e: MouseEventHandler<HTMLInputElement>,
    todoitem: TodoItem
  ): void => {
    let newList: Array<TodoItem> = [todoitem, ...todoList];
    setCount(count + 1);
    setTodoList(newList);
  };

  const handleDelTodo = (itemId: number): void => {
    let newList: Array<TodoItem> = todoList.filter(
      (item: TodoItem): boolean => item.id !== itemId
    );
    setTodoList(newList);
  };
  const handleComplete = (itemId: number): void => {
    let newList: Array<TodoItem> = todoList.map(
      (item: TodoItem): TodoItem => {
        if (item.id === itemId) {
          item.complete = true;
        }
        return item;
      }
    );
    setTodoList(newList);
  };

  const handleRestore = (itemId: number): void => {
    let newList: Array<TodoItem> = todoList.map(
      (item: TodoItem): TodoItem => {
        if (item.id === itemId) {
          item.complete = false;
        }
        return item;
      }
    );
    setTodoList(newList);
  };

  const filterTodo = (type: string): void => {
    console.log(type);
    // let newList =
    setType(type);
  };

  return (
    <div className="todo-wrap">
      {/* <button onClick={() => clearStore()}>clear</button> */}
      <Header name={name} handleAddClick={handleAddClick} />
      <TodoBody
        name="TodoBody"
        todoType={todoType}
        list={todoList}
        handleDelTodo={handleDelTodo}
        handleComplete={handleComplete}
        handleRestore={handleRestore}
      />
      <Footer name="footer" filterTodo={filterTodo} />
    </div>
  );
};

export default App;
