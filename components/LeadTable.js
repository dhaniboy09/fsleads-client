import React from 'react';
import sample from 'lodash.sample';
import LeadItem from './LeadItem';

const LeadTable = (props) => {
  const { leads, updateLead, removeLead } = props;
  const { results: leadsList = [] } = leads;
  const rowClasses = [
    'table-primary',
    'table-dark',
    'table-success',
    'table-danger',
    'table-warning',
    'table-info',
    'table-light',
  ];

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date Created</th>
            <th scope="col">Contacted</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leadsList.map((lead) => (
            <LeadItem
              lead={lead}
              key={lead.id}
              updateLead={updateLead}
              removeLead={removeLead}
              rowClass={sample(rowClasses)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LeadTable;
