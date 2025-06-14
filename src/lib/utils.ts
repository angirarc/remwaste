export const determineErrorMessage = (e: unknown) => {
    let message = 'Unknown error occurred';
    if (e instanceof Error) {
        if ('response' in e) {
            const responseError = e as { response?: { data?: { message?: string } } };
            message = responseError.response?.data?.message ?? 'API error occurred';
        } else if ('request' in e) {
            message = 'No response received';
        } else {
            message = e.message;
        }
    }
    
    return message;
}