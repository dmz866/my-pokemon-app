export const getLocalItem = (id: string) => {
    return localStorage.getItem(id);
}

export const setLocalItem = (id: string, value: string) => {
    localStorage.setItem(id, value);
}