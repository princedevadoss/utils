let ut = {}

ut.member = null;

function checkForType(data, type) {
    switch(type) {
        case 'object':
            return (typeof data === 'object' && data.constructor === Object) ? true : false;
        case 'array':
            return (typeof data === 'object' && data.constructor === Array) ? true : false;
    }
}

function _changeKey(obj, oldKey, newKey) {
    let process = {};
    _changeObjectKeys(obj, oldKey, newKey, process);
    this.changeKey && (this.member = process);
    return !this.changeKey ? process : this;   
}

function _changeKeys(arr, oldKey, newKey) {
    let process = [];
    for(let element of arr) {
        process.push(this.changeKey.call({}, element, oldKey, newKey));
    }
    this.changeKeys && (this.member = process);
    return !this.changeKeys ? process : this;
}

function _filter(arr, callback) {
    let process = [];
    for(let element of arr) {
        callback(element) && process.push(element);
    }
    this.filter && (this.member = process);
    return !this.filter ? process : this;
}

function _each(arr, callback) {
    for(let element of arr) {
        callback(element);
    }
    return this;
}

function _every(arr, callback) {
    for(let element of arr) {
        if(!callback(element)) {
            return false;
        }
    }
    return this;
}

function _some(arr, callback) {
    for(let element of arr) {
        if(callback(element)) {
            return this;
        }
    }
    return false;
}

function _filterFirstLevelObjectKeys(obj, matchKey) {
    let process = {};
    for(let key in obj) {
        (matchKey.includes(key)) && (process[key] = obj[key]);
    }
    this.filterFirstLevelObjectKeys && (this.member = process);
    return !this.filterFirstLevelObjectKeys ? process : this;
}

function _filterFirstLevelArrayKeys(arr, matchKey) {
    let process = [];
    for(let element of arr) {
        process.push(this.filterFirstLevelObjectKeys.call({}, element, matchKey));
    }
    this.filterFirstLevelArrayKeys && (this.member = process);
    return !this.filterFirstLevelArrayKeys ? process : this;
}

function _findObjectKeys(obj, matchKeys, val) {
    for(var element in obj) {
        if(matchKeys.includes(element)) {
            val[element] = (typeof obj[element] === 'object') ? _findObjectKeys(obj[element], matchKeys, {}) : obj[element];
        }
    }
    return val;
}

function _changeObjectKeys(obj, matchKey, targetKey, val) {
    for(var element in obj) {
        if(matchKey === element) {
            val[targetKey] = (typeof obj[element] === 'object') ? _changeObjectKeys(obj[element], matchKey, targetKey, {}) : obj[element];
        }
        else {
            val[element] = (typeof obj[element] === 'object') ? _changeObjectKeys(obj[element], matchKey, targetKey, {}) : obj[element];
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

function _filterArrayKeys(arr, matchKey) {
    let process = [];
    for(let element of arr) {
        process.push(this.filterObjectKeys.call({}, element, matchKey));
    }
    this.filterArrayKeys && (this.member = process);
    return !this.filterArrayKeys ? process : this;
}

function _common(desiredFn, check, arg1, arg2, type, msg) {
    if(arg1.length === check) {
        if(!checkForType(arg1[0], type)) {
            throw msg;
        }
        return desiredFn.apply(this, arg1);
    }
    else {
        if(this.member) {
            return  desiredFn.apply(this, arg2);
        }
        else {
            throw 'error';
        }
    }
}

ut.changeKey = function(obj, oldKey, newKey) {
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

ut.changeKeys = function(arr, oldKey, newKey) {
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

ut.filter = function(arr, callback) {
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

ut.each = function(arr, callback) {
    return _common.call(
        this, 
        _each,
         2,
         arguments,
         [this.member, arr],
         'array',
         'Please Pass Array data'
    );
}

ut.every = function(arr, callback) {
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

ut.some = function(arr, callback) {
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

ut.filterFirstLevelObjectKeys = function(obj, key) {
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

ut.filterFirstLevelArrayKeys = function(arr, key) {
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

ut.filterObjectKeys = function(obj, key) {
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

ut.filterArrayKeys = function(arr, key) {
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

ut.val = function() {
    return this.member;
}