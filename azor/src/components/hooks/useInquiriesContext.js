import { CustomerInquiryContext } from "../../contexts/InquiryContext";
import { useContext } from "react";

export const useCustomerInquiryContext = () => {
  const context = useContext(CustomerInquiryContext);

  if (!context) {
    throw Error(
      "useCustomerInquiry must be used inside a CustomerInquirytProvider"
    );
  }
  return context;
};
