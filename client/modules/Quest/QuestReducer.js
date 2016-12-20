import { ADD_QUEST, TODAY_QUESTS, MARK_ATTENDANCE, DELETE_QUEST } from './QuestActions';

// Initial State
const initialState = { data: [] };

const QuestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUEST :
      return {
        data: [action.quest, ...state.data],
      };

    case TODAY_QUESTS :
      var quests = action.quests;
      
      return {
        data: quests,
      };

    case MARK_ATTENDANCE :
      var quest = state.data.filter(q => q.cuid == action.cuid);
      var todayString = new Date().toLocaleDateString();
      if(quest.length > 0 && !quest[0].attendance.includes(todayString)){
        quest[0].attendance.push(todayString);
        quest[0].done = true;
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

// Get today quests from store
export const getTodayQuests = all => all.quests.data;

// Export Reducer
export default QuestReducer;
