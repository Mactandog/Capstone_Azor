import { createContext, useReducer } from "react";

export const CustomerInquiryContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "GET_INQUIRIES":
      return {
        inquiries: action.payload,
      };
    case "CREATE_INQUIRY":
      return {
        inquiries: [action.payload, state.inquiries],
      };

    default:
      return state;
  }
};

export const CustomerInquiryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { users: null });

  return (
    <CustomerInquiryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomerInquiryContext.Provider>
  );
};
