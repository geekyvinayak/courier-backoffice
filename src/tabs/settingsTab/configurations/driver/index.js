import DeductionsAdditions from "./DeductionsAdditions/DeductionsAdditions";
import Documents from "./Documents/Documents";
import Fields from "./Fields/Fields";
import SettlementCycle from "./SettlementCycle/SettlementCycle";



const DriverTab = ({ selectedItem }) => {
    console.log("DriverTab",selectedItem)
  switch (selectedItem) {
    case "Deductions/ Additions":
      return <DeductionsAdditions />;
    case "Settlement Cycle":
      return <SettlementCycle />;
      case "Fields":
      return <Fields />;
    case "Documents":
      return <Documents />;
    
    // case "Rules":
    //   return <OrderRules />;
    default:
      return <DeductionsAdditions />;
  }
};

export default DriverTab;
