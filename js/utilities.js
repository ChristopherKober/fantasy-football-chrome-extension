function getMostInnerChild(ele) {
    var result = ele;
    while (result.children.length > 0) {
        result = result.children[0];
    }

    return result;
}

function combineStats(one, two) {
    return [...one, ...two];
}
