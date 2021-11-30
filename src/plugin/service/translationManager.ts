export enum AvailableLocale {
  arEG = 'ar-EG', // Arabic (Egypt)
  caES = 'ca-ES', // Catalan (Spain)
  csCZ = 'cs-CZ', // Czech (Czech Republic)
  daDK = 'da-DK', // Danish (Denmark)
  deCH = 'de-CH', // German (Switzerland)
  deDE = 'de-DE', // German (Germany)
  enCA = 'en-CA', // English (Canada)
  enGB = 'en-GB', // English (United Kingdom)
  enUS = 'en-US', // English (United States)
  esES = 'es-ES', // Spanish (Spain)
  esMX = 'es-MX', // Spanish (Mexico)
  faIR = 'fa-IR', // Persian (Iran)
  fiFI = 'fi-FI', // Finnish (Finland)
  frCA = 'fr-CA', // French (Canada)
  frFR = 'fr-FR', // French (France)
  heIL = 'he-IL', // Hebrew (Israel)
  huHU = 'hu-HU', // Hungarian (Hungary)
  itIT = 'it-IT', // Italian (Italy)
  jaJP = 'ja-JP', // Japanese (Japan)
  koKR = 'ko-KR', // Korean (South Korea)
  mkMK = 'mk-MK', // Macedonian (Macedonia)
  nbNO = 'nb-NO', // Norwegian Bokmål (Norway)
  nlNL = 'nl-NL', // Dutch (Netherlands)
  plPL = 'pl-PL', // Polish (Poland)
  ptBR = 'pt-BR', // Portuguese (Brazil)
  ruRU = 'ru-RU', // Russian (Russia)
  svSE = 'sv-SE', // Swedish (Sweden)
  trTR = 'tr-TR', // Turkish (Turkey)
  ukUA = 'uk-UA', // Ukrainian (Ukraine)
  zhCN = 'zh-CN', // Chinese (China)
  zhTW = 'zh-TW', // Chinese (Taiwan)
}

export const getLocale = (input: string): AvailableLocale => {
  return Object.values(AvailableLocale).find((item) => item === input) ?? AvailableLocale.enGB;
};

export const getDateTimeLocale = (locale: AvailableLocale): any => {
  return require(`d3-time-format/locale/${locale}.json`);
};
