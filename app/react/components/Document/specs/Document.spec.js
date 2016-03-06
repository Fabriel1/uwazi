import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Document from '../Document.js';
import TestUtils from 'react-addons-test-utils'

describe('Document', () => {

  let submitedValue, component;

  let documents = [{key:'secret documents', value:{}}, {key:'real batman id', value:{}}];
  let searchDocuments = [{_id:'doc1', value:{}}, {_id:'doc2', value:{}}];
  let contentContainer;
  let pages = ['page1', 'page2', 'page3'];
  let css = ['css1', 'css2'];

  let doc = {
    _id:'documentId',
    pages : ['page1', 'page2', 'page3'],
    css : ['css1', 'css2']
  };

  let references = [
    {value: {sourceRange: {start: 1, end: 3}}}
  ];

  beforeEach(() => {
    let references = [];
    component = TestUtils.renderIntoDocument(<Document document={doc} references={references}/>);
    contentContainer = TestUtils.findRenderedDOMComponentWithClass(component, 'pages');
  });

  describe('on render', () => {
    it('should render every pagen inside a div ', () => {
      let pages = TestUtils.findRenderedDOMComponentWithClass(component, 'pages');

      expect(pages.childNodes.length).toBe(3);
      expect(pages.childNodes[0].innerHTML).toBe('page1');
      expect(pages.childNodes[1].innerHTML).toBe('page2');
      expect(pages.childNodes[2].innerHTML).toBe('page3');
    });

    it('should render every css inside a style ', () => {
      let styles = TestUtils.scryRenderedDOMComponentsWithTag(component, 'style');

      expect(styles.length).toBe(2);
      expect(styles[0].innerHTML).toBe('css1');
      expect(styles[1].innerHTML).toBe('css2');
    });
  });

  describe('link button', () => {
    it('should open the referenceForm', () => {
      spyOn(component.modal, 'show');
      let linkButton = TestUtils.findRenderedDOMComponentWithClass(component, 'ref-button');

      TestUtils.Simulate.click(linkButton);

      expect(component.modal.show).toHaveBeenCalled();
    });
  });

  describe('onMouseUp/onTouchEnd', () => {
    describe('when text selected', () => {
      it('should call onTextSelected', () => {
        spyOn(component, 'onTextSelected');

        stubSelection('text');

        TestUtils.Simulate.mouseUp(contentContainer);
        expect(component.onTextSelected).toHaveBeenCalled();

        component.onTextSelected.calls.reset();
        TestUtils.Simulate.touchEnd(contentContainer);
        expect(component.onTextSelected).toHaveBeenCalled();
      });
    });

    describe('when no text selected', () => {
      it('should not call onTextSelected', () => {
        spyOn(component, 'onTextSelected');

        stubSelection('');

        TestUtils.Simulate.mouseUp(contentContainer);
        expect(component.onTextSelected).not.toHaveBeenCalled();

        TestUtils.Simulate.touchEnd(contentContainer);
        expect(component.onTextSelected).not.toHaveBeenCalled();
      });
    });
  });

  describe('onTextSelected', () => {
    it('should wrap the selection with a class fake-selection span', () => {
      stubSelection('text');

      component.onTextSelected();
      expect(contentContainer.childNodes[0].innerHTML).toBe('p<span class="fake-selection">ag</span>e1');
    });

    it('should showReferenceLink', function(){
      stubSelection('selectedText');

      component.onTextSelected();
      expect(component.state.showReferenceLink).toBe(true);
    });

    it('should save the serialized range in component.serializedRange', () => {
      stubSelection('selectedText');

      component.onTextSelected();
      expect(component.serializedRange).toEqual({start:1, end:3});
    });

  });

  describe('textSelectionHandler', () => {

    it('should unwrapFakeSelection', () => {
      stubSelection('selectedText');
      component.onTextSelected();

      let fakeRange = {};
      stubSelection('', fakeRange);
      component.textSelectionHandler();
      expect(contentContainer.childNodes[0].innerHTML).toBe('page1');
    });

    describe('when no text selected', () => {
      it('should set showReferenceLink false and hide the modal', () => {
        spyOn(component.modal, 'hide');
        stubSelection('');
        component.textSelectionHandler();

        expect(component.modal.hide).toHaveBeenCalled();
        expect(component.state.showReferenceLink).toBe(false);
      });
    });
  });

  describe('wrapReference', () => {
    it('should wrap the reference Range with a span.reference', () => {
      let reference = {
        _id: 'referenceId',
        sourceRange: {start: 1, end: 4},
        title:'referenceTitle'
      };

      component.wrapReference(reference);
      expect(contentContainer.childNodes[0].innerHTML).toBe('p<span ref="referenceId" class="reference" title="referenceTitle">age</span>1');
    });
  });

  describe('createReference', () => {

    let onCreateReference;
    let referenceCreated;

    beforeEach(() => {
      onCreateReference = (reference) => {
        referenceCreated = reference;
      };

      component = TestUtils.renderIntoDocument(<Document onCreateReference={onCreateReference} document={doc}/>);
      spyOn(component.modal, 'value').and.returnValue({modalValue:'value'});
      component.serializedRange = {range: 'range'};
    });

    it('should execute onCreateReference callback passing reference', () => {
      component.createReference()

      expect(referenceCreated).toEqual({
        modalValue: 'value',
        sourceDocument: 'documentId',
        sourceRange: {range: 'range'}
      });

    });

  });

  describe('addReference()', () => {
    it('should add the reference to props.references and render it', () => {
      spyOn(component, 'wrapReference');
      component.addReference({value:{_id:'id'}});

      expect(component.props.references).toEqual([{value:{_id:'id'}}]);
      expect(component.wrapReference).toHaveBeenCalledWith({_id:'id'});
    });
  });

  describe('openModal', () => {
    it('should show modal and hide the referenceLink ', () => {
      spyOn(component.modal, 'show');
      spyOn(component.modal, 'search');

      component.openModal();

      expect(component.modal.show).toHaveBeenCalled();
      expect(component.modal.search).toHaveBeenCalled();
      expect(component.state.showReferenceLink).toBe(false);
    });
  });

  describe('closeModal', () => {
    it('should hide the modal and unwrap fake selection', () => {
      spyOn(component.modal, 'hide');
      spyOn(component, 'unwrapFakeSelection');

      component.closeModal();

      expect(component.modal.hide).toHaveBeenCalled();
      expect(component.unwrapFakeSelection).toHaveBeenCalled();
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should set referencesAlreadyRendered to false when new references sent', () => {
      component.referencesAlreadyRendered = true;
      component.componentWillReceiveProps({references: 'new references'});
      expect(component.referencesAlreadyRendered).toBe(false);
    });
  });

  describe('componentDidUpdate', () => {
    it('should render props.references once', () => {
      forceComponentUpdate();
      expect(contentContainer.childNodes[0].innerHTML).toBe('p<span class="reference">ag</span>e1');
      forceComponentUpdate();
      expect(contentContainer.childNodes[0].innerHTML).toBe('p<span class="reference">ag</span>e1');
    });
  });

  describe('componentDidMount', () => {
    it('should render props.references', () => {
      component = TestUtils.renderIntoDocument(<Document document={doc} references={references}/>);
      contentContainer = TestUtils.findRenderedDOMComponentWithClass(component, 'pages');
      expect(contentContainer.childNodes[0].innerHTML).toBe('p<span class="reference">ag</span>e1');
    });
  });

  let stubSelection = (selectionText = '', range) => {
    if(!range){
      var range = document.createRange();
      let page1 = contentContainer.childNodes[0].childNodes[0];

      range.setStart(page1, 1);
      range.setEnd(page1, 3);
    }


    range.range = 'range';
    range.getClientRects = () => {
      return [{top:100}];
    }

    window.getSelection = () => {
      return {
        toString: () => {
          return selectionText;
        },
        getRangeAt: () => {
          return range;
        }
      }
    }
  }

  let forceComponentUpdate = () => {
    ReactDOM.render(<Document document={doc} references={references}/>, ReactDOM.findDOMNode(component).parentNode);
  }

});