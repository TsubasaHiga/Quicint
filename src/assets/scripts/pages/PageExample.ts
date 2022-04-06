import Modal from '../modules/Modal'

const PageExample = (): void => {
  console.log('example')

  const modalBtnElement = document.querySelector('#modal-btn')
  if (modalBtnElement) {
    const modalInstance = new Modal('example')
    modalBtnElement.addEventListener('click', modalInstance.modalSearch, false)
  }
}

export default PageExample
