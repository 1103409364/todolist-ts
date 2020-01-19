/**
 * @param key 保存的键，本项目是 todolist
 * @param value 要保存的值
 */
interface storeType {
  key?: Array<TodoItem>;
}

export const setStore = (key: string, value: Array<TodoItem>): void => {
  let localstoreStr: string | null = window.localStorage.getItem('__data__');
  let localstore: storeType;

  if (!localstoreStr) {
    localstore = {};
  } else {
    localstore = JSON.parse(localstoreStr);
  }
  localstore = {
    [key]: value //属性是变量要加方括号
  };
  // localstore[key] = value;
  window.localStorage.setItem('__data__', JSON.stringify(localstore));
};
export const getStore = (
  key: string,
  defaultValue: Array<TodoItem>
): Array<TodoItem> => {
  let localstoreStr = window.localStorage.getItem('__data__');
  let localstore;
  if (!localstoreStr) return defaultValue;

  localstore = JSON.parse(localstoreStr);

  if (!localstore) return defaultValue;

  let ret = localstore[key];
  return ret || defaultValue;
};

// 移除所有 localStorage.clear();移除一项 removeItem()
export const clearStore = (): void => {
  window.localStorage.removeItem('__data__');
};
