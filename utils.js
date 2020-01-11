/**
 * @author Prince Devadoss
 * @copyright by 2020 Prince Devadoss. All rights reserved.
 * @description Common Javascript Utilities Library for all functionalities with chaining concept.
 * @example ut([1,2,3]).slice(1,3).concat([5,6]).value() //results [2,3,5,6]
 * @global this
 * @license MIT Free under MIT.
 * @version 1.0.0
 */
var ut = (function () {
    let _ut = {};

    _ut.member = null;

    /**
     * checking the type of given data.
     * @param {Object} data 
     * @param {String} type 
     * @returns {Boolean}
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

    /**
     *  Internal function changes keyname with the given value.
     * @param {Object} obj 
     * @param {String} oldKey 
     * @param {String} newKey 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _changeKey(obj, oldKey, newKey) {
        let process = {};
        _changeObjectKeys(obj, oldKey, newKey, process);
        this.changeKey && (this.member = process);
        return !this.changeKey ? process : this;
    }

    /**
     * Internal function changes value of the given key recursively
     * @param {Object} obj 
     * @param {String} key 
     * @param {String} value 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _changeValue(obj, key, value) {
        let process = {};
        _changeObjectValues(obj, key, value, process);
        this.changeValue && (this.member = process);
        return !this.changeValue ? process : this;
    }

    /**
     * Internal function changes keyname of the given oldkey recursively in an array
     * @param {Array} arr 
     * @param {String} oldKey 
     * @param {String} newKey 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _changeKeys(arr, oldKey, newKey) {
        let process = [];
        for (let element of arr) {
            process.push(this.changeKey.call({}, element, oldKey, newKey));
        }
        this.changeKeys && (this.member = process);
        return !this.changeKeys ? process : this;
    }

    /**
     * Internal function changes values of the given key in an array recursively
     * @param {Array} arr 
     * @param {String} key 
     * @param {String} value 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _changeValues(arr, key, value) {
        let process = [];
        for (let element of arr) {
            process.push(this.changeValue.call({}, element, key, value));
        }
        this.changeValues && (this.member = process);
        return !this.changeValues ? process : this;
    }

    /**
     * Internal function filters values from the given array with the given callback.
     * @param {Array} arr 
     * @param {Function} callback 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _filter(arr, callback) {
        let process = [];
        for (let element of arr) {
            callback(element) && process.push(element);
        }
        this.filter && (this.member = process);
        return !this.filter ? process : this;
    }

    /**
     * Internal function executes given callback for each item in the given object or array.
     * @param {Object || Array} item 
     * @param {Function} callback 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
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

    /**
     * Internal function that returns true if all callback returns true with each item of the array.
     * @param {Array} arr 
     * @param {Function} callback 
     * @returns {Object || Boolean} returns this context or the processed data based on whether its an user call or internal.
     */
    function _every(arr, callback) {
        for (let element of arr) {
            if (!callback(element)) {
                return false;
            }
        }
        return this;
    }

    /**
     * Internal function that returns true if any one callback returns true with each item of the array.
     * @param {Array} arr 
     * @param {Function} callback 
     * @returns {Object || Boolean} returns this context or the processed data based on whether its an user call or internal.
     */
    function _some(arr, callback) {
        for (let element of arr) {
            if (callback(element)) {
                return this;
            }
        }
        return false;
    }

    /**
     * Internal function that filter the object with given keys in the level 1 order.
     * @param {Object} obj 
     * @param {String} matchKey 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _filterFirstLevelObjectKeys(obj, matchKey) {
        let process = {};
        for (let key in obj) {
            (matchKey.includes(key)) && (process[key] = obj[key]);
        }
        this.filterFirstLevelObjectKeys && (this.member = process);
        return !this.filterFirstLevelObjectKeys ? process : this;
    }

    /**
     * Internal function that filter the array of objects with given keys in the level 1 order.
     * @param {Array} arr 
     * @param {String} matchKey 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _filterFirstLevelArrayKeys(arr, matchKey) {
        let process = [];
        for (let element of arr) {
            process.push(this.filterFirstLevelObjectKeys.call({}, element, matchKey));
        }
        this.filterFirstLevelArrayKeys && (this.member = process);
        return !this.filterFirstLevelArrayKeys ? process : this;
    }

    /**
     * Internal function that finds the given key recursively with all data types
     * @param {Object} obj 
     * @param {String} matchKeys 
     * @param {Object} val 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _findObjectKeys(obj, matchKeys, val) {
        for (var element in obj) {
            if (matchKeys.includes(element)) {
                val[element] = (typeof obj[element] === 'object') ? _findObjectKeys(obj[element], matchKeys, {}) : obj[element];
            }
        }
        return val;
    }

    /**
     * Internal function that finds the given key recursively with only immutable data
     * @param {Object} obj 
     * @param {String} matchKeys 
     * @param {Object} val 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
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

    /**
     * Internal function Will change the key in the given object recursively.
     * @param {Object} obj 
     * @param {String} matchKey 
     * @param {String} targetKey 
     * @param {Object} val 
     * @returns {Object} changed object with new keys
     */
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

    /**
     * Internal function Will change the value of the given key in the given object recursively.
     * @param {Object} obj 
     * @param {String} key 
     * @param {String} value 
     * @param {Object} val 
     * @returns {Object} changed object with new values
     */
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

    /**
     * Internal function that filters the keys of given object recursively with all data types.
     * @param {Object} obj 
     * @param {String} matchKeys 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _filterObjectKeys(obj, matchKeys) {
        let process = {};
        _findObjectKeys(obj, matchKeys, process);
        this.filterFirstLevelArrayKeys && (this.member = process);
        return !this.filterFirstLevelArrayKeys ? process : this;
    }

    /**
     * Internal function that filters the keys of given object recursively with immutable types.
     * @param {Object} obj 
     * @param {String} matchKeys 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _deepFilterObjectKeys(obj, matchKeys) {
        let process = {};
        _deepFindObjectKeys(obj, matchKeys, process);
        this.filterFirstLevelArrayKeys && (this.member = process);
        return !this.filterFirstLevelArrayKeys ? process : this;
    }

    /**
     * Internal function that filters the keys of the objects in the given array recursively with all data types.
     * @param {Array} arr 
     * @param {String} matchKeys 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _filterArrayKeys(arr, matchKey) {
        let process = [];
        for (let element of arr) {
            process.push(this.filterObjectKeys.call({}, element, matchKey));
        }
        this.filterArrayKeys && (this.member = process);
        return !this.filterArrayKeys ? process : this;
    }

    /**
     * Internal function that filters the keys of the objects in the given array recursively with immutable types.
     * @param {Array} arr 
     * @param {String} matchKeys 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _deepFilterArrayKeys(arr, matchKey) {
        let process = [];
        for (let element of arr) {
            process.push(this.deepFilterObjectKeys.call({}, element, matchKey));
        }
        this.deepFilterArrayKeys && (this.member = process);
        return !this.deepFilterArrayKeys ? process : this;
    }

    /**
     * Internal function to concatenate two arrays.
     * @param {Array} arr1 
     * @param {Array} arr2 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _concat(arr1, arr2) {
        let process = arr1;
        for (let element of arr2) {
            process.push(element);
        }
        this.concat && (this.member = process);
        return !this.concat ? process : this;
    }

    /**
     * Internal function to slice the given array with start and end indices.
     * @param {Array} arr 
     * @param {Number} start 
     * @param {Number} end 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _slice(arr, start, end) {
        let process = [];
        for (let pos = start; pos < end; pos++) {
            process.push(arr[pos]);
        }
        this.slice && (this.member = process);
        return !this.slice ? process : this;
    }

    /**
     * Internal function to change all the values of given array with return value of callback function.
     * @param {Array} arr 
     * @param {Function} callback 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
    function _map(arr, callback) {
        let process = [];
        for (let element of arr) {
            process.push(callback(element));
        }
        this.map && (this.member = process);
        return !this.map ? process : this;
    }

    /**
     * Internal function to repeat the given array or object with the given times
     * @param {Object || Array} item 
     * @param {Number} count 
     * @returns {Object} returns this context or the processed data based on whether its an user call or internal.
     */
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

    /**
     * Internal Function that acts as a common place to trigger all functions based on the given conditions.
     * @param {Function} desiredFn 
     * @param {Number} check 
     * @param {Object} arg1 
     * @param {Object} arg2 
     * @param {String} type 
     * @param {String} msg 
     * @returns {Object} this context
     */
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

    /**
     *  Function changes keyname with the given value.
     * @param {Object} obj 
     * @param {String} oldKey 
     * @param {String} newKey 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function changes value of the given key recursively
     * @param {Object} obj 
     * @param {String} key 
     * @param {String} value 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function changes keyname of the given oldkey recursively in an array
     * @param {Array} arr 
     * @param {String} oldKey 
     * @param {String} newKey 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function changes values of the given key in an array recursively
     * @param {Array} arr 
     * @param {String} key 
     * @param {String} value 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function filters values from the given array with the given callback.
     * @param {Array} arr 
     * @param {Function} callback 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function executes given callback for each item in the given object or array.
     * @param {Object || Array} arr 
     * @param {Function} callback 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function that returns true if all callback returns true with each item of the array.
     * @param {Array} arr 
     * @param {Function} callback 
     * @returns {Object || Boolean} returns this context.
     */
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

    /**
     * Function that returns true if any one callback returns true with each item of the array.
     * @param {Array} arr 
     * @param {Function} callback 
     * @returns {Object || Boolean} returns this context.
     */
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

    /**
     * Function that filter the object with given keys in the level 1 order.
     * @param {Object} obj 
     * @param {String} matchKey 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function that filter the array of objects with given keys in the level 1 order.
     * @param {Array} arr 
     * @param {String} matchKey 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function that filters the keys of given object recursively with all data types.
     * @param {Object} obj 
     * @param {String} matchKeys 
     * @returns {Object} returns this context.
     */
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
/**
     * Function that filters the keys of the objects in the given array recursively with all data types.
     * @param {Array} arr 
     * @param {String} matchKeys 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function that filters the keys of given object recursively with immutable types.
     * @param {Object} obj 
     * @param {String} matchKeys 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function that filters the keys of the objects in the given array recursively with immutable types.
     * @param {Array} arr 
     * @param {String} matchKeys 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function to concatenate two arrays.
     * @param {Array} arr1 
     * @param {Array} arr2 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function to slice the given array with start and end indices.
     * @param {Array} arr 
     * @param {Number} start 
     * @param {Number} end 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function to change all the values of given array with return value of callback function.
     * @param {Array} arr 
     * @param {Function} callback 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function to repeat the given array or object with the given times
     * @param {Object || Array} item 
     * @param {Number} count 
     * @returns {Object} returns this context.
     */
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

    /**
     * Function that returns current value.
     */
    _ut.val = function () {
        return this.member;
    }

    return _ut;
})();