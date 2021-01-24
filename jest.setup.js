import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.fetch = require('jest-fetch-mock');

jest.setMock('node-fetch', fetch);

configure({ adapter: new Adapter() });
