import React from 'react';
import { mount } from 'enzyme/build';
import DeleteLeadModal from './DeleteLeadModal';

const props = {
  showDeleteLeadModal: true,
  toggleShowDeleteLeadModal: jest.fn(),
  deleteLead: jest.fn(),
  id: '123456789',
};

describe('Test DeleteLeadItemModal', () => {
  it('should remove a lead if yes is clicked', () => {
    const wrapper = mount(<DeleteLeadModal {...props} />);
    wrapper.find('#yes-delete-lead').simulate('click');
    expect(props.deleteLead).toHaveBeenCalledWith(props.id);
  });
  it('should not remove a lead if no is clicked', () => {
    const wrapper = mount(<DeleteLeadModal {...props} />);
    wrapper.find('#no-delete-lead').simulate('click');
    expect(props.toggleShowDeleteLeadModal).toHaveBeenCalled();
  });
});
