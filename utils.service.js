angular.module('bdt-angular-utils').factory('utils', function($q, toastr, $filter, allLangObj, $rootScope) {
  return {
    createLanguageObj: function(locale) {
      var language;
      language = allLangObj[locale] || {
            nativeName: locale,
            englishName: locale
          };
      language.code = locale;
      return language;
    },
    getAllLangMap: function() {
      var scope;
      scope = this;
      return _.map(_.keys(allLangObj), function(locale) {
        return scope.createLanguageObj(locale);
      });
    },

    //Service che ritorna la lista di lingue disponibili per l'i18n
    getAvailableLanguages: function() {
      var createLanguageObj, getCountry, setLanguagesMap;
      getCountry = function(locale) {
        var splitLocale;
        splitLocale = locale.split('-');
        if (splitLocale.length > 1) {
          splitLocale[1].toLowerCase();
        }
        return locale;
      };
      createLanguageObj = function(locale) {
        var language;
        language = allLangObj[locale] || {
              nativeName: locale,
              englishName: locale
            };
        language.code = locale;
        language.country = getCountry(locale);
        return language;
      };
      setLanguagesMap = function(langs) {
        return $rootScope.availableLanguages = langs.map(function(locale) {
          return createLanguageObj(locale);
        });
      };
      return Meteor.call("configs.getAvailableLanguages", function(error, res) {
        if (!error && res) {
          return setLanguagesMap(res);
        }
      });
    },

    //Service che ritorna la lista di temi
    getThemeList: function() {
      return [
        {
          code: "yo-theme-black",
          cssClass: "black"
        }, {
          code: "yo-theme-success",
          cssClass: "success-yo"
        }, {
          code: "yo-theme-primary",
          cssClass: "primary"
        }, {
          code: "yo-theme-info",
          cssClass: "info"
        }, {
          code: "yo-theme-warning",
          cssClass: "warning"
        }, {
          code: "yo-theme-white",
          cssClass: "white"
        }
      ];
    }
  };
});