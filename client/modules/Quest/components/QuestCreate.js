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
      <div>
        <div className={styles['form-content']}>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <a className={styles['quest-submit-button']} href="#" onClick={this.addQuest}><FormattedMessage id="submit" /></a>
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
