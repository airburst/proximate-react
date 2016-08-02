export const flatten = (array) => {
    return [].concat.apply([], array);
};

export const replaceAll = (find: string, replace: string, fullText: string): string => {
    return fullText.replace(new RegExp(find, 'g'), replace);
}

export const arrayToString = (array): string => {
    let text = '';
    for (let item of array) {
        text += (typeof (item) === 'object') ? JSON.stringify(item) + '\n' : item + '\n';
    }
    return text;
}

export const uid = () => {
    let r = (s?: number) => {
        let p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    };
    return r() + r(1) + r(1) + r();
}

export const uniqueArray = (arrArg) => {
    return arrArg.filter(function (elem, pos, arr) {
        return arr.indexOf(elem) == pos;
    });
};

export const removeItemFromArray = (array, item): void => {
    array.splice(array.indexOf(item), 1);
}

export const timeStamp = new Date().toISOString();
