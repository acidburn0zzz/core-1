(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.GuideGuideMessages = (function() {
    function GuideGuideMessages(locale) {
      this.ggnStringFromExistingGuides = __bind(this.ggnStringFromExistingGuides, this);
      this.ggnMoreThanOneHundredPercent = __bind(this.ggnMoreThanOneHundredPercent, this);
      this.ggnOneFillPerGrid = __bind(this.ggnOneFillPerGrid, this);
      this.ggnUndefinedVariable = __bind(this.ggnUndefinedVariable, this);
      this.ggnNoWildcardsInVariableFills = __bind(this.ggnNoWildcardsInVariableFills, this);
      this.ggnFillInVariable = __bind(this.ggnFillInVariable, this);
      this.ggnNoGrids = __bind(this.ggnNoGrids, this);
      this.gapNoFillWildcards = __bind(this.gapNoFillWildcards, this);
      this.gapUnrecognized = __bind(this.gapUnrecognized, this);
      this.alertMessageDonate = __bind(this.alertMessageDonate, this);
      this.alertTitleDonate = __bind(this.alertTitleDonate, this);
      this.alertMessageExportError = __bind(this.alertMessageExportError, this);
      this.alertTitleExportError = __bind(this.alertTitleExportError, this);
      this.alertMessageExportSuccess = __bind(this.alertMessageExportSuccess, this);
      this.alertTitleExportSuccess = __bind(this.alertTitleExportSuccess, this);
      this.alertMessageImportNotGist = __bind(this.alertMessageImportNotGist, this);
      this.alertTitleImportNotGist = __bind(this.alertTitleImportNotGist, this);
      this.alertMessageImportGistNoSets = __bind(this.alertMessageImportGistNoSets, this);
      this.alertTitleImportGistNoSets = __bind(this.alertTitleImportGistNoSets, this);
      this.alertMessageImportGistError = __bind(this.alertMessageImportGistError, this);
      this.alertTitleImportGistError = __bind(this.alertTitleImportGistError, this);
      this.alertMessageImportSuccess = __bind(this.alertMessageImportSuccess, this);
      this.alertTitleImportSuccess = __bind(this.alertTitleImportSuccess, this);
      this.alertMessageUpdate = __bind(this.alertMessageUpdate, this);
      this.alertTitleUpdate = __bind(this.alertTitleUpdate, this);
      this.alertMessageUpdateError = __bind(this.alertMessageUpdateError, this);
      this.alertTitleUpdateError = __bind(this.alertTitleUpdateError, this);
      this.alertMessageUpToDate = __bind(this.alertMessageUpToDate, this);
      this.alertTitleUpToDate = __bind(this.alertTitleUpToDate, this);
      this.alertTitleWelcome = __bind(this.alertTitleWelcome, this);
      this.helpImportExport = __bind(this.helpImportExport, this);
      this.helpGistExport = __bind(this.helpGistExport, this);
      this.helpImportDesc = __bind(this.helpImportDesc, this);
      this.helpRemainder = __bind(this.helpRemainder, this);
      this.helpPosition = __bind(this.helpPosition, this);
      this.uiOpenInBrowser = __bind(this.uiOpenInBrowser, this);
      this.uiNiceNo = __bind(this.uiNiceNo, this);
      this.uiNo = __bind(this.uiNo, this);
      this.uiYes = __bind(this.uiYes, this);
      this.uiVerticalLast = __bind(this.uiVerticalLast, this);
      this.uiVerticalCenter = __bind(this.uiVerticalCenter, this);
      this.uiVerticalFirst = __bind(this.uiVerticalFirst, this);
      this.uiHorizontalLast = __bind(this.uiHorizontalLast, this);
      this.uiHorizontalCenter = __bind(this.uiHorizontalCenter, this);
      this.uiHorizontalFirst = __bind(this.uiHorizontalFirst, this);
      this.uiVerticalRemainder = __bind(this.uiVerticalRemainder, this);
      this.uiHorizontalRemainder = __bind(this.uiHorizontalRemainder, this);
      this.uiVerticalPosition = __bind(this.uiVerticalPosition, this);
      this.uiHorizontalPosition = __bind(this.uiHorizontalPosition, this);
      this.uiShowLogs = __bind(this.uiShowLogs, this);
      this.uiCheckForUpdates = __bind(this.uiCheckForUpdates, this);
      this.uiDonate = __bind(this.uiDonate, this);
      this.uiCancel = __bind(this.uiCancel, this);
      this.uiOk = __bind(this.uiOk, this);
      this.uiExport = __bind(this.uiExport, this);
      this.uiImport = __bind(this.uiImport, this);
      this.uiSaveSettings = __bind(this.uiSaveSettings, this);
      this.uiSaveSet = __bind(this.uiSaveSet, this);
      this.uiMakeGrid = __bind(this.uiMakeGrid, this);
      this.uiDebug = __bind(this.uiDebug, this);
      this.uiUpdates = __bind(this.uiUpdates, this);
      this.uiSets = __bind(this.uiSets, this);
      this.uiCustom = __bind(this.uiCustom, this);
      this.uiGrid = __bind(this.uiGrid, this);
      if (locale != null) {
        this.i18n = locale;
      }
    }

    GuideGuideMessages.prototype.uiGrid = function() {
      switch (this.i18n) {
        case "es_es":
          return "Retícula";
        default:
          return "Grid";
      }
    };

    GuideGuideMessages.prototype.uiCustom = function() {
      switch (this.i18n) {
        case "es_es":
          return "Personalizada";
        default:
          return "Custom";
      }
    };

    GuideGuideMessages.prototype.uiSets = function() {
      switch (this.i18n) {
        case "es_es":
          return "Sets";
        default:
          return "Sets";
      }
    };

    GuideGuideMessages.prototype.uiUpdates = function() {
      switch (this.i18n) {
        case "es_es":
          return "Actualizaciones";
        default:
          return "Updates";
      }
    };

    GuideGuideMessages.prototype.uiDebug = function() {
      switch (this.i18n) {
        case "es_es":
          return "Debug";
        default:
          return "Debug";
      }
    };

    GuideGuideMessages.prototype.uiMakeGrid = function() {
      switch (this.i18n) {
        case "es_es":
          return "Crear retícula";
        default:
          return "Make grid";
      }
    };

    GuideGuideMessages.prototype.uiSaveSet = function() {
      switch (this.i18n) {
        case "es_es":
          return "Guardar set";
        default:
          return "Save set";
      }
    };

    GuideGuideMessages.prototype.uiSaveSettings = function() {
      switch (this.i18n) {
        case "es_es":
          return "Guardar ajustes";
        default:
          return "Save settings";
      }
    };

    GuideGuideMessages.prototype.uiImport = function() {
      switch (this.i18n) {
        case "es_es":
          return "Importar";
        default:
          return "Import";
      }
    };

    GuideGuideMessages.prototype.uiExport = function() {
      switch (this.i18n) {
        case "es_es":
          return "Exportar";
        default:
          return "Export";
      }
    };

    GuideGuideMessages.prototype.uiOk = function() {
      switch (this.i18n) {
        case "es_es":
          return "Ok";
        default:
          return "Ok";
      }
    };

    GuideGuideMessages.prototype.uiCancel = function() {
      switch (this.i18n) {
        case "es_es":
          return "Cancelar";
        default:
          return "Cancel";
      }
    };

    GuideGuideMessages.prototype.uiDonate = function() {
      switch (this.i18n) {
        case "es_es":
          return "Donar";
        default:
          return "Donate";
      }
    };

    GuideGuideMessages.prototype.uiCheckForUpdates = function() {
      switch (this.i18n) {
        case "es_es":
          return "Buscar actualizaciones";
        default:
          return "Check for updates";
      }
    };

    GuideGuideMessages.prototype.uiShowLogs = function() {
      switch (this.i18n) {
        case "es_es":
          return "Mostrar logs";
        default:
          return "Show logs";
      }
    };

    GuideGuideMessages.prototype.uiHorizontalPosition = function() {
      switch (this.i18n) {
        case "es_es":
          return "Posición horizontal";
        default:
          return "Horizontal position";
      }
    };

    GuideGuideMessages.prototype.uiVerticalPosition = function() {
      switch (this.i18n) {
        case "es_es":
          return "Posición vertical";
        default:
          return "Vertical position";
      }
    };

    GuideGuideMessages.prototype.uiHorizontalRemainder = function() {
      switch (this.i18n) {
        case "es_es":
          return "Resto horizontal";
        default:
          return "Horizontal remainder";
      }
    };

    GuideGuideMessages.prototype.uiVerticalRemainder = function() {
      switch (this.i18n) {
        case "es_es":
          return "Resto vertical";
        default:
          return "Vertical remainder";
      }
    };

    GuideGuideMessages.prototype.uiHorizontalFirst = function() {
      switch (this.i18n) {
        case "es_es":
          return "Izquierda";
        default:
          return "Left";
      }
    };

    GuideGuideMessages.prototype.uiHorizontalCenter = function() {
      switch (this.i18n) {
        case "es_es":
          return "Centro";
        default:
          return "Center";
      }
    };

    GuideGuideMessages.prototype.uiHorizontalLast = function() {
      switch (this.i18n) {
        case "es_es":
          return "Derecha";
        default:
          return "Right";
      }
    };

    GuideGuideMessages.prototype.uiVerticalFirst = function() {
      switch (this.i18n) {
        case "es_es":
          return "Arriba";
        default:
          return "Top";
      }
    };

    GuideGuideMessages.prototype.uiVerticalCenter = function() {
      switch (this.i18n) {
        case "es_es":
          return "Centro";
        default:
          return "Center";
      }
    };

    GuideGuideMessages.prototype.uiVerticalLast = function() {
      switch (this.i18n) {
        case "es_es":
          return "Abajo";
        default:
          return "Bottom";
      }
    };

    GuideGuideMessages.prototype.uiYes = function() {
      switch (this.i18n) {
        case "es_es":
          return "Si";
        default:
          return "Yes";
      }
    };

    GuideGuideMessages.prototype.uiNo = function() {
      switch (this.i18n) {
        case "es_es":
          return "No";
        default:
          return "No";
      }
    };

    GuideGuideMessages.prototype.uiNiceNo = function() {
      switch (this.i18n) {
        case "es_es":
          return "No, gracias";
        default:
          return "No thanks";
      }
    };

    GuideGuideMessages.prototype.uiOpenInBrowser = function() {
      switch (this.i18n) {
        case "es_es":
          return "Abrir en navegador";
        default:
          return "Open in browser";
      }
    };

    GuideGuideMessages.prototype.helpPosition = function() {
      switch (this.i18n) {
        case "es_es":
          return "Determina dónde coloca GuideGuide una retícula cuando es más pequeña que el área disponible.";
        default:
          return "This determines where GuideGuide puts a grid when it is smaller than the available area.";
      }
    };

    GuideGuideMessages.prototype.helpRemainder = function() {
      switch (this.i18n) {
        case "es_es":
          return "En modo pixel, GuideGuide redondea hacia abajo los anchos con píxeles decimales y usa este ajuste para determinar qué columnas o filas reciben los pixels sobrantes.";
        default:
          return "In pixel mode, GuideGuide rounds down decimal pixel widths and uses this setting to determine which columns or rows receive the remainder pixels.";
      }
    };

    GuideGuideMessages.prototype.helpImportDesc = function() {
      switch (this.i18n) {
        case "es_es":
          return "Importa sets pegando una url de GitHub Gist en el campo de texto de abajo.";
        default:
          return "Import sets by pasting a GitHub Gist url in the text field below.";
      }
    };

    GuideGuideMessages.prototype.helpGistExport = function() {
      switch (this.i18n) {
        case "es_es":
          return 'Estos son los datos de un set de guías exportado por el plugin GuideGuide. Para importarlos, haz click en el botón "Importar" en los ajustes de GuideGuide y pega la url de este Gist, o el contenido del fichero `sets.json` en el campo de texto.';
        default:
          return 'This is guide set data exported by the GuideGuide plugin. To import them, click the "Import" button in the GuideGuide settings and paste this Gist url, or the contents of `sets.json` into the text field.';
      }
    };

    GuideGuideMessages.prototype.helpImportExport = function() {
      switch (this.i18n) {
        case "es_es":
          return "GuideGuide importa y exporta sus datos mediante";
        default:
          return "GuideGuide imports and exports its data via";
      }
    };

    GuideGuideMessages.prototype.alertTitleWelcome = function() {
      switch (this.i18n) {
        case "es_es":
          return "Bienvenido a GuideGuide";
        default:
          return "Welcome to GuideGuide";
      }
    };

    GuideGuideMessages.prototype.alertTitleUpToDate = function() {
      switch (this.i18n) {
        case "es_es":
          return "Estás al día";
        default:
          return "Up to date";
      }
    };

    GuideGuideMessages.prototype.alertMessageUpToDate = function() {
      switch (this.i18n) {
        case "es_es":
          return "Ya tienes la última versión de GuideGuide.";
        default:
          return "GuideGuide is currently up to date.";
      }
    };

    GuideGuideMessages.prototype.alertTitleUpdateError = function() {
      switch (this.i18n) {
        case "es_es":
          return "Error buscando actualizaciones";
        default:
          return "Error checking for updates";
      }
    };

    GuideGuideMessages.prototype.alertMessageUpdateError = function() {
      switch (this.i18n) {
        case "es_es":
          return "Desgraciadamente, GuideGuide no ha sido capaz de buscar actualizaciones en este momento. Por favor, inténtalo de nuevo más adelante.";
        default:
          return "Unfortunately, GuideGuide is unable to check for updates at this time. Please try again later.";
      }
    };

    GuideGuideMessages.prototype.alertTitleUpdate = function() {
      return "Updates available";
    };

    GuideGuideMessages.prototype.alertMessageUpdate = function() {
      return "Update GuideGuide to get the latest version.";
    };

    GuideGuideMessages.prototype.alertTitleImportSuccess = function() {
      switch (this.i18n) {
        case "es_es":
          return "Sets importados";
        default:
          return "Sets imported";
      }
    };

    GuideGuideMessages.prototype.alertMessageImportSuccess = function() {
      switch (this.i18n) {
        case "es_es":
          return "Tus sets se han importado correctamente.";
        default:
          return "Your sets have successfully been imported.";
      }
    };

    GuideGuideMessages.prototype.alertTitleImportGistError = function() {
      switch (this.i18n) {
        case "es_es":
          return "Error de Importación";
        default:
          return "Import Error";
      }
    };

    GuideGuideMessages.prototype.alertMessageImportGistError = function() {
      switch (this.i18n) {
        case "es_es":
          return "Desgraciadamente, GuideGuide no ha sido capaz de importar sets en este momento. Por favor, inténtalo de nuevo más adelante.";
        default:
          return "Unfortunately, GuideGuide is unable to import sets at this time. Please try again later.";
      }
    };

    GuideGuideMessages.prototype.alertTitleImportGistNoSets = function() {
      switch (this.i18n) {
        case "es_es":
          return "Error de Importación";
        default:
          return "Import error";
      }
    };

    GuideGuideMessages.prototype.alertMessageImportGistNoSets = function() {
      switch (this.i18n) {
        case "es_es":
          return "GuideGuide no ha sido capaz de encontrar sets.json en este Gist.";
        default:
          return "GuideGuide was not able to find sets.json in this Gist.";
      }
    };

    GuideGuideMessages.prototype.alertTitleImportNotGist = function() {
      switch (this.i18n) {
        case "es_es":
          return "Error de Importación";
        default:
          return "Import Error";
      }
    };

    GuideGuideMessages.prototype.alertMessageImportNotGist = function() {
      switch (this.i18n) {
        case "es_es":
          return "El texto de entrada no contiene una url de GitHub Gist.";
        default:
          return "The input text does not contain a GitHub Gist url.";
      }
    };

    GuideGuideMessages.prototype.alertTitleExportSuccess = function() {
      switch (this.i18n) {
        case "es_es":
          return "Sets exportados";
        default:
          return "Sets have been exported";
      }
    };

    GuideGuideMessages.prototype.alertMessageExportSuccess = function(url) {
      var button;
      button = "<div><strong><a class='js-link button export-button' href='" + url + "'>" + (this.uiOpenInBrowser()) + "</a></strong></div>";
      switch (this.i18n) {
        case "es_es":
          return "Tus sets han sido exportados a un GitHub Gist secreto. " + button;
        default:
          return "Your sets have been exported to a secret GitHub Gist. " + button;
      }
    };

    GuideGuideMessages.prototype.alertTitleExportError = function() {
      switch (this.i18n) {
        case "es_es":
          return "Imposible exportar";
        default:
          return "Unable to export";
      }
    };

    GuideGuideMessages.prototype.alertMessageExportError = function() {
      switch (this.i18n) {
        case "es_es":
          return "Desgraciadamente, GuideGuide no ha sido capaz de exportar sets en este momento. Por favor, inténtalo de nuevo más adelante.";
        default:
          return "Unfortunately, GuideGuide is unable to export sets at this time. Please try again later.";
      }
    };

    GuideGuideMessages.prototype.alertTitleDonate = function() {
      switch (this.i18n) {
        case "es_es":
          return "¿Te gustaría donar?";
        default:
          return "Would you like to donate?";
      }
    };

    GuideGuideMessages.prototype.alertMessageDonate = function() {
      switch (this.i18n) {
        case "es_es":
          return "¡Vaya, ya has usado GuideGuide 30 veces! Parece que le estás sacando bastante partido a GuideGuide, ¿te interesaría hacer una donación para contribuir a su desarrollo?";
        default:
          return "Yowza, you've used GuideGuide 30 times! Since you seem to get quite a bit of use out of GuideGuide, would you consider making a donation to the development?";
      }
    };

    GuideGuideMessages.prototype.gapUnrecognized = function() {
      switch (this.i18n) {
        case "es_es":
          return "Hueco no reconocido";
        default:
          return "Unrecognized gap";
      }
    };

    GuideGuideMessages.prototype.gapNoFillWildcards = function() {
      switch (this.i18n) {
        case "es_es":
          return "Los comodines no pueden ser rellenos";
        default:
          return "Wildcards cannot be fills";
      }
    };

    GuideGuideMessages.prototype.ggnNoGrids = function() {
      switch (this.i18n) {
        case "es_es":
          return "Esta cadena no contiene ninguna retícula";
        default:
          return "This string does not contain any grids";
      }
    };

    GuideGuideMessages.prototype.ggnFillInVariable = function() {
      switch (this.i18n) {
        case "es_es":
          return "Las variables no pueden contener un relleno";
        default:
          return "Variables cannot contain a fill";
      }
    };

    GuideGuideMessages.prototype.ggnNoWildcardsInVariableFills = function() {
      switch (this.i18n) {
        case "es_es":
          return "Una variable usada como relleno no puede contener un comodín";
        default:
          return "A variable used as a fill can not contain a wildcard";
      }
    };

    GuideGuideMessages.prototype.ggnUndefinedVariable = function() {
      switch (this.i18n) {
        case "es_es":
          return "Variable no definida";
        default:
          return "Undefined variable";
      }
    };

    GuideGuideMessages.prototype.ggnOneFillPerGrid = function() {
      switch (this.i18n) {
        case "es_es":
          return "Una retícula sólo puede contener un relleno";
        default:
          return "A grid can only contain one fill";
      }
    };

    GuideGuideMessages.prototype.ggnMoreThanOneHundredPercent = function() {
      switch (this.i18n) {
        case "es_es":
          return "Una retícula no puede contener más del 100%";
        default:
          return "A grid cannot contain more than 100%";
      }
    };

    GuideGuideMessages.prototype.ggnStringFromExistingGuides = function() {
      switch (this.i18n) {
        case "es_es":
          return "Cadena generada a partir de las guías existentes";
        default:
          return "String generated from existing guides";
      }
    };

    return GuideGuideMessages;

  })();

}).call(this);
