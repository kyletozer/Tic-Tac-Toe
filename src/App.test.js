import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount, shallow } from 'enzyme'
 
describe('Start a new game', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('player is prompted to go first when side "x" is chosen', () => {
    const wrapper = mount(<App/>)
    wrapper.find('.side-x').simulate('click')
    expect(wrapper.state('human')).toBe('x')
    expect(wrapper.state('com')).toBe('o')
  })

  it('player is prompted to go second when side "o" is chosen', () => {
    const wrapper = mount(<App/>)
    wrapper.find('.side-o').simulate('click')
    expect(wrapper.state('human')).toBe('o')
    expect(wrapper.state('com')).toBe('x')
  })
})

describe('Make a move on the board', () => {

  beforeAll(() => {
    const wrapper = mount(<App/>)
    wrapper.find('.side-x').simulate('click')
  })

  it('places a marker in the selected square', () => {
    
    const wrapper = mount(<App/>)
    const squares = wrapper.find('.square')
    const squareIndex = 0
    
    expect(wrapper.contains(<span className="marker">x</span>)).toBe(false)   
    expect(wrapper.state('spaces')).toHaveLength(9)
    expect(wrapper.state('xScore')).toHaveLength(0)

    const square = shallow(squares.get(squareIndex))

    // make a move
    wrapper.instance().placeMarker.call(square, squareIndex)
    wrapper.update()

    expect(wrapper.state('spaces')).toHaveLength(8)
    expect(wrapper.state('xScore')).toHaveLength(1)

    wrapper
      .find('.square')
      .forEach((node, index) => {
        let cond = false
        if(index === squareIndex) {
          cond = true
        }
        expect(
          node
            .contains(
              <span className="marker">x</span>
            )
          )
            .toBe(cond)    
    })
  })
})

describe('Play through sequence', () => {

  it('should only check for a winning sequence after turn 4', () => {
    
    const wrapper = mount(<App/>)
    const squares = wrapper.find('.square')
    const sequence = [1, 2, 3, 4, 5]
    const instance = wrapper.instance()

    jest.spyOn(instance, 'checkForWinner')

    sequence.forEach((seq, i) => {
      const context = (i % 2 !== 0) ? squares.get(seq) : null
      instance.placeMarker.call(context, seq)
      wrapper.update()
    })

    expect(instance.checkForWinner).toHaveBeenCalledTimes(1)
  })

  it('should confirm that the game has been won', () => {
    const wrapper = mount(<App/>)
    const squares = wrapper.find('.square')
    const sequence = [0, 5, 1, 4, 2]
    const instance = wrapper.instance()

    jest.spyOn(instance, 'checkForWinner')
    jest.spyOn(instance, 'endGame')

    sequence.forEach((seq, i) => {
      const context = (i % 2 !== 0) ? squares.get(seq) : null
      instance.placeMarker.call(context, seq)
      wrapper.update()
    })

    expect(instance.endGame).toHaveBeenCalledTimes(1)
  })
})