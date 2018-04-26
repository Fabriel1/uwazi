import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'react-redux-form';

import FormConfigMultimedia, { mapStateToProps } from '../FormConfigMultimedia';
import PropertyConfigOption from '../PropertyConfigOption';

describe('FormConfigMultimedia', () => {
  let component;
  let state;
  let props;

  beforeEach(() => {
    props = { index: 0 };
    state = {
      template: {
        data: { properties: [{ label: '' }] },
        formState: {
          'properties.0.label': { valid: true, dirty: false, errors: {} },
          $form: {
            errors: {
              'properties.0.label.required': false,
              'properties.0.label.duplicated': false
            }
          }
        }
      }
    };
  });

  const render = () => {
    const mappedProps = Object.assign({}, props, mapStateToProps(state, props));
    component = shallow(<FormConfigMultimedia.WrappedComponent {...mappedProps}/>);
  };

  const expectErrorLengthToBe = (length) => {
    render();
    expect(component.find('.has-error').length).toBe(length);
  };

  it('should hold show label, show in card and other congifuration options by default', () => {
    render();
    expect(component).toMatchSnapshot();
  });

  it('should add option to select card display type', () => {
    state.template.data.properties[0].showInCard = true;
    render();
    expect(component).toMatchSnapshot();
  });

  it('should allow setting a help text', () => {
    render();
    expect(component.find('.protip').length).toBe(0);
    props.helpText = 'Some help text';
    render();
    expect(component).toMatchSnapshot();
  });

  it('should allow excluding "show in card"', () => {
    props.canShowInCard = false;
    render();
    const formFields = component.find(Field);
    expect(formFields.getElements().length).toBe(1);
  });

  describe('validation', () => {
    it('should render the label without errors', () => {
      expectErrorLengthToBe(0);
    });
  });

  describe('when the field is invalid and dirty or the form is submited', () => {
    it('should render the label with errors', () => {
      state.template.formState.$form.errors['properties.0.label.required'] = true;
      state.template.formState['properties.0.label'].dirty = true;
      expectErrorLengthToBe(1);
    });

    it('should render the label with errors', () => {
      state.template.formState.$form.errors['properties.0.label.required'] = true;
      state.template.formState.submitFailed = true;
      expectErrorLengthToBe(1);
    });
  });
});
