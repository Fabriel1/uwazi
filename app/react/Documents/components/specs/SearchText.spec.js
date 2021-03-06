import React from 'react';
import { shallow } from 'enzyme';

import Immutable from 'immutable';
import { I18NLink } from 'app/I18N';
import { actions as formActions } from 'react-redux-form';
import { browserHistory } from 'react-router';
import { SearchText } from '../SearchText.js';

describe('SearchText', () => {
  let component;
  let instance;
  let props;

  const render = () => {
    component = shallow(<SearchText {...props}/>);
    instance = component.instance();
  };

  beforeEach(() => {
    spyOn(browserHistory, 'getCurrentLocation').and.returnValue({ pathname: 'path', query: { page: 1 } });
    props = {
      doc: Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' }),
      storeKey: 'storeKey',
      searchSnippets: jasmine.createSpy('searchSnippets').and.returnValue(Promise.resolve([{ page: 2 }])),
      snippets: Immutable.fromJS([
        { text: 'first <b>snippet 1</b> found', page: 1 },
        { text: 'second <b>snippet 3</b> found', page: 2 },
        { text: 'third <b>snippet 3</b> found', page: 3 }
      ])
    };
  });

  it('should render all snippets with dangerouslySetInnerHTML', () => {
    props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
    render();
    const snippets = component.find('li span');
    expect(snippets.length).toBe(3);
    expect(snippets.at(0).props().dangerouslySetInnerHTML).toEqual({ __html: props.snippets.toJS()[0].text });
    expect(component.find(I18NLink).at(0).props().to).toMatch(/page=1&searchTerm=/);
    expect(snippets.at(1).props().dangerouslySetInnerHTML).toEqual({ __html: props.snippets.toJS()[1].text });
    expect(snippets.at(2).props().dangerouslySetInnerHTML).toEqual({ __html: props.snippets.toJS()[2].text });
  });

  it('should scrollToPage when click on a snippet link', () => {
    props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
    props.scrollToPage = jasmine.createSpy('scrollToPage');
    render();
    component.find(I18NLink).at(1).simulate('click');
    expect(props.scrollToPage).toHaveBeenCalledWith(2);
  });

  describe('blankState', () => {
    describe('when there is no search term', () => {
      it('should render a blank state message', () => {
        props.snippets = Immutable.fromJS([]);
        props.searchTerm = '';
        render();
        expect(component.find('.blank-state')).toMatchSnapshot();
      });
    });

    describe('when there is search term', () => {
      it('should render a no matching text message', () => {
        props.snippets = Immutable.fromJS([]);
        props.searchTerm = 'searchTerm';
        render();
        expect(component.find('.blank-state')).toMatchSnapshot();
      });
    });
  });

  describe('searchSnippets', () => {
    it('should searchSnippets and dispatch form change', () => {
      props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
      spyOn(formActions, 'change').and.returnValue('changeAction');
      render();
      const dispatch = jasmine.createSpy('dispatch');
      instance.attachDispatch(dispatch);

      instance.searchSnippets('term', 'docId');
      expect(props.searchSnippets).toHaveBeenCalledWith('term', 'docId', 'storeKey');
      expect(formActions.change).toHaveBeenCalledWith('searchText.searchTerm', 'term');
      expect(dispatch).toHaveBeenCalledWith('changeAction');
    });

    it('should do nothing when searchTerm or id are undefined', () => {
      props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
      spyOn(formActions, 'change').and.returnValue('changeAction');
      render();
      const dispatch = jasmine.createSpy('dispatch');
      instance.attachDispatch(dispatch);

      instance.searchSnippets('term', null);
      expect(props.searchSnippets).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('componentDidMount', () => {
    it('should searchSnippets when storeKey is documentViewer', () => {
      props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
      props.searchTerm = 'term';
      render();
      spyOn(instance, 'searchSnippets');
      instance.componentDidMount();
      instance.attachDispatch(() => {});
      expect(instance.searchSnippets).not.toHaveBeenCalled();

      props.storeKey = 'documentViewer';
      render();
      instance.attachDispatch(() => {});
      spyOn(instance, 'searchSnippets');
      instance.componentDidMount();
      expect(instance.searchSnippets).toHaveBeenCalledWith('term', 'sharedId');
    });
  });

  describe('componentWillReceiveProps', () => {
    it('should searchSnippets when searchTerm or doc changes', () => {
      props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
      props.searchTerm = 'term';
      render();
      spyOn(instance, 'searchSnippets');
      instance.componentWillReceiveProps({ searchTerm: 'term', doc: props.doc });
      expect(instance.searchSnippets).not.toHaveBeenCalled();

      instance.componentWillReceiveProps({ searchTerm: 'another term', doc: props.doc });
      expect(instance.searchSnippets).toHaveBeenCalledWith('another term', 'sharedId');

      instance.componentWillReceiveProps({ searchTerm: 'term', doc: props.doc.set('sharedId', 'another id') });
      expect(instance.searchSnippets).toHaveBeenCalledWith('term', 'another id');
    });
  });

  describe('submit', () => {
    it('should searchSnippets with value, doc id and storeKey', (done) => {
      props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
      spyOn(browserHistory, 'push');
      render();

      instance.submit({ searchTerm: 'value' })
      .then(() => {
        expect(props.searchSnippets).toHaveBeenCalledWith('value', 'sharedId', 'storeKey');
        done();
      });
    });

    it('should add searchTerm into the url query', () => {
      props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
      render();
      spyOn(browserHistory, 'push');

      instance.submit({ searchTerm: 'value' });
      expect(browserHistory.push).toHaveBeenCalledWith('path?page=1&searchTerm=value');
    });
  });

  describe('on new props', () => {
    it('should set initial search to props.searchTerm and query for the snippets', () => {
      props.doc = Immutable.fromJS({ _id: 'id', sharedId: 'sharedId' });
      props.searchTerm = 'newSearchTerm';
      const dispatch = jasmine.createSpy('dispatch');
      render();
      instance.attachDispatch(dispatch);

      props.doc = Immutable.fromJS({ _id: 'another_id', sharedId: 'sharedId2' });

      instance.componentWillReceiveProps(props);
      expect(props.searchSnippets).toHaveBeenCalledWith('newSearchTerm', 'sharedId2', 'storeKey');
      expect(instance.formDispatch).toHaveBeenCalledWith(formActions.change('searchText.searchTerm', 'newSearchTerm'));
    });
  });
});
