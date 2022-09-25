import { FieldMeta, Store } from "@/context/formContext";
// 发布订阅模式

// 所有的表单项的状态更新都交由他们自己处理，由Form通知 需要变更状态的表单项来调用他们自己的更新方法重新渲染自己
export type SubscribeCallback = (changedFields: FieldMeta[]) => void;

export class FormStore {
  // 存储表单所有的表单项状态
  private store: Store = {};
  private observers: SubscribeCallback[] = [];

  constructor(initialValues?: Store) {
    initialValues && this.updateStore(initialValues);
  }
  // 更新缓存
  private updateStore(nextStore: Store) {
    this.store = nextStore;
  }
  // 通知：给所有监听器发布消息
  private notify(changedFields: FieldMeta[]) {
    this.observers.forEach(callback => {
      callback(changedFields)
    });
  
  }
  // 开始订阅
  subScribe(callback: SubscribeCallback){
    this.observers.push(callback);
    // 取消订阅
    return () => {
      this.observers = this.observers.filter((fn) => fn !== callback)
    }
  }
  // 获取表单项对应的数据  返回数组
  getField(names?: string[]): any[]{
    if(!names){
      return [this.store]
    }
    return names.map((name) => {
      return this.store[name]
    })
  }
  setField(fields: FieldMeta[]){
    const newStore = {
      ...this.store,
      ...fields.reduce((acc, next)=>{
        acc[next.name] = next.value
        return acc
      }, {} as Store)
    }
    // 同步更新表单数据
    this.updateStore(newStore)
    // 发送通知
    this.notify(fields)
  }
}
