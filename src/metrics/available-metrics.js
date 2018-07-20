const HomeValues = [
  { value: "zhvi_all_homes", label: "ZHVI All Homes (SFR, Condo/Co-op) ($)" },
  { value: "zhvi_condo/co-op", label: "ZHVI Condo/Co-op ($)" },
  { value: "zhvi_sfr", label: "ZHVI Single-Family Homes ($)" },
  { value: "zhvi_1_bedroom", label: "ZHVI 1 Bedroom Homes ($)" },
  { value: "zhvi_2_bedroom", label: "ZHVI 2 Bedroom Homes ($)" },
  { value: "zhvi_3_bedroom", label: "ZHVI 3 Bedroom Homes ($)" },
  { value: "zhvi_4_bedroom", label: "ZHVI 4 Bedroom Homes ($)" },
  { value: "zhvi_5_bedroom", label: "ZHVI 5+ Bedroom Homes ($)" },
  { value: "median_home_value_sq_ft", label: "Median Home Value Per Sq Ft ($)" }
];

const HomeListingsAndSales = [
  { value: "mon_home_sales_adj", label: "Monthly Home Sales (Number, Seasonally Adjusted)" },
  { value: "mon_home_sales_raw", label: "Monthly Home Sales (Number, Raw)" },
  { value: "median_list_price", label: "Median List Price ($)" },
  { value: "median_list_price_sq_ft", label: "Median List Price Per Sq Ft ($)" }
  // {value: ""}
];

const RentalValues = [
  { value: "zri_time_series_all", label: "ZRI Time Series: Multifamily, SFR, Condo/Co-op" },
  { value: "zri_time_series_sfr", label: "ZRI Time Series: SFR" },
  { value: "zri_time_series_multi", label: "ZRI Time Series: Multifamily" },
  { value: "zri_time_series_co", label: "ZRI Time Series: Condo/Co-op" },
  { value: "zri_median_sq_ft", label: "Median ZRI Per Sq Ft: SFR, Condo/Co-op" },
  { value: "zri_price_to_rent", label: "Price-to-Rent Ratio" },
  { value: "zri_forecast", label: "Zillow Rent Forecast" }
];

const RentalListings = [
  {
    value: "median_rent_list_price_sfr_condo/co-op",
    label: "Median Rent List Price ($), SFR, Condo/Co-op"
  }
];

const MoreMetrics = [
  { value: "negative_equity", label: "Negative Equity" },
  { value: "negative_equity_time_series", label: "Negative Equity Time Series" },
  { value: "median_household_income", label: "Median Household Income" }
];

const Metrics = [
  { label: "Home Values", options: HomeValues },
  { label: "Home Listings and Sales", options: HomeListingsAndSales },
  { label: "Rental Values", options: RentalValues },
  { label: "Rental Listings", options: RentalListings },
  { label: "More Metrics", options: MoreMetrics }
];

module.exports = Metrics;
