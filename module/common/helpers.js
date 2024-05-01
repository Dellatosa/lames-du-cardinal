export default function registerHandlebarsHelpers() {
    
    Handlebars.registerHelper("times", function (n, block) {
        var accum = "";
        for (var i = 1; i <= n; ++i) {
          block.data.index = i;
          block.data.first = i === 0;
          block.data.last = i === n - 1;
          accum += block.fn(this);
        }
        return accum;
      });

    Handlebars.registerHelper("configLocalize", function(liste, val) {
        return game.i18n.localize(CONFIG.LdC[liste][val]);
    });

  /* Handlebar Helpers - card-hand-list */
  // Handlebar helper for concat but with a namespaced helper name so as not to override the default concat helper
  Handlebars.registerHelper('cardHandsList_Concat', function (string1, string2) {
    return string1 + string2;
  });

  // Handlebar helper for determining if the use is a GM
  Handlebars.registerHelper('cardHandsList_IsGM', function () {
    return game.user.isGM;
  });

  // Handlebar helper for searching if an array includes a string
  Handlebars.registerHelper('cardHandsList_Includes', function (array, str) {
    return array?.includes(str);
  });

  // Handlebar helper for sorting Cards in the Card Hands list.
  Handlebars.registerHelper('cardHandsList_SortCards', (objects, property) => {
    return Array.from(objects).sort((a, b) => {
      const property = 'sort';
      // Get the value of the property from each object
      const valueA = a[property];
      const valueB = b[property];

      // Compare the values
      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      };
    });
  });
}