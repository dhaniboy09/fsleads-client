import React from 'react';
import { mount } from 'enzyme/build';
import LeadItem from './LeadItem';
import LeadModal from './LeadModal';

const props = {
  lead: {
    id: '6f26551e-f7e2-46b2-9e47-25518a04116f',
    first_name: 'Jamesor',
    last_name: 'EJ',
    email: 'jamesej@yahoo.com',
    has_been_contacted: false,
    notes: null,
    created_timestamp: '01/20/2021',
    last_updated_timestamp: '01/20/2021',
  },
  updateLead: jest.fn(),
  removeLead: jest.fn(),
};

describe('Test LeadItem', () => {
  it('should correctly display boolean values as yes/no', () => {
    const wrapper = mount(<LeadItem {...props} />);
    expect(wrapper.find('#has-been-contacted').text()).toEqual('No');
  });

  it('should correctly remove lead', () => {
    const wrapper = mount(<LeadItem {...props} />);
    wrapper.find('#remove-lead').at(1).simulate('click');
    expect(props.removeLead).toHaveBeenCalled();
  });

  it('should open lead modal when lead edit icon is clicked', () => {
    const wrapper = mount(<LeadItem {...props} />);
    wrapper.find('#update-lead').at(1).simulate('click');
    expect(wrapper.find(LeadModal)).toHaveLength(1);
  });
});
