import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import QuestList from '../components/QuestList';
import QuestCreate from '../components/QuestCreate';

// import HeaderNavigation from './HeaderNavigation';

// Import Actions
import { addQuestRequest, getTodayQuestsRequest, markQuestAttendanceRequest, deleteQuestRequest } from '../QuestActions';

// Import Selectors
import { getTodayQuests } from '../QuestReducer';

class QuestListPage extends Component {
  componentDidMount() {
    this.props.dispatch(getTodayQuestsRequest());
  }

  handleTakeAttendance = cuid => {
    this.props.dispatch(markQuestAttendanceRequest(cuid));
  };

  handleAddQuest = (name) => {
    this.props.dispatch(addQuestRequest({ name }));
  };

  handleArchive = (cuid) => {
    this.props.dispatch(deleteQuestRequest({ cuid }));
  };
  render() {
    return (
      <div>
        <QuestList
          handleTakeAttendance={this.handleTakeAttendance}
          handleArchive={this.handleArchive}
          quests={this.props.quests} />
        <QuestCreate addQuest={this.handleAddQuest} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
QuestListPage.need = [() => { return getTodayQuestsRequest(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    quests: getTodayQuests(state),
  };
}

QuestListPage.propTypes = {
  quests: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

QuestListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(QuestListPage);
