import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({adapter: new Adapter()})

const state = {
  turnData:{
    books:['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'images/authors/charleskickens.jpg',
      imageSource: 'Wikimedia Commons',
      books:['David Copperfield', 'A Tale of Two Cities']
    },
  },
  highlight:'none'
}

describe('Author Quize', () => {
  it(" renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  describe("When no answer has been selected", () => {
    let wrapper;
    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>)
    });
    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    })

  });

  describe("When a wrong answer has been selected", () => {
    let wrapper;
    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight:'wrong'}))} onAnswerSelected={()=>{}}/>)
    });
    it("should have no a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    })

  });

  describe("When a correct answer has been selected", () => {
    let wrapper;
    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight:'correct'}))} onAnswerSelected={()=>{}}/>)
    });
    it("should have no a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    })

  });

  describe("When the first answer is selected", () => {
    let wrapper;
    const handleAnswersSelected = jest.fn();

    beforeAll(()=>{
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswersSelected}/>);
      wrapper.find('.answer').first().simulate('click');
    });
    it("onAnswerSelected should be called", () => {
      expect(handleAnswersSelected).toHaveBeenCalled();
    })

    it("Should receive The Shining", () => {
      expect(handleAnswersSelected).toHaveBeenCalledWith("The Shining");
    })

  })
});
