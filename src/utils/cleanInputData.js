export const cleanInputData = (data) => {
    Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== undefined)
    );
};