export const getLocalItem = (id: string) => {
    return localStorage.getItem(id);
}

export const setLocalItem = (id: string, value: any) => {
    localStorage.setItem(id, value);
}

export const removeLocalItem = (id: string) => {
    localStorage.removeItem(id);
}