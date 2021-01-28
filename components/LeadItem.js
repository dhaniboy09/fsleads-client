import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import LeadModal from './LeadModal';
import DeleteLeadModal from './DeleteLeadModal';

const boolToYesNo = {
  false: 'No',
  true: 'Yes',
};

const LeadItem = (props) => {
  const { lead, updateLead, removeLead, rowClass } = props;
  const [showEditLeadModal, setShowEditLeadModal] = useState(false);
  const [showDeleteLeadModal, setDeleteLeadModal] = useState(false);

  const toggleShowEditLeadModal = () => {
    setShowEditLeadModal((prevState) => !prevState);
  };

  const toggleShowDeleteLeadModal = () => {
    setDeleteLeadModal((prevState) => !prevState);
  };

  return (
    <>
      <tr className={rowClass}>
        <td id="first-name">{lead.first_name}</td>
        <td id="last-name">{lead.last_name}</td>
        <td id="email">{lead.email}</td>
        <td id="created-timestamp">{lead.created_timestamp}</td>
        <td id="has-been-contacted">
          {boolToYesNo[`${lead.has_been_contacted}`]}
        </td>
        <td>
          <FontAwesomeIcon
            icon={faEdit}
            size="sm"
            className="cursor-pointer"
            id="update-lead"
            onClick={toggleShowEditLeadModal}
          />
          <FontAwesomeIcon
            icon={faTrash}
            size="sm"
            className="ml-3 cursor-pointer"
            id="remove-lead"
            onClick={() => toggleShowDeleteLeadModal()}
          />
        </td>
      </tr>
      <LeadModal
        id={lead.id}
        showLeadModal={showEditLeadModal}
        toggleShowLeadModal={toggleShowEditLeadModal}
        actionFunction={updateLead}
        buttonText="Save"
        headerText="Edit Lead"
        toastMessage="Lead Edited Successfully"
        initialFormState={{
          first_name: lead.first_name,
          last_name: lead.last_name,
          email: lead.email,
          notes: lead.notes,
        }}
      />
      <DeleteLeadModal
        showDeleteLeadModal={showDeleteLeadModal}
        toggleShowDeleteLeadModal={toggleShowDeleteLeadModal}
        deleteLead={removeLead}
        id={lead.id}
      />
    </>
  );
};

export default LeadItem;
