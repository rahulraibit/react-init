import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckboxWithLabel from './CheckboxWithLabel';
import renderer from 'react-test-renderer';

// automatically unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);
test('Test CheckBoxWith label rendrer', () => {
    let component = renderer.create(
        <CheckboxWithLabel labelOn="On"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(
        <CheckboxWithLabel labelOff="Off"/>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    
})
it('CheckboxWithLabel changes the text after click', () => {
    const { queryByLabelText, getByLabelText } = render(
        <CheckboxWithLabel labelOn="On" labelOff="Off" />,
    );

    expect(queryByLabelText(/off/i)).toBeTruthy();

    fireEvent.click(getByLabelText(/off/i));

    expect(queryByLabelText(/on/i)).toBeTruthy();
});