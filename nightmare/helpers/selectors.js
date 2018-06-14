/*eslint max-len: ["error", 500], */
/*eslint key-spacing: ["error", 500] */
export default {
  settingsView: {
    liElementsOfSection: '#app > div.content > div > div > div.settings-content > div > ul > li',
    firstEditButton: '#app > div.content > div > div > div.settings-content > div > ul > li:nth-child(1) > div > a > i',
    collectionNameForm: '#app > div.content > div > div > div.settings-content > div > div.panel-body > form > div:nth-child(1) > input',
    settingsHeader: '#app > div.content > header > ul > li.menuActions > ul.menuNav-list > li:nth-child(3) > a',
    logoutButton: '#app > div.content > div > div > div.settings-content > div > div.settings-footer > a',
    accountButton: '#app > div.content > div > div > div.settings-navigation > div > div:nth-child(1) > div.list-group > a:nth-child(1)',
    collectionButton: '#app > div.content > div > div > div.settings-navigation > div > div:nth-child(1) > div.list-group > a:nth-child(3)',
    dictionariesButton: '#app > div.content > div > div > div.settings-navigation > div > div:nth-child(2) > div.list-group > a:nth-child(3)',
    documentsButton: '#app > div.content > div > div > div.settings-navigation > div > div:nth-child(2) > div.list-group > a:nth-child(1)',
    entitiesButton: '#app > div.content > div > div > div.settings-navigation > div > div:nth-child(2) > div.list-group > a:nth-child(2)',
    connectionsButton: '#app > div.content > div > div > div.settings-navigation > div > div:nth-child(2) > div.list-group > a:nth-child(4)',
    filtersButton: '#app > div.content > div > div > div.settings-navigation > div > div:nth-child(1) > div.list-group > a:nth-child(7)',
    createFilterGroupButton: '#app > div.content > div > div > div.settings-content > div > div.settings-footer > button.btn.btn-sm.btn-primary',
    newFilterGroupForm: '#app > div.content > div > div > div.settings-content > div > div.FiltersForm-list > div > div.panel-body > div > div.col-sm-9 > div > ul > div.list-group-item > div > div.input-group > input',
    listOfFilterGroups: '#app > div.content > div > div > div.settings-content > div > div.FiltersForm-list > div > div.panel-body > div > div.col-sm-9 > div > ul > div.list-group-item > div > div.input-group',
    filtrableTypesSaveButton: '#app > div.content > div > div > div.settings-content > div > div.settings-footer > button.btn.btn-sm.btn-success',
    dictionariesBackButton: '#app > div.content > div > div > div.settings-content > div > form > div > div.settings-footer > a.btn.btn-default',
    documentsBackButton: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.settings-footer > a',
    connectionsBackButton: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.settings-footer > a',
    entitiesBackButton: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.settings-footer > a',
    addNewDictionary: '#app > div.content > div > div > div.settings-content > div > div.settings-footer > a',
    addNewDocument: '#app > div.content > div > div > div.settings-content > div > div.settings-footer > a',
    addNewEntity: '#app > div.content > div > div > div.settings-content > div > div.settings-footer > a',
    addNewConnection: '#app > div.content > div > div > div.settings-content > div > div.settings-footer > a',
    addNewValueToDictionaryButton: '#app > div.content > div > div > div.settings-content > div > form > div > div.settings-footer > a.btn.btn-primary',
    firstDictionaryValForm: '#app > div.content > div > div > div.settings-content > div > form > div > ul > li:nth-child(2) > div > div > input',
    secondDictionaryValForm: '#app > div.content > div > div > div.settings-content > div > form > div > ul > li:nth-child(3) > div > div > input',
    saveDictionaryButton: '#app > div.content > div > div > div.settings-content > div > form > div > div.settings-footer > button',
    saveDocumentButton: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.settings-footer > button',
    saveEntityButton: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.settings-footer > button',
    saveConnectionButton: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.settings-footer > button',
    dictionaryNameForm: '#thesauriName',
    connectionNameForm: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.metadataTemplate-heading > div > div > input',
    entityNameForm: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.metadataTemplate-heading > div > div > input',
    entityBodyForm: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > ul',
    documentTemplateNameForm: '#app > div.content > div > div > div.settings-content > div > div > div.panel-body > div > main > div > form > div.metadataTemplate-heading > div > div > input',
    deleteButtonConfirmation: 'body > div.ReactModalPortal > div > div > div > div.modal-footer > button.btn.confirm-button.btn-danger',
    translationsButton: '#app > div.content > div > div > div.settings-navigation > div > div:nth-child(1) > div.list-group > a:nth-child(6)',
    translationInputEn: '#app > div.content > div > div > div.settings-content > div > form > div.panel.panel-default > ul > li:nth-child(3) > div:nth-child(2) > div > div > input',
    translationInputEs: '#app > div.content > div > div > div.settings-content > div > form > div.panel.panel-default > ul > li:nth-child(3) > div:nth-child(3) > div > div > input',
    translationsSaveButton: '#app > div.content > div > div > div.settings-content > div > form > div.settings-footer > button'
  },
  libraryView: {
    libraryFirstDocument: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(1)',
    libraryFirstDocumentLink: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(1) > div.item-actions > div:nth-child(2) > a',
    libraryFirstDocumentSnippet: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(1) > div.item-info > div.item-snippet-wrapper > div.item-snippet',
    librarySidePanelFirstSnippet: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > ul > li:nth-child(1)',
    librarySidePanelSecondSnippet: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > ul > li:nth-child(2)',
    libraryFirstDocumentTitle: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(1) > div.item-info > div',
    librarySecondDocument: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(2)',
    librarySecondDocumentTitle: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(2) > div.item-info > div > span',
    librarySecondDocumentLink: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(2) > div.item-actions > div:nth-child(2) > a',
    anyItemSnippet: 'div.item-snippet-wrapper > div',
    libraryThirdDocument: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(3)',
    libraryMultiEditListHeader: '#app > div.content > div > div > aside.side-panel.multi-edit > div.sidepanel-header',
    libraryMultiEditEditButton: '#app > div.content > div > div > aside.side-panel.multi-edit.is-active > div.sidepanel-footer > button.edit.btn.btn-primary',
    libraryMultiEditDeleteButton: '#app > div.content > div > div > aside.side-panel.multi-edit.is-active > div.sidepanel-footer > button.delete.btn.btn-danger',
    libraryMultiEditSaveButton: '#app > div.content > div > div > aside.side-panel.multi-edit.is-active > div.sidepanel-footer > button.btn.btn-success',
    libraryMultiEditFormOption: '#multiEdit > div:nth-child(2) > div > ul > li.wide > ul > li:nth-child(2) > label > span',
    libraryMultiEditFirstInput: '#multiEdit > div:nth-child(2) > div:nth-child(1) > ul > li.wide > div > input',
    libraryMetadataPanel: '.side-panel.metadata-sidepanel',
    searchInLibrary: '#app > div.content > header > div > a',
    searchForm: '#app > div.content > div > div > aside.side-panel.library-filters > div.sidepanel-body > div.search-box > form',
    searchInput: '#app > div.content > div > div > main > div > div > div.search-list > div > form > div.input-group > div > input',
    firstSearchSuggestion: '#app > div.content > div > div > aside.side-panel.library-filters > div.sidepanel-body > div.search-box > form > div.search-suggestions > p:nth-child(1) > a',
    firstDocumentViewButton: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(2) > div.item-actions > div:nth-child(2) > a',
    firstEntityViewButton: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(1) > div.item-actions > div:nth-child(2) > a',
    documentTypeFilter: '#app > div.content > div > div > aside.side-panel.library-filters > div.sidepanel-body > div.documentTypes-selector > ul > li:nth-child(4) > label > span',
    editEntityButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-footer > span > button.edit-metadata.btn.btn-primary',
    saveButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-footer > span > button.btn.btn-success',
    deleteButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-footer > span > button.delete-metadata.btn.btn-danger',
    deleteButtonConfirmation: 'body > div.ReactModalPortal > div > div > div > div.modal-footer > button.btn.confirm-button.btn-danger',
    loadMore: '#app > div.content > div > div > main > div > div > div.row > div:nth-child(2) > button',
    documentAfterLoadMore: '#app > div.content > div > div > main > div > div > div.item-group > div:nth-child(31)',
    superVillianType: '#app > div.content > div > div > aside.side-panel.library-filters > div.sidepanel-body > div.documentTypes-selector.nested-selector > ul > li:nth-child(2) > label > span',
    minorVillianType: '#app > div.content > div > div > aside.side-panel.library-filters > div.sidepanel-body > div.documentTypes-selector.nested-selector > ul > li:nth-child(5) > label > span',
    resetFilters: '#app > div.content > div > div > aside.side-panel.library-filters > div.sidepanel-footer > span',
    sidePanelCloseButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-header > i',
    sidePanelDocumentType: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > div > span'
  },
  documentView: {
    searchTextTab: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-header > div > ul > li:nth-child(1) > div',
    searchTextInput: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > form > div > div > div > input',
    searchTextForm: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div > form',
    viewerFirstDocumentSnippet: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > ul > li:nth-child(1)',
    viewerSidePanelFirstSnippet: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > ul > li:nth-child(2)',
    viewer: '#app > div.content > div > div > main',
    contentHeader: '#app > div.content > div > div > div.content-header.content-header-document > div > h1',
    documentPage: '.page',
    documentPageFirstParagraph: '#pageContainer1 > div.textLayer > div:nth-child(1)',
    createParagraphLinkButton: '#app > div.content > div > div > div.ContextMenu.ContextMenu-center > div > div:nth-child(1)',
    createReferenceSidePanelIsActive: '#app > div.content > div > div > aside.side-panel.create-reference.is-active',
    createReferenceSidePanelSelect: '#app > div.content > div > div > aside.side-panel.create-reference.is-active > div.sidepanel-header > select',
    createReferenceSidePanelSelectFirstType: '#app > div.content > div > div > aside.side-panel.create-reference.is-active > div.sidepanel-header > ul > li:nth-child(1)',
    createReferenceSidePanelInput: '#app > div.content > div > div > aside.side-panel.create-reference.is-active > div.sidepanel-header > div > div > input',
    createReferenceSidePanelFirstSearchSuggestion: '#app > div.content > div > div > aside.side-panel.create-reference.is-active > div.sidepanel-body > div > div > div',
    createReferenceSidePanelNextButton: '#app > div.content > div > div > aside.side-panel.undefined.create-reference.is-active > div.sidepanel-footer > button.edit-metadata.btn.btn-success',
    targetDocument: '.document-viewer.show-target-document',
    saveConnectionButton: '#app > div.content > div > div > main > div > div > div > div:nth-child(1) > div.ContextMenu.ContextMenu-center > button',
    activeConnection: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div',
    editButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-footer > span > button.edit-metadata.btn.btn-primary',
    saveButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-footer > span > button.btn.btn-success',
    deleteButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-footer > span > button.delete-metadata.btn.btn-danger',
    openSidePanelButton: '#app > div.content > div > div > div.ContextMenu.ContextMenu-bottom > div > div',
    sidePanelTitle: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > div > div > h1',
    metadataForm: '#metadataForm',
    unlinkIcon: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div > div.item-actions > div.item-shortcut-group > a.item-shortcut.btn.btn-default.btn-hover-danger',
    sidePanelInfoTab: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-header > div > ul > li:nth-child(5) > div',
    sidePanelFirstAttachmentTitle: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div:nth-child(2) > div.attachments-list > div > a > span > span',
    sidePanelFirstAttachmentEditTitleButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div:nth-child(2) > div.attachments-list > div > div > div > a',
    attachmentFormInput: '#attachmentForm > div > div > input',
    attachmentFormSubmit: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div:nth-child(2) > div.attachments-list > div > div.attachment-buttons > div > a.item-shortcut.btn.btn-success',
    attachmentFormCancel: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div:nth-child(2) > div.attachments-list > div > div.attachment-buttons > div > a.item-shortcut.btn.btn-primary',
    tocPannelLink: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-header > div > ul > li:nth-child(2) > div',
    tocPannel: '.toc'
  },
  entityView: {
    contentHeader: '#app > div.content > div > div > div.content-header.content-header-entity',
    contentHeaderTitle: '#app > div.content > div > div > div.content-header.content-header-entity > div.content-header-title > h1',
    editButton: '#app > div.content > div > div > div.sidepanel-footer > span > button.edit-metadata.btn.btn-primary',
    saveButton: '#app > div.content > div > div > div.sidepanel-footer > span > button.btn.btn-success',
    metadataForm: '#metadataForm',
    metadataFormTitle: '#metadataForm > div:nth-child(1) > ul > li.wide > div > textarea',
    metadataFormType: '#metadataForm > div:nth-child(2) > ul > li.wide > select',
    firstAttachmentTitle: '#app > div.content > div > div > main > div > div.tab-content.tab-content-visible > div > div > div:nth-child(2) > div.attachments-list > div > a > span > span:nth-child(1)',
    firstAttachmentEditTitleButton: '#app > div.content > div > div > main > div > div.tab-content.tab-content-visible > div > div > div:nth-child(2) > div.attachments-list > div > div > div > a:nth-child(1)',
    attachmentFormInput: '#attachmentForm > div > div > input',
    attachmentFormSubmit: '#app > div.content > div > div > main > div > div.tab-content.tab-content-visible > div > div > div:nth-child(2) > div.attachments-list > div > div.attachment-buttons > div > a.item-shortcut.btn.btn-success',
    conectionsTabLink: '#app > div.content > div > div > div > div.content-header-tabs > ul > li:nth-child(2) > div',
    connectionsListView: '#app > div.content > div > div > div.content-header.content-header-entity > div.content-header-tabs > ul > li:nth-child(2) > div'
  },
  uploadsView: {
    uploadBox: '#app > div.content > div > div > main > div.upload-box',
    firstDocument: '#app > div.content > div > div > main > div.documents-list > div > div.item-group > div:nth-child(1)',
    newEntityButtom: '#app > div.content > div > div > div > div > button',
    saveButton: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-footer > span > button.btn.btn-success',
    firstPublishButton: '#app > div.content > div > div > main > div.documents-list > div > div.item-group > div:nth-child(1) > div.item-actions > div:nth-child(2) > button',
    secondPublishButton: '#app > div.content > div > div > main > div.documents-list > div > div.item-group > div:nth-child(2) > div.item-actions > div:nth-child(2) > button',
    thirdPublishButton: '#app > div.content > div > div > main > div.documents-list > div > div.item-group > div:nth-child(3) > div.item-actions > div:nth-child(2) > button',
    acceptPublishModel: 'body > div.ReactModalPortal > div > div > div > div.modal-footer > button.btn.confirm-button.btn-success',
    metadataPanel: '.side-panel.metadata-sidepanel',
  },
  navigation: {
    loginNavButton: '#app > div.content > header > ul > li.menuActions > ul > li:nth-child(2) > a',
    uploadsNavButton: '#app > div.content > header > ul > li.menuActions > ul > li:nth-child(2) > a',
    libraryNavButton: '#app > div.content > header > ul > li.menuActions > ul > li:nth-child(1) > a',
    settingsNavButton: '#app > div.content > header > ul > li.menuActions > ul > li:nth-child(3) > a',
    spanish: '#app > div.content > header > ul > li.menuActions > ul.menuNav-I18NMenu > li:nth-child(2) > a',
    english: '#app > div.content > header > ul > li.menuActions > ul.menuNav-I18NMenu > li:nth-child(3) > a'
  },
  connections: {
    editButton: '#app > div.content > div > div > div.sidepanel-footer > span > button',
    saveButton: '#app > div.content > div > div > div.sidepanel-footer > span > button.btn.btn-success',
    newRelationshipButton: '#app > div.content > div > div > main > div > div.tab-content.tab-content-visible > div > div > div.relationships-graph > div > div > div > button',

    sortMenu: '#app > div.content > div > div > main > div > div.tab-content.tab-content-visible > div > div > div.sort-by.centered > div.sort-buttons > div > ul > li.Dropdown-option.is-active > a:nth-child(1)',
    searchInput: '#app > div.content > div > div > main > div > div.tab-content.tab-content-visible > div > div > div.search-list.centered > div > form > div > div > input',

    documentViewerConnectionsTab: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-header > div > ul > li:nth-child(6) > div',

    rightHandRelationships: '#app > div.content > div > div > main > div > div.tab-content.tab-content-visible > div > div > div.relationships-graph > div:nth-child(2) > div:nth-child(1) > div.rightRelationships div.rightRelationshipsTypeGroup',

    rightHandPerpetratorOption: 'li:nth-child(2)',
    rightHandHerosOption: 'li:nth-child(4)',
    eventOption: 'li:nth-child(5)',
    interpretationOption: 'li:nth-child(6)',

    sidePanelViewEntityButton: '#app > div.content > div > div > aside.side-panel.connections-metadata.is-active > div.sidepanel-footer > span > a > button',
    sidePanelSearchInput: '#app > div.content > div > div > aside.side-panel.create-reference.is-active > div.sidepanel-header > div > div > input',
    sidePanelDocuments: '#app > div.content > div > div > aside.side-panel.create-reference.is-active > div.sidepanel-body > div > div > div .item-name'
  },
  datePicker: {
    today: 'body div.react-datepicker__month div.react-datepicker__day.react-datepicker__day--today'
  },
  newEntity: {
    form: {
      title: '#metadataForm > div:nth-child(1) > ul > li.wide > div > textarea',
      type: '#metadataForm > div:nth-child(2) > ul > li.wide > select',
      realName: '#metadataForm > div:nth-child(4) > div:nth-child(1) > ul > li.wide > div > input',
      age: '#metadataForm > div:nth-child(4) > div:nth-child(2) > ul > li.wide > input',
      knownAccomplices: {
        joker: '#metadataForm > div:nth-child(4) > div:nth-child(3) > ul > li.wide > ul > li:nth-child(3) > label'
      },
      mainSuperpower: '#metadataForm > div:nth-child(4) > div:nth-child(4) > ul > li.wide > select',
      suporPowers: {
        fly: '#metadataForm > div:nth-child(4) > div:nth-child(5) > ul > li.wide > ul > li:nth-child(3) > label',
        laserBeam: '#metadataForm > div:nth-child(4) > div:nth-child(5) > ul > li.wide > ul > li:nth-child(5) > label'
      },
      firstSighting: '#metadataForm > div:nth-child(4) > div:nth-child(6) > ul > li.wide > div > input',
      whoIsHe: '#metadataForm > div:nth-child(4) > div:nth-child(7) > ul > li.wide > div > div.tab-content.tab-content-visible > textarea'
    },
    viewer: {
      title: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > div > div > h1',
      realName: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > dl:nth-child(2) > dd',
      age: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > dl:nth-child(3) > dd',
      knownAccomplices: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div > dl:nth-child(4) > dd > ul > li > a',
      mainSuperpower: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > dl:nth-child(5) > dd',
      superpowers: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > dl:nth-child(6) > dd > ul',
      firstSight: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > dl:nth-child(7) > dd',
      whoIsHe: '#app > div.content > div > div > aside.side-panel.metadata-sidepanel.is-active > div.sidepanel-body > div > div.tab-content.tab-content-visible > div > div.view > dl:nth-child(8) > dd > div > div > p'
    }
  }
};
