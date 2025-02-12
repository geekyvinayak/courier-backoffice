import LinkBtn from "../../../components/linkBtn";
import DiscountGrid from "./discountGrid";

export const Discount = () => {
  return (
    <div className="wraper-container">
      <div>
        <LinkBtn
          label="New Discount/Surcharge"
          url={"/pricelist/discounts-surcharges/create"}
        />
      </div>

      <DiscountGrid />
    </div>
  );
};
