export const nameToSkFormat = (name) => {
    const temp = name.replaceAll(' ', '-');
    return temp.toLowerCase();
};