export const setItemOfRecordToModel = (values, ModelToSet, ModelOfData) => {
  return new ModelToSet(values).map(item => new ModelOfData({ ...item }))
}
