// Async await error helper
// if data exists return an array with the data at index 1 position, and null at index 0
// if there is an error return an array with the error at index 0 position, and null at index 1
export default async function catchAsyncError(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err?.response?.data, null];
  }
}
