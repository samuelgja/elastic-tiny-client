export const queryParametersGenerator = (params: Record<string, unknown>, rawParams: any) => {
  const queryParameters = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      queryParameters.append(key, String(value))
      delete rawParams[key]
    }
  }
  return queryParameters.toString()
}
