import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login Component', () => {
  it('should render without errors', () => {
    const component = shallow(<Login />);
    const wrapper = component.find(`[data-test='Login']`);
    expect(wrapper.length).toBe(1);
  });

  it('should have two input fields', () => {
    const component = shallow(<Login />);
    const wrapper = component.find(`[data-test='input-field']`);
    expect(wrapper.length).toBe(2);
  });

  it('should update the state when input fields change', () => {
    const component = shallow(<Login />);
    const usernameInput = component.find(`[data-test='input-field']`).at(0);
    const passwordInput = component.find(`[data-test='input-field']`).at(1);

    usernameInput.simulate('change', { target: { value: 'testuser' } });
    passwordInput.simulate('change', { target: { value: 'testpassword' } });

    expect(component.state('username')).toEqual('testuser');
    expect(component.state('password')).toEqual('testpassword');
  });

  it('should call handleSave function when save button is clicked', () => {
    const component = shallow(<Login />);
    const saveButton = component.find(`[data-test='save-button']`);
    const handleSaveSpy = jest.spyOn(component.instance(), 'handleSave');
    saveButton.simulate('click');
    expect(handleSaveSpy).toHaveBeenCalled();
  });
});
