import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_QUEST = 'ADD_QUEST';
export const TODAY_QUESTS = 'TODAY_QUESTS';
export const MARK_ATTENDANCE = 'MARK_ATTENDANCE';
export const DELETE_QUEST = 'DELETE_QUEST';

// Export Actions
export function addQuest(quest) {
  return {
    type: ADD_QUEST,
    quest,
  };
}

export function addQuestRequest(quest) {
  return (dispatch) => {
    return callApi('quests', 'post', {
      quest: {
        name: quest.name
      },
    }).then(res => dispatch(addQuest(res.quest)));
  };
}

export function getTodayQuests(quests) {
  return {
    type: TODAY_QUESTS,
    quests,
  };
}

export function getTodayQuestsRequest() {
  return (dispatch) => {
    return callApi('quests').then(res => {
      dispatch(getTodayQuests(res.quests));
    });
  };
}

export function markQuestAttendance(cuid) {
  return {
    type: MARK_ATTENDANCE,
    cuid,
  };
}

export function markQuestAttendanceRequest(cuid) {
  return (dispatch) => {
    return callApi(`quests/${cuid}`).then(() => dispatch(markQuestAttendance(cuid)));
  };
}

export function deleteQuest(cuid) {
  return {
    type: DELETE_QUEST,
    cuid,
  };
}

export function deleteQuestRequest(quest) {
  return (dispatch) => {
    return callApi(`quests/${quest.cuid}`, 'delete').then(() => dispatch(deleteQuest(quest.cuid)));
  };
}
