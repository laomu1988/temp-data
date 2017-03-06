# 简单的临时数据存放，数据操作和普通对象一样简单
将数据存储下来，下次启动程序后会自动从本地读取数据


## 安装
```sh
npm install temp-data --save
```

## 使用
```js
var db = require('temp-data');
var temp = db(__dirname + '/temp.json',
    {
        count: 0
    },
    {
        timeout: 100
    }
);

if(!temp.count)  temp.count = 0;
// 统计程序启动的次数
temp.count += 1;
temp.$save();
```

## 函数及参数
* 初始化
    - path:        保存数据的路径
    - defaultData: 默认数据
    - config      配置对象
        - timeout: 保存数据延迟时间,避免短时间内重复操作，单位ms，默认10000ms
* $save(isRightNow) 比较当前数据是否改变，假如改变则存储到本地。 其中使用的lodash的节流函数，无需担心短时间内多次操作
    - isRightNow:  是否立即存储(不使用节流函数),默认false


## 注意事项：
* temp.__hash 将会用来存放对象的hash值，请不要使用这个变量
