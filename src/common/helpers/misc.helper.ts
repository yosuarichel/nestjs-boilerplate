export const CreatePagination = (page = 1, row = 10) => {
    return {
        row,
        page: (page - 1) * row,
    };
};
