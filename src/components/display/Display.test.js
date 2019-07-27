import React from 'react';
import Display from './Display'
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

//snapshot testing
test('Display the content', () => {
    const component = renderer.create(
        <Display />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

// Dom testing
it('renders welcome message', () => {
    const { getByText } = render(<Display />);
    expect(getByText('Hi I am Display component')).toBeInTheDocument();
  });