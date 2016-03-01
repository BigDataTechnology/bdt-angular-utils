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
    },


    //Service che effettua il download di un file
    executeDownload: function(filename, blob) {
      var URL, a, downloadUrl;
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        return window.navigator.msSaveBlob(blob, filename);
      } else {
        URL = window.URL || window.webkitURL;
        downloadUrl = URL.createObjectURL(blob);
        a = document.createElement('a');
        if (typeof a.download === 'undefined') {
          window.location = downloadUrl;
        } else {
          a.href = downloadUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
        }
        return setTimeout((function() {
          return URL.revokeObjectURL(downloadUrl);
        }), 100);
      }
    },

    //Service che effettua un SpeechTextTo usando https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
    STT: function() {
      var deferred, recognition;
      deferred = $q.defer();
      console.log("STT Start");
      recognition = new webkitSpeechRecognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onend = function(e) {
        return deferred.resolve({
          transcript: 'no results'
        });
      };
      recognition.onresult = function(e) {
        console.log("onresult");
        recognition.onend = null;
        return deferred.resolve({
          transcript: e.results[0][0].transcript,
          confidence: e.results[0][0].confidence
        });
      };
      recognition.start();
      return deferred.promise;
    },

    //Service che effettua un TextToSpeech usando https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
    TTS: function(text, lang) {
      var deferred, u, voiceName, voices;
      deferred = $q.defer();
      voices = speechSynthesis.getVoices();
      voiceName = voices.filter(function(voice) {
        return voice.name === 'Alice';
      })[0];
      u = new SpeechSynthesisUtterance;
      u.text = text;
      u.voice = voiceName;
      u.lang = angular.isDefined(lang) ? lang : 'en-US';
      u.onend = function() {
        return deferred.resolve();
      };
      u.onerror = function(e) {
        return deferred.resolve(e);
      };
      speechSynthesis.speak(u);
      return deferred.promise;
    }


  };
});