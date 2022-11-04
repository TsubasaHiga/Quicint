import Modal from '~/modules/Modal'

const PageExample = (): void => {
  console.log('example')

  const modalBtnElement = document.querySelector('#modal-btn')
  if (modalBtnElement) {
    const modalInstance = new Modal('example')
    modalInstance.modalSearch()
    modalBtnElement.addEventListener('click', modalInstance.modalOpen, false)
  }
}

export default PageExample
