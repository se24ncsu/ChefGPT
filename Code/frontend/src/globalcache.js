
const data = {};

export function getCache(key) {
    return data[key];
}

export function setCache(key, value) {
    data[key] = value;
}