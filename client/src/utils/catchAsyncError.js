export default async function catchAsyncError(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err.response.data, null];
  }
}
