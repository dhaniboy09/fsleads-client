import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {validateNewLeadForm} from "../common/validation";
import {appToast} from "../common/toast";
import classNames from 'classnames';

const LeadModal = (props) => {
  const {
    showLeadModal,
    toggleShowLeadModal,
    actionFunction,
    buttonText,
    headerText,
    initialFormState,
    toastMessage,
    id = null
  } = props
  const [leadFields, setLeadFields] = useState(
    initialFormState
  )
  const [formErrors, setFormErrors] = useState({});

   useEffect(() => {
      setLeadFields(initialFormState);
  }, [showLeadModal])

  const handleLead = async () => {
    const errors = validateNewLeadForm(leadFields)
    if (!errors) {
      if (id) {
        await actionFunction(leadFields, id)
      } else {
        await actionFunction(leadFields)
      }
      toggleShowLeadModal()
      appToast.dark(toastMessage)
    } else {
      setFormErrors(errors)
      console.log(errors)
    }
  }

  const onChange = ({target: {name, value}}) => {
    setLeadFields({...leadFields, [name]: value});
  };

  const hasErrorForField = field =>
    formErrors.has && formErrors.has(field);

  return (
    <Modal isOpen={showLeadModal} toggle={toggleShowLeadModal} size="xl" scrollable>
      <ModalHeader toggle={toggleShowLeadModal}>
        {headerText}
      </ModalHeader>
      <ModalBody>
        <div className="row align-items-center">
          <div className="col-md-12 align-self-center ">
            <form>
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
                  {
                    hasErrorForField('first_name') && (
                      <div className="invalid-feedback">
                        {formErrors.first('first_name')}
                      </div>
                    )

                  }
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
                  {
                    hasErrorForField('last_name') && (
                      <div className="invalid-feedback">
                        {formErrors.first('last_name')}
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroupPrepend3">@</span>
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
                    {
                      hasErrorForField('email') && (
                        <div className="invalid-feedback">
                          {formErrors.first('email')}
                        </div>
                      )
                    }
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
                  {
                    hasErrorForField('notes') && (
                      <div className="invalid-feedback">
                        {formErrors.first('notes')}
                      </div>
                    )
                  }

                </div>
              </div>
            </form>
          </div>
        </div>

      </ModalBody>
      <ModalFooter>
        <Button
          className="select-item"
          color=""
          onClick={() => handleLead()}
        >
          {buttonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default LeadModal