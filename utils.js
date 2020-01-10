
var ut = (function () {
    let _ut = {};

    _ut.member = null;

    /**
     * checking the type of given data.
     * @param {object} data 
     * @param {string} type 
     * @returns {boolean}
     */
    function checkForType(data, type) {
        if (typeof data === 'object') {
            switch (type) {
                case 'object':
                    return (data.constructor === Object) ? true : false;
                case 'array':
                    return (data.constructor === Array) ? true : false;
                case 'both':
                    return true;
            }
        }
    }

    function _changeKey(obj, oldKey, newKey) {
        let process = {};
        _changeObjectKeys(obj, oldKey, newKey, process);
        this.changeKey && (this.member = process);
        return !this.changeKey ? process : this;
    }

    function _changeValue(obj, key, value) {
        let process = {};
        _changeObjectValues(obj, key, value, process);
        this.changeValue && (this.member = process);
        return !this.changeValue ? process : this;
    }

    function _changeKeys(arr, oldKey, newKey) {
        let process = [];
        for (let element of arr) {
            process.push(this.changeKey.call({}, element, oldKey, newKey));
        }
        this.changeKeys && (this.member = process);
        return !this.changeKeys ? process : this;
    }

    function _changeValues(arr, key, value) {
        let process = [];
        for (let element of arr) {
            process.push(this.changeValue.call({}, element, key, value));
        }
        this.changeValues && (this.member = process);
        return !this.changeValues ? process : this;
    }

    function _filter(arr, callback) {
        let process = [];
        for (let element of arr) {
            callback(element) && process.push(element);
        }
        this.filter && (this.member = process);
        return !this.filter ? process : this;
    }

    function _each(item, callback) {
        let process = [];
        if (checkForType(item, 'object')) {
            for (let key in item) {
                callback(key, item[key]);
            }
        }
        else if (checkForType(item, 'array')) {
            for (let element of item) {
                callback(element);
            }
        }
        else {
            throw 'Please pass an object';
        }
        this.each && (this.member = process);
        return !this.each ? process : this;
    }

    function _every(arr, callback) {
        for (let element of arr) {
            if (!callback(element)) {
                return false;
            }
        }
        return this;
    }

    function _some(arr, callback) {
        for (let element of arr) {
            if (callback(element)) {
                return this;
            }
        }
        return false;
    }

    function _filterFirstLevelObjectKeys(obj, matchKey) {
        let process = {};
        for (let key in obj) {
            (matchKey.includes(key)) && (process[key] = obj[key]);
        }
        this.filterFirstLevelObjectKeys && (this.member = process);
        return !this.filterFirstLevelObjectKeys ? process : this;
    }

    function _filterFirstLevelArrayKeys(arr, matchKey) {
        let process = [];
        for (let element of arr) {
            process.push(this.filterFirstLevelObjectKeys.call({}, element, matchKey));
        }
        this.filterFirstLevelArrayKeys && (this.member = process);
        return !this.filterFirstLevelArrayKeys ? process : this;
    }

    function _findObjectKeys(obj, matchKeys, val) {
        for (var element in obj) {
            if (matchKeys.includes(element)) {
                val[element] = (typeof obj[element] === 'object') ? _findObjectKeys(obj[element], matchKeys, {}) : obj[element];
            }
        }
        return val;
    }

    function _deepFindObjectKeys(obj, matchKeys, val) {
        for (var element in obj) {
            if ((typeof obj[element] === 'object')) {
                val[element] = !(matchKeys.includes(element)) ? _deepFindObjectKeys(obj[element], matchKeys, {}) : obj[element];
            }
            else {
                if (matchKeys.includes(element)) {
                    val[element] = obj[element];
                }
            }
        }
        return val;
    }

    function _changeObjectKeys(obj, matchKey, targetKey, val) {
        for (var element in obj) {
            if (matchKey === element) {
                val[targetKey] = (typeof obj[element] === 'object') ? _changeObjectKeys(obj[element], matchKey, targetKey, {}) : obj[element];
            }
            else {
                val[element] = (typeof obj[element] === 'object') ? _changeObjectKeys(obj[element], matchKey, targetKey, {}) : obj[element];
            }
        }
        return val;
    }

    function _changeObjectValues(obj, key, value, val) {
        for (var element in obj) {
            if (key === element) {
                val[key] = value;
            }
            else {
                val[element] = (typeof obj[element] === 'object') ? _changeObjectValues(obj[element], key, value, {}) : obj[element];
            }
        }
        return val;
    }

    function _filterObjectKeys(obj, matchKeys) {
        let process = {};
        _findObjectKeys(obj, matchKeys, process);
        this.filterFirstLevelArrayKeys && (this.member = process);
        return !this.filterFirstLevelArrayKeys ? process : this;
    }

    function _deepFilterObjectKeys(obj, matchKeys) {
        let process = {};
        _deepFindObjectKeys(obj, matchKeys, process);
        this.filterFirstLevelArrayKeys && (this.member = process);
        return !this.filterFirstLevelArrayKeys ? process : this;
    }

    function _filterArrayKeys(arr, matchKey) {
        let process = [];
        for (let element of arr) {
            process.push(this.filterObjectKeys.call({}, element, matchKey));
        }
        this.filterArrayKeys && (this.member = process);
        return !this.filterArrayKeys ? process : this;
    }

    function _deepFilterArrayKeys(arr, matchKey) {
        let process = [];
        for (let element of arr) {
            process.push(this.deepFilterObjectKeys.call({}, element, matchKey));
        }
        this.deepFilterArrayKeys && (this.member = process);
        return !this.deepFilterArrayKeys ? process : this;
    }

    function _concat(arr1, arr2) {
        let process = arr1;
        for (let element of arr2) {
            process.push(element);
        }
        this.concat && (this.member = process);
        return !this.concat ? process : this;
    }

    function _slice(arr, start, end) {
        let process = [];
        for (let pos = start; pos < end; pos++) {
            process.push(arr[pos]);
        }
        this.slice && (this.member = process);
        return !this.slice ? process : this;
    }

    function _map(arr, callback) {
        let process = [];
        for (let element of arr) {
            process.push(callback(element));
        }
        this.map && (this.member = process);
        return !this.map ? process : this;
    }

    function _repeat(item, count) {
        let process = [];
        if (checkForType(item, 'object')) {
            for (let pos = 0; pos < count; pos++) {
                process.push(item);
            }
        }
        else if (checkForType(item, 'array')) {
            for (let pos = 0; pos < count; pos++) {
                process = this.concat.call({}, process, item);
            }
        }
        else {
            throw 'Please pass an object';
        }
        this.repeat && (this.member = process);
        return !this.repeat ? process : this;
    }

    function _common(desiredFn, check, arg1, arg2, type, msg) {
        if (arg1.length === check) {
            if (!checkForType(arg1[0], type)) {
                throw msg;
            }
            return desiredFn.apply(this, arg1);
        }
        else {
            if (this.member) {
                return desiredFn.apply(this, arg2);
            }
            else {
                throw 'error';
            }
        }
    }

    _ut.changeKey = function (obj, oldKey, newKey) {
        return _common.call(
            this,
            _changeKey,
            3,
            arguments,
            [this.member, obj, oldKey],
            'object',
            'Please Pass Object data'
        );
    }

    _ut.changeValue = function (obj, key, value) {
        return _common.call(
            this,
            _changeValue,
            3,
            arguments,
            [this.member, obj, key],
            'object',
            'Please Pass Object data'
        );
    }

    _ut.changeKeys = function (arr, oldKey, newKey) {
        return _common.call(
            this,
            _changeKeys,
            3,
            arguments,
            [this.member, arr, oldKey],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.changeValues = function (arr, key, value) {
        return _common.call(
            this,
            _changeValues,
            3,
            arguments,
            [this.member, arr, key],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.filter = function (arr, callback) {
        return _common.call(
            this,
            _filter,
            2,
            arguments,
            [this.member, arr],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.each = function (arr, callback) {
        return _common.call(
            this,
            _each,
            2,
            arguments,
            [this.member, arr],
            'both',
            'Please Pass an Object'
        );
    }

    _ut.every = function (arr, callback) {
        return _common.call(
            this,
            _every,
            2,
            arguments,
            [this.member, arr],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.some = function (arr, callback) {
        return _common.call(
            this,
            _some,
            2,
            arguments,
            [this.member, arr],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.filterFirstLevelObjectKeys = function (obj, key) {
        return _common.call(
            this,
            _filterFirstLevelObjectKeys,
            2,
            arguments,
            [this.member, obj],
            'object',
            'Please Pass Object data'
        );
    }

    _ut.filterFirstLevelArrayKeys = function (arr, key) {
        return _common.call(
            this,
            _filterFirstLevelArrayKeys,
            2,
            arguments,
            [this.member, arr],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.filterObjectKeys = function (obj, key) {
        return _common.call(
            this,
            _filterObjectKeys,
            2,
            arguments,
            [this.member, obj],
            'object',
            'Please Pass Object data'
        );
    }

    _ut.filterArrayKeys = function (arr, key) {
        return _common.call(
            this,
            _filterArrayKeys,
            2,
            arguments,
            [this.member, arr],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.deepFilterObjectKeys = function (obj, key) {
        return _common.call(
            this,
            _deepFilterObjectKeys,
            2,
            arguments,
            [this.member, obj],
            'object',
            'Please Pass Object data'
        );
    }

    _ut.deepFilterArrayKeys = function (arr, key) {
        return _common.call(
            this,
            _deepFilterArrayKeys,
            2,
            arguments,
            [this.member, arr],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.concat = function (arr1, arr2) {
        return _common.call(
            this,
            _concat,
            2,
            arguments,
            [this.member, arr1],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.slice = function (arr, start, end) {
        return _common.call(
            this,
            _slice,
            3,
            arguments,
            [this.member, arr, start],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.map = function (arr, callback) {
        return _common.call(
            this,
            _map,
            2,
            arguments,
            [this.member, arr],
            'array',
            'Please Pass Array data'
        );
    }

    _ut.repeat = function (item, count) {
        return _common.call(
            this,
            _repeat,
            2,
            arguments,
            [this.member, item],
            'both',
            'Please an Object'
        );
    }

    _ut.val = function () {
        return this.member;
    }

    return _ut;
})();