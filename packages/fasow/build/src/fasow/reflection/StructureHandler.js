"use strict";
exports.__esModule = true;
exports.getTypesOfObject = void 0;
function areExcluded(key, excludedProps) {
    // console.log("Evaluating the key: ", key)
    var excluded = false;
    excludedProps.forEach(function (excludedProp) {
        if (key === excludedProp) {
            excluded = true;
        }
    });
    return excluded;
}
function getTypesOfObject(object, excludedProps) {
    /* todo : think in a better way to handle the excluded propertyValues like arrays
         maybe this will be solved creating a symbol to marks an object as array,
          provided that are an a really array
     */
    var keys = Reflect.ownKeys(object);
    var outputArray = [];
    keys.forEach(function (key) {
        // @ts-ignore
        var value = object[key];
        var typeProp = typeof value;
        if (!areExcluded(key, excludedProps)) {
            outputArray.push({
                propertyKey: key,
                propertyType: typeProp
            });
        }
    });
    return outputArray;
}
exports.getTypesOfObject = getTypesOfObject;
