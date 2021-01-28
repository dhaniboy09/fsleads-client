import React from 'react';
import { mount } from 'enzyme/build';
import { act } from 'react-dom/test-utils';
import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { beforeEach } from '@jest/globals';
import App from '../pages';
import appConstants from '../common/appConstants';
import { appToast } from '../common/toast';

jest.mock('../common/toast', () => ({
  appToast: { error: jest.fn(), dark: jest.fn() },
}));

const newLeadResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: '6f26551e-f7e2-46b2-9e47-25518a04116f',
      first_name: 'Jamesor',
      last_name: 'EJ',
      email: 'jamesej@yahoo.com',
      has_been_contacted: false,
      notes: null,
      created_timestamp: '01/20/2021',
      last_updated_timestamp: '01/20/2021',
    },
  ],
};

const mockResponseOptions = {
  success: { ok: true, status: StatusCodes.OK },
  error: { ok: false },
  no_content: { ok: true, status: StatusCodes.NO_CONTENT },
};

describe('Test Index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });
  afterEach(() => {
    fetch.mockClear();
  });
  it('should correctly add a new field', async () => {
    const wrapper = mount(<App />);
    fetch
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => newLeadResponse,
      })
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => newLeadResponse,
      });
    wrapper.find('#add-new-lead').simulate('click');
    const mockEventEmail = { target: { name: 'email', value: 'a@b.com' } };
    const mockEventFirstName = {
      target: { name: 'first_name', value: 'Test' },
    };
    const mockEventLastName = { target: { name: 'last_name', value: 'User' } };
    wrapper.find('#email').simulate('change', mockEventEmail);
    wrapper.find('#first_name').simulate('change', mockEventFirstName);
    wrapper.find('#last_name').simulate('change', mockEventLastName);

    wrapper.find('#handle-lead-button').simulate('click');

    await act(async () => {
      await jest.runAllTicks();
    });

    expect(fetch.mock.calls[1]).toEqual([
      '/api/createLead',
      {
        method: 'POST',
        body:
          '{"first_name":"Test","last_name":"User","email":"a@b.com","notes":""}',
        headers: appConstants.DEFAULT_HEADERS,
      },
    ]);
    expect(fetch.mock.calls[2]).toEqual([
      '/api/getLeads',
      {
        method: 'GET',
        headers: appConstants.DEFAULT_HEADERS,
      },
    ]);
  });

  it('Updates lead successfully', async () => {
    const wrapper = mount(<App />);
    fetch.mockResolvedValue({
      ...mockResponseOptions.success,
      json: () => newLeadResponse,
    });
    const payload = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@yahoo.com',
      notes: '',
    };
    const id = '123456789';
    const instance = wrapper.instance();
    await instance.updateLead(payload, id);
    expect(fetch.mock.calls[1]).toEqual([
      `/api/updateLead?id=${id}`,
      {
        body:
          '{"first_name":"John","last_name":"Doe","email":"john@yahoo.com","notes":""}',
        method: 'PUT',
        headers: appConstants.DEFAULT_HEADERS,
      },
    ]);
    expect(fetch.mock.calls[2]).toEqual([
      '/api/getLeads',
      {
        method: 'GET',
        headers: appConstants.DEFAULT_HEADERS,
      },
    ]);
  });

  it('Displays error when unable to update lead', async () => {
    const wrapper = mount(<App />);
    const errorResponse = {
      error_message: 'An error',
      display_message: 'Please Refresh',
    };
    fetch.mockResolvedValue({
      ...mockResponseOptions.error,
      json: () => errorResponse,
    });
    const payload = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@yahoo.com',
      notes: '',
    };
    const id = '123456789';
    const instance = wrapper.instance();
    await instance.updateLead(payload, id);
    expect(appToast.error).toHaveBeenCalledWith(errorResponse.display_message);
  });

  it('Removes lead successfully', async () => {
    const wrapper = mount(<App />);
    fetch
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => newLeadResponse,
      })
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => {},
      })
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => newLeadResponse,
      });
    const id = '123456789';
    const instance = wrapper.instance();
    await instance.removeLead(id);
    expect(fetch.mock.calls[1]).toEqual([
      `/api/deleteLead?id=${id}`,
      {
        method: 'DELETE',
        headers: appConstants.DEFAULT_HEADERS,
      },
    ]);
    expect(appToast.dark).toHaveBeenCalledWith('Lead removed successfully');
  });
  it('Displays error when unable to remove lead', async () => {
    const wrapper = mount(<App />);
    const errorResponse = {
      error_message: 'An error',
      display_message: 'Please Refresh',
    };
    fetch.mockResolvedValue({
      ...mockResponseOptions.error,
      json: () => errorResponse,
    });
    const id = '123456789';
    const instance = wrapper.instance();
    await instance.removeLead(id);
    expect(appToast.error).toHaveBeenCalledWith(errorResponse.display_message);
  });

  it('Fetches all leads successfully', async () => {
    const wrapper = mount(<App />);
    fetch
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => newLeadResponse,
      })
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => newLeadResponse,
      });
    const instance = wrapper.instance();
    await instance.getLeads();
    expect(fetch.mock.calls[1]).toEqual([
      `/api/getLeads`,
      {
        method: 'GET',
        headers: appConstants.DEFAULT_HEADERS,
      },
    ]);
  });

  it('Fetches leads from URI successfully', async () => {
    const wrapper = mount(<App />);
    fetch
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => newLeadResponse,
      })
      .mockResolvedValue({
        ...mockResponseOptions.success,
        json: () => newLeadResponse,
      });
    const uri = 'http://';
    const instance = wrapper.instance();
    await instance.getLeadsFromURI(uri);
    expect(fetch.mock.calls[1]).toEqual([
      `/api/getItems?url=${encodeURIComponent(uri)}`,
      {
        method: 'GET',
        headers: appConstants.DEFAULT_HEADERS,
      },
    ]);
  });
});
