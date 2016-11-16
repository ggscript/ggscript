const selectTemplate = (template) => {
  console.log('SELECT TEMP', template);
  return {
    type: 'LOAD_TEMPLATE_DATA',
    data: template
  }
}

const getTemplateData = () => {
  return function(dispatch) {
    fetch('/api/templatedata', {
      method: 'GET'
    }).then(response => {
      response.json().then(res => dispatch(selectTemplate(res))).catch(err => {console.log(err)})
    }).catch(err => {
      console.log(err);
    });
    return null;
  }
}
export default getTemplateData

// return a fn that requests data from db
// follow initialize store action syntax
// the fn that returns the fn with data you need, needs to be exported for your reducer which is a pure fn

// two ways:
  // upon sandbox page load could get all data you need for each template right aaway and store in props
  // change/update state based on which one you need
  // OR can make sep request per template click

