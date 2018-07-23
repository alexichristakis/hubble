// const HomeValues = [
//   { value: "zhvi_all_homes", label: "ZHVI All Homes (SFR, Condo/Co-op) ($)" },
//   { value: "zhvi_condo/co-op", label: "ZHVI Condo/Co-op ($)" },
//   { value: "zhvi_sfr", label: "ZHVI Single-Family Homes ($)" },
//   { value: "zhvi_1_bedroom", label: "ZHVI 1 Bedroom Homes ($)" },
//   { value: "zhvi_2_bedroom", label: "ZHVI 2 Bedroom Homes ($)" },
//   { value: "zhvi_3_bedroom", label: "ZHVI 3 Bedroom Homes ($)" },
//   { value: "zhvi_4_bedroom", label: "ZHVI 4 Bedroom Homes ($)" },
//   { value: "zhvi_5_bedroom", label: "ZHVI 5+ Bedroom Homes ($)" },
//   { value: "median_home_value_sq_ft", label: "Median Home Value Per Sq Ft ($)" }
// ];

// const HomeListingsAndSales = [
//   { value: "mon_home_sales_adj", label: "Monthly Home Sales (Number, Seasonally Adjusted)" },
//   { value: "mon_home_sales_raw", label: "Monthly Home Sales (Number, Raw)" },
//   { value: "median_list_price", label: "Median List Price ($)" },
//   { value: "median_list_price_sq_ft", label: "Median List Price Per Sq Ft ($)" }
//   // {value: ""}
// ];

// const RentalValues = [
//   { value: "zri_time_series_all", label: "ZRI Time Series: Multifamily, SFR, Condo/Co-op" },
//   { value: "zri_time_series_sfr", label: "ZRI Time Series: SFR" },
//   { value: "zri_time_series_multi", label: "ZRI Time Series: Multifamily" },
//   { value: "zri_time_series_co", label: "ZRI Time Series: Condo/Co-op" },
//   { value: "zri_median_sq_ft", label: "Median ZRI Per Sq Ft: SFR, Condo/Co-op" },
//   { value: "zri_price_to_rent", label: "Price-to-Rent Ratio" },
//   { value: "zri_forecast", label: "Zillow Rent Forecast" }
// ];

// const RentalListings = [
//   {
//     value: "median_rent_list_price_sfr_condo/co-op",
//     label: "Median Rent List Price ($), SFR, Condo/Co-op"
//   }
// ];

// const MoreMetrics = [
//   { value: "negative_equity", label: "Negative Equity" },
//   { value: "negative_equity_time_series", label: "Negative Equity Time Series" },
//   { value: "median_household_income", label: "Median Household Income" }
// ];

const HousingIndicators =  [
  { value: "Buyer_Seller_Index_All_Homes", label: "Buyer Seller Index" },
  { value: "Market_Health_Index_All_Homes", label: "Market Health Index" },
  { value: "Housing_Stock_All_Homes", label: "Housing Stock (All Homes)"},
  { value: "Housing_Stock_Condominum", label: "Housing Stock (Condominium)" },
  { value: "Housing_Stock_Single_Family_Residence", label: "Housing Stock (Single Family Residence)"}, 
]; 

const Listings =  [
  { value: "Median_Listing_Price_sqft_All_Homes", label: "Median Listing Price by Sqft" },
  { value: "Median_Listing_price_All_Homes", label: "Median Listing Price (All Homes)"},
  { value: "Median_Listing_price_Condominum", label: "Median Listing Price (Condominium)"},
  { value: "Median_Listing_price_Single_Family_Residence", label: "Median Listing Price (Single Family Residence)"},
];

const Rentals =  [
  { value: "Median_Rental_Price_All_Homes", label: "Median Rental Prices (All Homes)"},
  { value: "Median_Rental_Price_Condominum", label: "Median Rental Prices (Condominium)"},
  { value: "Median_Rental_Price_Single_Family_Residence", label: "Median Rental Prices (Single Family Residence"},
  { value: "Median_Rental_Price_Multi_Family_Residence", label: "Median Rental Prices (Multi Family)"},
];

const Sales =  [
  { value: "Median_Sold_price_All_Homes", label: "Median Sale Prices (All Homes)"},
  { value: "Median_Sold_price_Condominum", label: "Median Sale Prices (Condominium)"},
  { value: "Median_Sold_price_Single_Family_Residence", label: "Median Sale Prices (Single Family REsidences)"}
];

const Metrics = [
  { label: "Housing Indicators", options: HousingIndicators },
  { label: "Listings", options: Listings },
  { label: "Rentals", options: Rentals },
  { label: "Sales", options: Sales },
];

module.exports = Metrics;
