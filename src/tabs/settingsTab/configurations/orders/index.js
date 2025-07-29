import HoldReasonsContent from "./HoldReasonsTemplates/HoldReasonsContent";
import ParcelTypesContent from "./ParcelTypes/ParcelTypesContent";
import ParcelTypeSchedulesContent from "./ParcelTypeSchedules/ParcelTypeSchedulesContent";
import StatusColorContent from "./StatusColorContent";
import RulesContent from "./RulesContent";

const OrderTab = ({ selectedItem }) => {
  switch (selectedItem) {
    case "Hold Reasons":
      return <HoldReasonsContent />;
    case "Parcel Types":
      return <ParcelTypesContent />;
    case "Parcel Types Schedules":
      return <ParcelTypeSchedulesContent />;
    case "Status Color":
      return <StatusColorContent />;
    case "Rules":
      return <RulesContent />;
    default:
      return <HoldReasonsContent />;
  }
};

export default OrderTab;
