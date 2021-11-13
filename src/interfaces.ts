export interface CountryData {
  country: string,
  checkbox: boolean
}

interface CountryInfo {
  info?: string,
  flag: string
}

export interface ResponseDataProp {
  country: string,
  countryInfo: CountryInfo,
  cases: number,
  deaths: number,
  recovered: number,
  todayCases: number,
  todayDeaths: number,
  todayRecovered: number,
  active: number,
  activePerOneMillion: number,
  deathsPerOneMillion: number,
  tests: number,
  testsPerOneMillion: number,
  population: number,
}

export interface ResponeData {
  data: ResponseDataProp[]
}

export interface MockedData extends ResponeData {
  mockedData: boolean
} 
