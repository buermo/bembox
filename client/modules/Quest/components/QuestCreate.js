import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './Content/QuestList.css';

export class QuestCreate extends Component {
  addQuest = () => {
    const nameRef = this.refs.name;
    if (nameRef.value) {
      this.props.addQuest(nameRef.value);
      nameRef.value = '';
    }
  };

  render() {
    return (
      <div className="list-group container">
        <div className="list-group-item row form-inline">
          <input placeholder={this.props.intl.messages.authorName} className="form-control" ref="name" />
          <button type="submit" className="btn btn-primary" onClick={this.addQuest}>Add</button>
        </div>
      </div>
    );
  }
}

QuestCreate.propTypes = {
  addQuest: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(QuestCreate);
