//UMD 格式 index.umd.js  
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.  
        define(['xw-element-ui', 'xw-element-plus', 'xw-ant-design'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but  
        // only CommonJS-like environments that support module.exports,  
        // like Node.  
        var xwElementUi = require('./dist/element-ui/xw-element-ui.umd');
        var xwElementPlus = require('./dist/element-plus/xw-element-plus.umd');
        var xwAntDesign = require('./dist/ant-design/xw-ant-design.umd');
        module.exports = factory(xwElementUi, xwElementPlus, xwAntDesign);
    } else {
        // Browser globals (root is window)  
        root.xwUi = factory(root.xwElementUi, root.xwElementPlus, root.xwAntDesign);
    }
}(this, function (xwElementUi, xwElementPlus, xwAntDesign) {
    // 返回一个对象，其中包含你的 API  
    return {
        xwElementUi,
        xwElementPlus,
        xwAntDesign
    };
}));