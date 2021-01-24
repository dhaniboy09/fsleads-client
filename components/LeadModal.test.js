import React from 'react';
import { mount } from 'enzyme/build';
import LeadModal from './LeadModal';
import appConstants from '../common/appConstants';

const props = {
  showLeadModal: true,
  toggleShowLeadModal: jest.fn(),
  actionFunction: jest.fn(),
  buttonText: 'Add Lead',
  headerText: 'Add New Lead',
  initialFormState: appConstants.NEW_LEAD_INITIAL_STATE,
  toastMessage: 'Lead Added Successfully',
  id: null,
};

describe('Test LeadItem', () => {
  it('should correctly validate empty fields', () => {
    const wrapper = mount(<LeadModal {...props} />);
    wrapper.find('#handle-lead-button').at(1).simulate('click');
    expect(wrapper.find('#invalid-feedback-first-name').text()).toEqual(
      'This field is required',
    );
    expect(wrapper.find('#invalid-feedback-last-name').text()).toEqual(
      'This field is required',
    );
    expect(wrapper.find('#invalid-feedback-email').text()).toEqual(
      'This field is required',
    );
  });

  it('should correctly validate email field', () => {
    const wrapper = mount(<LeadModal {...props} />);
    const mockEvent = { target: { name: 'email', value: 'a@' } };
    wrapper.find('#email').simulate('change', mockEvent);
    wrapper.find('#handle-lead-button').at(1).simulate('click');
    expect(wrapper.find('#invalid-feedback-email').text()).toEqual(
      'Please enter a valid email',
    );
  });

  it('should call action function with the correct params', () => {
    const wrapper = mount(<LeadModal {...props} />);
    const mockEventEmail = { target: { name: 'email', value: 'a@b.com' } };
    const mockEventFirstName = {
      target: { name: 'first_name', value: 'Test' },
    };
    const mockEventLastName = { target: { name: 'last_name', value: 'User' } };
    wrapper.find('#email').simulate('change', mockEventEmail);
    wrapper.find('#first_name').simulate('change', mockEventFirstName);
    wrapper.find('#last_name').simulate('change', mockEventLastName);

    wrapper.find('#handle-lead-button').at(1).simulate('click');
    expect(props.actionFunction).toHaveBeenCalledWith({
      first_name: 'Test',
      last_name: 'User',
      email: 'a@b.com',
      notes: '',
    });
  });

  it('should call action function with the correct params when is not null', () => {
    props.id = '1234567890';
    const wrapper = mount(<LeadModal {...props} />);
    const mockEventEmail = { target: { name: 'email', value: 'a@b.com' } };
    const mockEventFirstName = {
      target: { name: 'first_name', value: 'Test' },
    };
    const mockEventLastName = { target: { name: 'last_name', value: 'User' } };
    wrapper.find('#email').simulate('change', mockEventEmail);
    wrapper.find('#first_name').simulate('change', mockEventFirstName);
    wrapper.find('#last_name').simulate('change', mockEventLastName);

    wrapper.find('#handle-lead-button').at(1).simulate('click');
    expect(props.actionFunction).toHaveBeenCalledWith(
      {
        first_name: 'Test',
        last_name: 'User',
        email: 'a@b.com',
        notes: '',
      },
      props.id,
    );
  });
});
