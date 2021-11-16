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
  hrHR = 'hr-HR', // Croatian (Croatia)
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

export const getLegendTranslation = (locale: AvailableLocale): string => {
  switch (locale) {
    case AvailableLocale.arEG:
      return 'أسطورة';
    case AvailableLocale.caES:
      return 'Llegenda';
    case AvailableLocale.csCZ:
      return 'Legenda';
    case AvailableLocale.daDK:
      return 'Legende';
    case AvailableLocale.deCH:
      return 'Legende';
    case AvailableLocale.deDE:
      return 'Legende';
    case AvailableLocale.enCA:
      return 'Legend';
    case AvailableLocale.enGB:
      return 'Legend';
    case AvailableLocale.enUS:
      return 'Legend';
    case AvailableLocale.esES:
      return 'Leyenda';
    case AvailableLocale.esMX:
      return 'leyenda';
    case AvailableLocale.faIR:
      return 'شرح';
    case AvailableLocale.fiFI:
      return 'Legenda';
    case AvailableLocale.frCA:
      return 'Légende';
    case AvailableLocale.frFR:
      return 'Légende';
    case AvailableLocale.heIL:
      return 'כְּתוֹבֶת';
    case AvailableLocale.hrHR:
      return 'Legenda';
    case AvailableLocale.huHU:
      return 'Jelmagyarázat';
    case AvailableLocale.itIT:
      return 'Didascalia';
    case AvailableLocale.jaJP:
      return '伝';
    case AvailableLocale.koKR:
      return '명각';
    case AvailableLocale.mkMK:
      return 'читлив';
    case AvailableLocale.nbNO:
      return 'Legende';
    case AvailableLocale.nlNL:
      return 'Inskriptie';
    case AvailableLocale.plPL:
      return 'Legenda';
    case AvailableLocale.ptBR:
      return 'Legenda';
    case AvailableLocale.ruRU:
      return 'легенда';
    case AvailableLocale.svSE:
      return 'Inskrift';
    case AvailableLocale.trTR:
      return 'Kitabe';
    case AvailableLocale.ukUA:
      return 'легенда';
    case AvailableLocale.zhCN:
      return '说明';
    case AvailableLocale.zhTW:
      return '說明';
    default:
      return 'Legend';
  }
};
