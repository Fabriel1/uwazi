import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import {Button, SidePanel} from '../../Layout';
import {resetEvidencesFilters, evidencesActions} from '../actions';
import {t} from '../../I18N';
import EvidencesFiltersForm from './EvidencesFiltersForm';

const EvidencesSidePanel = (props) => {
  return (
    <SidePanel open className="library-filters">

      <SidePanel.Footer>
        <Button onClick={props.reset} icon="refresh">{t('System', 'Reset')}</Button>
        <Button success icon="search">{t('System', 'Search')}</Button>
        <Button danger onClick={props.deleteSuggestions} icon="trash">Delete Suggestions</Button>
      </SidePanel.Footer>

      <SidePanel.Body>
        <p className="sidepanel-title">{t('System', 'Filters configuration')}</p>
        <EvidencesFiltersForm />
      </SidePanel.Body>

    </SidePanel>
  );
};

EvidencesSidePanel.propTypes = {
  thesauris: PropTypes.instanceOf(Immutable.List),
  deleteSuggestions: PropTypes.func,
  reset: PropTypes.func
};

export function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    reset: resetEvidencesFilters,
    deleteSuggestions: evidencesActions.deleteSuggestions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EvidencesSidePanel);
