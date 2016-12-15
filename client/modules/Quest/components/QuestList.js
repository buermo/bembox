import React, { PropTypes } from 'react';

// Import Components
import QuestListItem from './QuestListItem';

function QuestList(props) {
  return (
    <div className="listView">
      {
        props.quests.map(quest => (
          <QuestListItem
            quest={quest}
            key={quest.cuid}
            onCheck={() => props.handleTakeAttendance(quest.cuid)}
          />
        ))
      }
    </div>
  );
}

QuestList.propTypes = {
  quests: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    done: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleTakeAttendance: PropTypes.func.isRequired,
};

export default QuestList;
