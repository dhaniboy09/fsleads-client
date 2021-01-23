import React from 'react'
import {fetchWrapper} from "../common/utils";
import {appToast} from "../common/toast";
import LeadTable from "./LeadTable";
import LeadModal from "./LeadModal";
import appConstants from "../common/appConstants";
import classNames from 'classnames';

class App extends React.Component {
  state = {
    leads: {},
    showAddLeadModal: false,
    newLead: appConstants.NEW_LEAD_INITIAL_STATE,
  }

  async componentDidMount() {
    const leads = await this.getLeads()
    this.setState({leads})
  }

  getLeads = async () => {
    let responseJson = {};
    try {
      responseJson = await fetchWrapper(
        `/api/getLeads`,
        {
          method: 'GET',
        },
      );
    } catch (error) {
      appToast.error(error.displayMessage)
    }
    return responseJson
  };

  addNewLead = async (payload) => {
    try {
      await fetchWrapper(
        `/api/createLead`,
        {
          method: 'POST',
          body: JSON.stringify(payload)
        },
      );
    } catch (error) {
      appToast.error(error.displayMessage)
    }

    await this.refreshLeadTable()
    this.setState({newLead: appConstants.NEW_LEAD_INITIAL_STATE})
  }

  updateLead = async (payload, id) => {
    try {
      await fetchWrapper(
        `/api/updateLead?id=${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(payload)
        },
      );
    } catch (error) {
      appToast.error(error.displayMessage)
    }

    await this.refreshLeadTable()
  }

  removeLead = async (id) => {
    try {
      await fetchWrapper(
        `/api/deleteLead?id=${id}`,
        {
          method: 'DELETE',
        },
      );
    } catch (error) {
      appToast.error(error.displayMessage)
    }

    await this.refreshLeadTable()
    appToast.dark('Lead removed successfully')
  }

  refreshLeadTable = async () => {
    const leads = await this.getLeads()
    this.setState({leads})
  }

  toggleShowAddLeadModal = () => {
    console.log(this.state.newLead)
    this.setState(prevState => {
      return {
        ...prevState,
        showAddLeadModal: !prevState.showAddLeadModal
      }
    })
    console.log(this.state.newLead)
  }

  getLeadsFromURI = async (uri) => {
    if (uri) {
      const url = encodeURIComponent(uri)
      let responseJson = {};
      try {
        responseJson = await fetchWrapper(
          `/api/getItems?url=${url}`,
          {
            method: 'GET',
          },
        );
      } catch (error) {
        appToast.error(error.displayMessage)
      }

      this.setState({ leads: responseJson })
    }
  }

  render() {
    const {leads, showAddLeadModal, newLead} = this.state
    return (
      <div>
        <button onClick={this.toggleShowAddLeadModal}>Add New Lead</button>
        <LeadTable leads={leads} updateLead={this.updateLead} removeLead={this.removeLead}/>
        <LeadModal
          showLeadModal={showAddLeadModal}
          toggleShowLeadModal={this.toggleShowAddLeadModal}
          actionFunction={this.addNewLead}
          buttonText="Add New Lead"
          headerText="Add A New Lead"
          toastMessage="Lead Added Successfully"
          initialFormState={newLead}
        />
        <ul className="pagination">
          <li className="page-item">
            <a
              className={classNames('page-link', {'disabled-link': !leads.previous})}
              href="#"
              onClick={async () => await this.getLeadsFromURI(leads.previous)}
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a
              className={classNames('page-link', {'disabled-link': !leads.next})}
              href="#"
              onClick={async () => await this.getLeadsFromURI(leads.next)}
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    )
  }
}


export default App;