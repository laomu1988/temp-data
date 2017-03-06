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
module.exports = function (path, defaultData, _config) {
    var data;
    try {
        data = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : defaultData || {};
    } catch (err) {
        data = defaultData;
    }

    var config = _.extend({}, defaultConfig, _config);
    var hasNoSave = false;

    var save = function() {
        hasNoSave = false;
        // console.log('save', config.timeout);
        var old_hash = this.__hash;
        delete this.__hash;
        var new_hash = hash(this);
        if (old_hash != new_hash) {
            this.__hash = new_hash;
        }
        var json = JSON.stringify(this);
        fs.writeFileSync(path, json, 'utf8');
    }.bind(data);

    var saveTimer = _.throttle(save, config.timeout, {
        leading: true,
        trailing: true
    });
    data.$save = function (isRightNow) {
        hasNoSave = true;
        isRightNow ? save() : saveTimer();
    };

    process.on('beforeExit', function () {
        if (hasNoSave) save();
    });
    // data.$save();
    return data;
}
