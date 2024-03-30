export interface MetaProps {
	keepAlive?: boolean; // 组件缓存
	title?: string; // 路由标题
	key?: string; // 路由唯一标识
}

export interface RouteObject {
	caseSensitive?: boolean; //指示路由是否匹配大小写
	children?: RouteObject[]; // 子路由
	element?: React.ReactNode; // 路由组件
	index?: boolean; //是否为索引路由
	path?: string; // 路径
	meta?: MetaProps; // 路由元数据
	isLink?: string; // 是否为连接
}
