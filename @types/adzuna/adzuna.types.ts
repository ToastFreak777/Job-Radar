export type AdzunaAPIQuery = {
  country: string;
  app_id: string;
  app_key: string;
  page: number;
  results_per_page?: number;
  what?: string;
  what_and?: string;
  what_phrase?: string;
  what_or?: string;
  what_exclude?: string;
  title_only?: string;
  where?: string;
  distance?: number;
  location0?: string;
  location1?: string;
  location2?: string;
  location3?: string;
  location4?: string;
  location5?: string;
  location6?: string;
  location7?: string;
  max_days_old?: number;
  category?: string;
  sort_dir?: string;
  sory_by?: string;
  salary_min?: number;
  salary_max?: number;
  salary_include_unknown?: string;
  full_time?: string;
  part_time?: string;
  contract?: string;
  permanent?: string;
  company?: string;
};

export type AdzunaCategory = {
  label: string;
  tag: string;
  __CLASS__: string;
};

export type AdzunaCompany = {
  display_name: string;
  __CLASS__: string;
};

export type AdzunaLocation = {
  area: [string];
  display_name: string;
  __CLASS__: string;
};

export type AdzunaJobs = {
  adref: string;
  category: AdzunaCategory;
  company: AdzunaCompany;
  contract_time: string;
  created: Date;
  description: string;
  id: string;
  latitude: number;
  location: AdzunaLocation;
  redirect_url: string;
  salary_is_predicted: string;
  salary_max: number;
  salary_min: number;
  title: string;
  __CLASS__: string;
};

export interface AdzuanaResponse {
  count: number;
  mean: number;
  results: [AdzunaJobs];
  __CLASS__: string;
}
