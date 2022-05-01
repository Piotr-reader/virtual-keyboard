
function createWrapper(element, className) {
    const newElement = document.createElement(element);
    newElement.className = className;
    document.body.prepend(newElement);
}
export default { createWrapper }