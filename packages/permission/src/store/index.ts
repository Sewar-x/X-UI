import type { App } from "vue";
import { createPinia } from "pinia";

function hasPiniaBeenSetup(app: App<Element>): boolean {
  // 检查app实例上是否已经有$pinia属性  
  return app.config.globalProperties.$pinia !== undefined;
}

const store = createPinia();

export function setupStore(app: App<Element>) {
  if (!hasPiniaBeenSetup(app)) {
    // 如果没有设置Pinia，则使用它  
    app.use(store);
  } else {
    // 已经设置Pinia 
    console.log('Pinia has already been set up.');
  }
}

export { store };
