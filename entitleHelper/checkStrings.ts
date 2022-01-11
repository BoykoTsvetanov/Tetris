function checkStringNew(newProductCode: string, newModelType?: string): string {
  if (newModelType !== '' && newModelType !== undefined) {
    return newModelType
  }
  if (newProductCode !== '') {
    return newProductCode
  }
  return ''
}
function checkStringOld(oldProductCode: string, oldModelType: string) {
  if (oldProductCode !== '') {
    return oldProductCode
  }
  if (oldModelType !== '') {
    return oldModelType
  }
  return ''
}
export { checkStringNew, checkStringOld }
