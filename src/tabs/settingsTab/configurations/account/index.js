import BillingCycle from "./BillingCycle/BillingCycle";
import TaxSchedule from "./TaxSchedule/TaxSchedule";


const AccountTab = ({ selectedItem }) => {
  console.log("AccountTab selectedItem", selectedItem);
  switch (selectedItem) {
    case "Billing Cycle":
      return <BillingCycle />;
    case "Tax Schedules":
      return <TaxSchedule />;
    default:
      return <BillingCycle />;
  }
};

export default AccountTab;
