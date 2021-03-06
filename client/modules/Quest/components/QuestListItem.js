import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Glyphicon } from 'react-bootstrap';

// Import Style
import styles from './Content/QuestList.css';

export class QuestListItem extends Component {
  constructor(props) {
    super(props);
    var todayString = new Date().toLocaleDateString();
    this.state = { done: props.quest.attendance.includes(todayString)};
  };
  checkDone() {
    this.setState({done: true});
    this.props.onCheck(this.props.quest.cuid);
  };
  render() {
    return (
      <div className = "list-group-item row form-group">
          <input className="toggle col-sm-2" type="checkbox" checked={this.state.done} disabled={this.state.done} onChange={this.checkDone.bind(this)} />
          <Link to={`/quests/${this.props.quest.slug}-${this.props.quest.cuid}`} >
            {this.props.quest.name}
          </Link>
          <Glyphicon glyph='remove' className="remove col-sm-2" onClick={this.props.onArchive} />
      </div>
    );
  }
}

QuestListItem.propTypes = {
  quest: PropTypes.shape({
    name: PropTypes.string.isRequired,
    attendance: PropTypes.array.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onCheck: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default QuestListItem;
