var temp = require('../index');
var path = __dirname + '/temp.json';
var defaultData = {
    list: ['a', 'b', 'c'],
    obj: {
        a: 0
    },
    count: 0
};
var data = temp(path, defaultData);
data.count = data.count || 0;
data.count += 1;
data.list.push(data.list.length);
data.$save();
data.c = 1;
setTimeout(function() {
    console.log('after interval');
    data.$save(true);
    var newObj = temp(path, defaultData);
    if (data.count != newObj.count) throw new Error('count not equal...');
    if (data.list.length != newObj.list.length) throw new Error('list not equal');
    console.log('end..')
}, 100);
