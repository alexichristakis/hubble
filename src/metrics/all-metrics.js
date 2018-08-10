const RentalZindex = [
  {
    value: "Rental_Zindex_All_Homes_plus_Multifamily",
    label: "All Homes plus Multifamily"
  },
  { value: "Rental_Zindex_Bottom_Tier", label: "Bottom Tier" },
  { value: "Rental_Zindex_Middle_Tier", label: "Middle Tier" },
  { value: "Rental_Zindex_Top_Tier", label: "Top Tier" },
  { value: "Rental_Zindex_1Bedroom", label: "1 Bedroom" },
  { value: "Rental_Zindex_2Bedroom", label: "2 Bedroom" },
  { value: "Rental_Zindex_3Bedroom", label: "3 Bedroom" },
  { value: "Rental_Zindex_4Bedroom", label: "4 Bedroom" },
  { value: "Rental_Zindex_5_Bedroom_or_more", label: "5+ Bedroom" },
  { value: "Rental_Zindex_Studio", label: "Studio" },
  { value: "Rental_Zindex_Condominum", label: "Condominum" },
  {
    value: "Rental_Zindex_Single_Family_Residence",
    label: "Single Family Residence"
  },
  { value: "Rental_Zindex_All_Homes", label: "All Homes" },
  {
    value: "Rental_Zindex_Single_Family_Residence_Rental",
    label: "Single Family Residence Rental"
  },
  {
    value: "Rental_Zindex_Multi_Family_Residence_Rental",
    label: "Multi Family Residence Rental"
  }
];

const MedianRental = [
  { value: "Median_Rental_Price_All_Homes", label: "All Homes" },
  {
    value: "Median_Rental_Price_Single_Family_Residence",
    label: "Single Family Residence"
  },
  {
    value: "Median_Rental_Price_Multi_Family_Residence_Rental",
    label: "Multi Family Residence"
  },
  { value: "Median_Rental_Price_Condominum", label: "Condominum" }
];

const ListingsAndSales = [
  { value: "Buyer_Seller_Index_All_Homes", label: "Buyer Seller Index All Homes" },
  { value: "Market_Health_Index_All_Homes", label: "Market Health Index All Homes" },
  { value: "Median_Listing_price_All_Homes", label: "Median Listing price All Homes" },
  { value: "Median_Sold_price_All_Homes", label: "Median Sold price All Homes" },
  { value: "Median_Listing_Price_sqft_All_Homes", label: "Median Listing Price sqft All Homes" },
  {
    value: "Median_Change_in_Sale_Price_All_Homes",
    label: "Median Change in Sale Price All Homes"
  },
  { value: "Median_Sold_price_Condominum", label: "Median Sold price Condominum" },
  {
    value: "Median_Listing_price_Single_Family_Residence",
    label: "Median Listing price Single Family Residence"
  },
  {
    value: "Median_Sold_price_Single_Family_Residence",
    label: "Median Sold price Single Family Residence"
  },
  { value: "Median_Listing_price_Condominum", label: "Median Listing price Condominum" }
];

const HousingStock = [
  { value: "Housing_Stock_All_Homes", label: "All Homes" },
  {
    value: "Housing_Stock_Single_Family_Residence",
    label: "Single Family Residence"
  },
  { value: "Housing_Stock_Condominum", label: "Condominum" }
];

const PriceToRentRatio = [
  { value: "Price_to_rent_ratio_All_Homes", label: "All Homes" },
  {
    value: "Price_to_rent_ratio_Single_Family_Residence_Rental",
    label: "Single Family Residence Rental"
  },
  {
    value: "Price_to_rent_ratio_Multi_Family_Residence_Rental",
    label: "Multi Family Residence Rental"
  },
  { value: "Price_to_rent_ratio_Condominum", label: "Condominum" },
  { value: "Price_to_rent_ratio_1Bedroom", label: "1 Bedroom" },
  { value: "Price_to_rent_ratio_2Bedroom", label: "2 Bedroom" },
  { value: "Price_to_rent_ratio_3Bedroom", label: "3 Bedroom" },
  { value: "Price_to_rent_ratio_4Bedroom", label: "4 Bedroom" },
  {
    value: "Price_to_rent_ratio_5_Bedroom_or_more",
    label: "5+ Bedroom"
  },
  { value: "Price_to_rent_ratio_Bottom_Tier", label: "Bottom Tier" },
  { value: "Price_to_rent_ratio_Middle_Tier", label: "Middle Tier" },
  { value: "Price_to_rent_ratio_Top_Tier", label: "Top Tier" },
  { value: "Price_to_rent_ratio_Studio", label: "Studio" },
  {
    value: "Price_to_rent_ratio_Single_Family_Residence",
    label: "Single Family Residence"
  },
  {
    value: "Price_to_rent_ratio_All_Homes_plus_Multifamily",
    label: "All Homes plus Multifamily"
  },
  { value: "Price_to_rent_ratio_$_Sqft", label: "$ per Sqft" }
];

const ZHVI = [
  { value: "Zindex_All_Homes", label: "All Homes" },
  { value: "Zindex_Single_Family_Residence", label: "Single Family Residence" },
  { value: "Zindex_All_Homes_plus_Multifamily", label: "All Homes plus Multifamily" },
  { value: "Zindex_Condominum", label: "Condominum" },
  { value: "Zindex_Studio", label: "Studio" },
  { value: "Zindex_1Bedroom", label: "1 Bedroom" },
  { value: "Zindex_2Bedroom", label: "2 Bedroom" },
  { value: "Zindex_3Bedroom", label: "3 Bedroom" },
  { value: "Zindex_4Bedroom", label: "4 Bedroom" },
  { value: "Zindex_5_Bedroom_or_more", label: "5+ Bedroom" },
  { value: "Zindex_Bottom_Tier", label: "Bottom Tier" },
  { value: "Zindex_Middle_Tier", label: "Middle Tier" },
  { value: "Zindex_Top_Tier", label: "Top Tier" },
  {
    value: "Zindex_Single_Family_Residence_Rental",
    label: "Single Family Residence Rental"
  },
  { value: "Zindex_Multi_Family_Residence_Rental", label: "Multi Family Residence Rental" }
];

const Forecast = [
  {
    value: "ZRI_Forecast_All_Homes_plus_Multifamily",
    label: "ZRI Forecast All Homes plus Multifamily"
  }
];

const Metrics = [
  { label: "ZHVI", options: ZHVI },
  { label: "Rental Zindex", options: RentalZindex },
  { label: "Median Rental Price", options: MedianRental },
  { label: "Price to Rent Ratio", options: PriceToRentRatio },
  { label: "Listings and Sales", options: ListingsAndSales },
  { label: "Housing Stock", options: HousingStock },
  { label: "Forecast", options: Forecast }
];

module.exports = Metrics;
