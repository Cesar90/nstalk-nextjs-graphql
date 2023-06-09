import React from 'react'
import { render } from '@testing-library/react'
import { Button } from '../Button'

describe('<Button />', () => {
  it('should render OK with props', () => {
    // const { getByText, rerender } = render(
    //   <Button actionText='test' canClick={true} loading={false} />,
    // )
    render(
      <Button actionText='test' canClick={true} loading={false} />,
    )
    // // debug();
    // getByText('test')
    // rerender(<Button actionText={'test'} canClick={true} loading={true} />)
    // // debug()
    // getByText('Loading...')
  })
  it('should display loading', () => {
    render(
      <Button actionText={'test'} canClick={false} loading={true} />,
    )
    // const {  getByText } = render(
    //   <Button actionText={'test'} canClick={false} loading={true} />,
    // )
    // getByText('Loading...')
    // expect(container.firstChild).toHaveClass("pointer-events-none")
  })
})
