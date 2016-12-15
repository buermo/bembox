import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Content/QuestList.css';

function QuestListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['quest-name']}>
        <input type="checkbox" checked={props.quest.done} disabled={props.quest.done} onChange={props.onCheck} />
        <Link to={`/quests/${props.quest.slug}-${props.quest.cuid}`} >
          {props.quest.name}
        </Link>
      </h3>
      <hr className={styles.divider} />
    </div>
  );
}

QuestListItem.propTypes = {
  quest: PropTypes.shape({
    name: PropTypes.string.isRequired,
    done: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default QuestListItem;
