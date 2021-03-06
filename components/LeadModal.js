import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import classNames from 'classnames';
import { validateNewLeadForm } from '../common/validation';

const LeadModal = (props) => {
  const {
    showLeadModal,
    toggleShowLeadModal,
    actionFunction,
    buttonText,
    headerText,
    initialFormState,
    id = null,
  } = props;
  const [leadFields, setLeadFields] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // useEffect(() => {
  //   setLeadFields(initialFormState);
  // }, [showLeadModal]);

  const handleLead = async () => {
    const errors = validateNewLeadForm(leadFields);
    if (!errors) {
      if (id) {
        await actionFunction(leadFields, id);
      } else {
        await actionFunction(leadFields);
      }
      toggleShowLeadModal();
      setLeadFields(initialFormState);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const toggleModal = () => {
    setLeadFields(initialFormState);
    setFormErrors({});
    toggleShowLeadModal();
  };

  const onChange = ({ target: { name, value } }) => {
    setLeadFields({ ...leadFields, [name]: value });
  };

  const hasErrorForField = (field) => formErrors.has && formErrors.has(field);

  return (
    <Modal isOpen={showLeadModal} toggle={toggleModal} size="l" scrollable>
      <ModalHeader toggle={toggleModal}>{headerText}</ModalHeader>
      <ModalBody>
        <div className="row justify-content-center">
          <div className="col-auto">
            <form className="lead-form">
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    className={classNames('form-control', {
                      'is-invalid': hasErrorForField('first_name'),
                    })}
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                    value={leadFields.first_name || ''}
                    onChange={onChange}
                  />
                  {hasErrorForField('first_name') && (
                    <div
                      className="invalid-feedback"
                      id="invalid-feedback-first-name"
                    >
                      {formErrors.first('first_name')}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="last_name">Last name</label>
                  <input
                    type="text"
                    className={classNames('form-control', {
                      'is-invalid': hasErrorForField('last_name'),
                    })}
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    value={leadFields.last_name || ''}
                    onChange={onChange}
                  />
                  {hasErrorForField('last_name') && (
                    <div
                      className="invalid-feedback"
                      id="invalid-feedback-last-name"
                    >
                      {formErrors.first('last_name')}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupPrepend3"
                      >
                        @
                      </span>
                    </div>
                    <input
                      type="text"
                      className={classNames('form-control', {
                        'is-invalid': hasErrorForField('email'),
                      })}
                      id="email"
                      name="email"
                      value={leadFields.email || ''}
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend3"
                      onChange={onChange}
                    />
                    {hasErrorForField('email') && (
                      <div
                        className="invalid-feedback"
                        id="invalid-feedback-email"
                      >
                        {formErrors.first('email')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    className={classNames('form-control', {
                      'is-invalid': hasErrorForField('notes'),
                    })}
                    id="notes"
                    name="notes"
                    value={leadFields.notes || ''}
                    onChange={onChange}
                    placeholder="Notes"
                  />
                  {hasErrorForField('notes') && (
                    <div className="invalid-feedback">
                      {formErrors.first('notes')}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          id="handle-lead-button"
          onClick={() => handleLead()}
          className="button button-pill float-right"
        >
          {buttonText}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default LeadModal;
