/**
 * 数据存储
 *    init(path, defaultData)
 *    $save() 保存数据
 */

var fs = require('fs');
var _ = require('lodash');
var hash = require('object-hash');
var defaultConfig = {
    timeout: 10000
};

/**
 * 新建存储对象
 */
module.exports = function(path, defaultData, _config) {
    var data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : defaultData || {};
    var config = _.extend({}, defaultConfig, _config);

    function save() {
        // console.log('save', config.timeout);
        var old_hash = this.__hash;
        delete this.__hash;
        var new_hash = hash(this);
        if (old_hash != new_hash) {
            this.__hash = new_hash;
        }
        var json = JSON.stringify(this);
        fs.writeFileSync(path, json, 'utf8');
    }

    data.$save = _.throttle(save.bind(data), config.timeout, {
        leading: true,
        trailing: true
    });
    // data.$save();
    return data;
}
