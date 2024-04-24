
// Userstate.js
import { createState } from 'react';  // This import may be causing the issue

export const setUserData = (user) => {
  const [userState, setUserState] = createState(user);  // Check this line
  // ... your logic to set user data
};
