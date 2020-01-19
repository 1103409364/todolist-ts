// 自定义类型
interface TodoItem {
  id: number;
  content: string;
  complete: boolean;
}

interface Tab {
  tabName: string;
  tabId: string;
  type: string;
}
// tab 类型
interface Type {
  ALL: string;
  UNDONE: string;
  DONE: string;
}
