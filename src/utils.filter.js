angular.module('bdt-angular-utils')

//Somma di una lista di valori, se è presente il campo 'field' è implicito che la lista di valori
//da sommare sia un field dell'oggetto 'obj' passato
.filter('sum', function() {
  return function(obj, field) {
    if (angular.isDefined(obj)) {
      if (angular.isDefined(field)) {
        return _.reduce(_.pluck(obj, field), function(sum, n) {
          var num;
          num = Number(n);
          if (num) {
            return sum + num;
          } else {
            return sum;
          }
        }, 0);
      } else {
        return _.reduce(obj, function(sum, n) {
          var num;
          num = Number(n);
          if (num) {
            return sum + num;
          } else {
            return sum;
          }
        }, 0);
      }
    } else {
      return void 0;
    }
  };
})

//Ritorna una stringa che rappresenta i valori della lista con il separatore selezionato
//Di default il separatore è la virgola
.filter('dataList', function() {
  return function(data, separator) {
    var toReturn;
    toReturn = "";
    if (angular.isDefined(data)) {
      _.forEach(data, function(d) {
        if (toReturn === "") {
          return toReturn = d;
        } else {
          if (angular.isDefined(separator) && typeof separator === 'string') {
            return toReturn += separator + d;
          } else {
            return toReturn += ", " + d;
          }
        }
      });
      return toReturn;
    } else {
      return data;
    }
  };
})


.filter('groupBy', function() {
  return _.memoize(function(data, field) {
    return _.groupBy(data, field);
  });
})
.filter('capitalize', function() {
  return function(input, scope) {
    if (input !== null) {
      input = input.toLowerCase();
    }
    return input.substring(0, 1).toUpperCase() + input.substring(1);
  };
})
.filter('getLangCode', function() {
  return function(lang) {
    if (lang.substring(0, 2) !== "en") {
      return lang.substring(0, 2);
    } else {
      return lang.substring(3);
    }
  };
})
.filter('textTransform', function() {
  return function(text) {
    return text.split("_").join(" ").toLowerCase();
  };

})
.filter('textToNumber', function() {
  return function(text) {
    return Number(text)
  };
});
