import LinkBtn from "../../../components/linkBtn";
import DiscountGrid from "./discountGrid";

export const Discount = () => {
  return (
    <div>
      <div className="ml-4 mt-4">
        <LinkBtn
          label="New Discount/Surcharge"
          url={"/pricelist/discounts-surcharges/create"}
        />
      </div>

      <DiscountGrid />
    </div>
  );
};
