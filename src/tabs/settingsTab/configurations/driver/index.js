import DeductionsAdditions from "./DeductionsAdditions/DeductionsAdditions";



const DriverTab = ({ selectedItem }) => {
    console.log("DriverTab",selectedItem)
  switch (selectedItem) {
    case "Deductions/ Additions":
      return <DeductionsAdditions />;
    // case "Parcel Types":
    //   return <ParcelTypesContent />;
    // case "Parcel Types Schedules":
    //   return <ParcelTypeSchedulesContent />;
    // case "Status Color":
    //   return <StatusColorContent />;
    // case "Rules":
    //   return <OrderRules />;
    // default:
    //   return <HoldReasonsContent />;
  }
};

export default DriverTab;
