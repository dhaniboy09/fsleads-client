import React, {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import LeadModal from "./LeadModal";

const boolToYesNo = {
  false: 'No',
  true: 'Yes'
}

const LeadItem = (props) => {
  const {lead, updateLead, removeLead} = props
  const [showEditLeadModal, setShowEditLeadModal] = useState(false)

  const toggleShowEditLeadModal = () => {
    setShowEditLeadModal((prevState) => !prevState);
  }

  return (
    <>
      <tr>
        <td>{lead.first_name}</td>
        <td>{lead.last_name}</td>
        <td>{lead.email}</td>
        <td>{lead.created_timestamp}</td>
        <td>{boolToYesNo[`${lead.has_been_contacted}`]}</td>
        <td>
          <FontAwesomeIcon icon={faEdit} size="sm" className="cursor-pointer" onClick={toggleShowEditLeadModal}/>
          <FontAwesomeIcon icon={faTrash} size="sm" className="ml-3 cursor-pointer" onClick={() => removeLead(lead.id)}/>
        </td>
      </tr>
      <LeadModal
        id={lead.id}
        showLeadModal={showEditLeadModal}
        toggleShowLeadModal={toggleShowEditLeadModal}
        actionFunction={updateLead}
        buttonText="Edit Lead"
        headerText="Edit Lead"
        toastMessage="Lead Edited Successfully"
        initialFormState={{
          first_name: lead.first_name,
          last_name: lead.last_name,
          email: lead.email,
          notes: lead.notes
        }}
      />
    </>
  )
}

export default LeadItem