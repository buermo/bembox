import { ADD_QUEST, TODAY_QUESTS, MARK_ATTENDANCE, DELETE_QUEST } from './QuestActions';

// Initial State
const initialState = { data: [] };

const QuestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUEST :
      return {
        data: [action.post, ...state.data],
      };

    case TODAY_QUESTS :
      var quests = action.quests;
      var todayString = new Date().toLocaleDateString();
      quests.forEach(function(v) {
        v.done = v.attendance.includes(todayString);
      });
      return {
        data: quests,
      };

    case MARK_ATTENDANCE :
      var quest = state.data.filter(q => q.cuid == action.cuid);
      var todayString = new Date().toLocaleDateString();
      if(!quest.attendance.includes(todayString)){
        quest.attendance.push(todayString);
      }
      return {
        data: state.data,
      };

    case DELETE_QUEST :
      return {
        data: state.data.filter(quest => quest.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getTodayQuests = all => all.quests.data;

// Export Reducer
export default QuestReducer;
