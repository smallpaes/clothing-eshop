import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directory.selector';

import Directory from './directory.component';

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

const DirectoryContainer = connect(mapStateToProps)(Directory);

export default DirectoryContainer;