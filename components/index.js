import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { fetchWrapper } from '../common/utils';
import { appToast } from '../common/toast';
import LeadTable from './LeadTable';
import LeadModal from './LeadModal';
import appConstants from '../common/appConstants';

class App extends React.Component {
  state = {
    leads: {},
    showAddLeadModal: false,
    newLead: appConstants.NEW_LEAD_INITIAL_STATE,
  };

  async componentDidMount() {
    const leads = await this.getLeads();
    this.setState({ leads });
  }

  getLeads = async () => {
    let responseJson = {};
    try {
      responseJson = await fetchWrapper(`/api/getLeads`, {
        method: 'GET',
      });
    } catch (error) {
      appToast.error(error.displayMessage);
    }
    return responseJson;
  };

  addNewLead = async (payload) => {
    try {
      await fetchWrapper(`/api/createLead`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      await this.refreshLeadTable();
      this.setState({ newLead: appConstants.NEW_LEAD_INITIAL_STATE });
      appToast.dark('Lead Added Successfully');
    } catch (error) {
      appToast.error(error.displayMessage);
    }
  };

  updateLead = async (payload, id) => {
    try {
      await fetchWrapper(`/api/updateLead?id=${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      await this.refreshLeadTable();
      appToast.dark('Lead Updated Successfully');
    } catch (error) {
      appToast.error(error.displayMessage);
    }
  };

  removeLead = async (id) => {
    try {
      await fetchWrapper(`/api/deleteLead?id=${id}`, {
        method: 'DELETE',
      });
      await this.refreshLeadTable();
      appToast.dark('Lead removed successfully');
    } catch (error) {
      appToast.error(error.displayMessage);
    }
  };

  refreshLeadTable = async () => {
    const leads = await this.getLeads();
    this.setState({ leads });
  };

  toggleShowAddLeadModal = () => {
    this.setState((prevState) => ({
      showAddLeadModal: !prevState.showAddLeadModal,
    }));
  };

  getLeadsFromURI = async (uri) => {
    if (uri) {
      const url = encodeURIComponent(uri);
      let responseJson = {};
      try {
        responseJson = await fetchWrapper(`/api/getItems?url=${url}`, {
          method: 'GET',
        });
        this.setState({ leads: responseJson });
      } catch (error) {
        appToast.error(error.displayMessage);
      }
    }
  };

  render() {
    const { leads, showAddLeadModal, newLead } = this.state;
    return (
      <div>
        <div className="row justify-content-center mt-10">
          <div className="col-auto w-80">
            <div className="lead-count font-weight-bold color-info">
              Lead Count: {leads.count ? leads.count : 0}
            </div>
            <h1 className="page-title mb-5">fsleads Manager</h1>
            <button
              onClick={this.toggleShowAddLeadModal}
              id="add-new-lead"
              className="button button-pill float-right mb-5"
            >
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="lg"
                className="cursor-pointer mr-3"
              />
              Add New Lead
            </button>
            <LeadTable
              leads={leads}
              updateLead={this.updateLead}
              removeLead={this.removeLead}
            />
            <div className="row justify-content-center mt-5">
              <div className="col-auto">
                <ul className="custom-pagination">
                  <li className="page-item">
                    <a
                      className={classNames('page-link border-right', {
                        'disabled-link': !leads.previous,
                      })}
                      href="#"
                      id="previous-link"
                      onClick={async () =>
                        await this.getLeadsFromURI(leads.previous)
                      }
                    >
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a
                      className={classNames('page-link', {
                        'disabled-link': !leads.next,
                      })}
                      href="#"
                      id="next-link"
                      onClick={async () =>
                        await this.getLeadsFromURI(leads.next)
                      }
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <LeadModal
          showLeadModal={showAddLeadModal}
          toggleShowLeadModal={this.toggleShowAddLeadModal}
          actionFunction={this.addNewLead}
          buttonText="Add"
          headerText="Add A New Lead"
          toastMessage="Lead Added Successfully"
          initialFormState={newLead}
        />
      </div>
    );
  }
}

export default App;
