export const numberOnly = (string: string) => {
    const regex = /^[0-9]*$/;
    if (regex.test(string)) {
        return true;
    }
    return false;
}