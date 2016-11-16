export selectTemplate = (template) => {
  console.log('SELECT TEMP', template);
  return {
    type: 'LOAD_TEMPLATE_DATA',
    data: template
  }
}
