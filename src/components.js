function createWrapper(element, className) {
  const newElement = document.createElement(element);
  newElement.className = className;
  document.body.prepend(newElement);
}
function createComponents(element, className, toContainer) {
  const newElement = document.createElement(element);
  newElement.className = className;
  toContainer.append(newElement);
}
function createBtnControls(element, className, inner, toContainer) {
  const newElement = document.createElement(element);
  newElement.className = className;
  newElement.innerHTML = inner;
  toContainer.append(newElement);
}
function createLi(element, inner, toContainer, dataAttribute) {
  const newElement = document.createElement(element);
  newElement.innerHTML = inner;
  newElement.dataset.name = dataAttribute;
  toContainer.append(newElement);
}
function createP(element, inner, toContainer) {
  const newElement = document.createElement(element);
  newElement.innerHTML = inner;
  toContainer.append(newElement);
}
export default { createWrapper, createComponents, createBtnControls, createLi, createP };
