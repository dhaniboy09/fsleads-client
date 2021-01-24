import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const DeleteLeadModal = (props) => {
  const {
    showDeleteLeadModal,
    toggleShowDeleteLeadModal,
    deleteLead,
    id,
  } = props;

  return (
    <Modal
      isOpen={showDeleteLeadModal}
      toggle={toggleShowDeleteLeadModal}
      className="mt-10"
      size="l"
      scrollable
    >
      <ModalHeader toggle={toggleShowDeleteLeadModal}>
        Are you sure you want to delete this lead?
      </ModalHeader>
      <ModalBody>
        <div className="row justify-content-center">
          <div className="col-auto">
            <button
              id="yes-delete-lead"
              onClick={() => deleteLead(id)}
              className="button button-pill mr-5"
            >
              Yes
            </button>
            <button
              id="no-delete-lead"
              onClick={() => toggleShowDeleteLeadModal()}
              className="button button-pill"
            >
              No
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteLeadModal;
