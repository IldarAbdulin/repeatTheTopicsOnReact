export const usePagination = (pages) => {
    let result = []
    for(let i = 0; i < pages; i++) {
        result.push(i + 1)
    }
    return result
}