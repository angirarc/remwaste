export const determineErrorMessage = (e: unknown) => {
    let message = 'Unknown error occurred';
    if (isFetchError(e)) {
        if (e.response) {
            message = e.response.data.message;
        } else if (e.request) {
          message = 'No response received';
        }
    }

    return message;
}