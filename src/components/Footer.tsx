import React, { SFC, useState } from 'react';
import style from './Footer.module.scss';
import { TODOTYPE } from './todoType';

interface FooterProps {
  name: string;
  filterTodo: (type: string) => void;
  // filterTodo(type: string): void; //声明函数类型，两种方式等价
}

// interface Tab {
//   tabName: string;
//   tabId: string;
//   type: string;
// }
// React.FunctionComponent为对Footer组件的类型测试，后面是传入的值的类型
const Footer: SFC<FooterProps> = ({ name, filterTodo, ...restProps }) => {
  const tabData: Array<Tab> = [
    { tabName: '全部', tabId: '0', type: TODOTYPE.ALL },
    { tabName: '未完成', tabId: '1', type: TODOTYPE.ALL },
    { tabName: '已完成', tabId: '2', type: TODOTYPE.ALL }
  ];

  const [activeTab, setActiveTab] = useState('0');

  const handleClick = (tabIndex: string): void => {
    setActiveTab(tabIndex);

    filterTodo(tabIndex);
  };

  return (
    <div className={style['footer-wrap']}>
      {tabData.map((item: Tab) => (
        <div
          className={`${style.tab} ${
            style[activeTab === item.tabId ? 'active' : '']
          }`}
          key={item.tabName}
          onClick={() => {
            handleClick(item.tabId);
          }}
        >
          {item.tabName}
        </div>
      ))}
    </div>
  );
};

export default Footer;
