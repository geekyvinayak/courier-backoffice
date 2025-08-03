import DeductionsAdditions from "./DeductionsAdditions/DeductionsAdditions";
import SettlementCycle from "./SettlementCycle/SettlementCycle";



const DriverTab = ({ selectedItem }) => {
    console.log("DriverTab",selectedItem)
  switch (selectedItem) {
    case "Deductions/ Additions":
      return <DeductionsAdditions />;
    case "Settlement Cycle":
      return <SettlementCycle />;
    // case "Parcel Types Schedules":
    //   return <ParcelTypeSchedulesContent />;
    // case "Status Color":
    //   return <StatusColorContent />;
    // case "Rules":
    //   return <OrderRules />;
    default:
      return <DeductionsAdditions />;
  }
};

export default DriverTab;
