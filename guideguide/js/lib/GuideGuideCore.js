(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  window.GuideGuideCore = (function() {
    GuideGuideCore.prototype.siteUrl = 'http://guideguide.me/update/';

    GuideGuideCore.prototype.env = 'production';

    GuideGuideCore.prototype.bridge = {};

    GuideGuideCore.prototype.data = {};

    function GuideGuideCore(args, callback) {
      this.updateTheme = __bind(this.updateTheme, this);
      this.log = __bind(this.log, this);
      this.toggleGuides = __bind(this.toggleGuides, this);
      this.openURL = __bind(this.openURL, this);
      this.isDemo = __bind(this.isDemo, this);
      this.calculationType = __bind(this.calculationType, this);
      this.clearGuides = __bind(this.clearGuides, this);
      this.makeGridFromCustom = __bind(this.makeGridFromCustom, this);
      this.makeGridFromSet = __bind(this.makeGridFromSet, this);
      this.makeGridFromForm = __bind(this.makeGridFromForm, this);
      this.quickGuide = __bind(this.quickGuide, this);
      this.addGuides = __bind(this.addGuides, this);
      this.getGGNFromExistingGuides = __bind(this.getGGNFromExistingGuides, this);
      this.addGuidesfromGGN = __bind(this.addGuidesfromGGN, this);
      this.getGuidesFromGGN = __bind(this.getGuidesFromGGN, this);
      this.stringifyGridPlane = __bind(this.stringifyGridPlane, this);
      this.stringifyFormData = __bind(this.stringifyFormData, this);
      this.validateInput = __bind(this.validateInput, this);
      this.formChanged = __bind(this.formChanged, this);
      this.consolidate = __bind(this.consolidate, this);
      this.settingsBootstrap = __bind(this.settingsBootstrap, this);
      this.setsBootstrap = __bind(this.setsBootstrap, this);
      this.panelBootstrap = __bind(this.panelBootstrap, this);
      this.getDocumentInfo = __bind(this.getDocumentInfo, this);
      this.generateSetID = __bind(this.generateSetID, this);
      this.button = __bind(this.button, this);
      this.donate = __bind(this.donate, this);
      this.dismissAlert = __bind(this.dismissAlert, this);
      this.alert = __bind(this.alert, this);
      this.hideLoader = __bind(this.hideLoader, this);
      this.showLoader = __bind(this.showLoader, this);
      this.importSets = __bind(this.importSets, this);
      this.exportSets = __bind(this.exportSets, this);
      this.saveSet = __bind(this.saveSet, this);
      this.deleteSet = __bind(this.deleteSet, this);
      this.getSets = __bind(this.getSets, this);
      this.recordUsage = __bind(this.recordUsage, this);
      this.saveData = __bind(this.saveData, this);
      this.checkForUpdates = __bind(this.checkForUpdates, this);
      this.manualCheckForUpdates = __bind(this.manualCheckForUpdates, this);
      this.refreshSets = __bind(this.refreshSets, this);
      this.refreshSettings = __bind(this.refreshSettings, this);
      var _base, _base1, _base2;
      this.bridge = args.bridge;
      this.messages = new GuideGuideMessages(this.bridge.locale);
      this.bridge.init(this);
      this.data = this.bridge.getData();
      (_base = this.data).panel || (_base.panel = this.panelBootstrap());
      (_base1 = this.data).sets || (_base1.sets = this.setsBootstrap());
      (_base2 = this.data).settings || (_base2.settings = this.settingsBootstrap());
      this.data.panel.launchCount++;
      this.saveData();
      if (args.siteUrl != null) {
        this.siteUrl = args.siteUrl;
      }
      this.bridge.localizeUI();
      this.refreshSets();
      this.refreshSettings();
      if (!this.isDemo()) {
        if (this.data.application.checkForUpdates) {
          this.checkForUpdates((function(_this) {
            return function(data) {
              _this.bridge.hideLoader();
              if ((data != null) && data.hasUpdate) {
                return _this.bridge.showUpdateIndicator(data);
              }
            };
          })(this));
        }
      }
      if (callback) {
        callback(this);
      }
    }

    GuideGuideCore.prototype.refreshSettings = function() {
      return this.bridge.refreshSettings(this.data.settings);
    };

    GuideGuideCore.prototype.refreshSets = function() {
      return this.bridge.refreshSets(this.getSets());
    };

    GuideGuideCore.prototype.manualCheckForUpdates = function() {
      this.hideLoader();
      return this.checkForUpdates((function(_this) {
        return function(data) {
          _this.log(data);
          if (data != null) {
            if (data.hasUpdate) {
              _this.bridge.showUpdateIndicator(data);
              return _this.bridge.showUpdateInfo();
            } else {
              return _this.alert({
                title: _this.messages.alertTitleUpToDate(),
                message: _this.messages.alertMessageUpToDate()
              });
            }
          } else {
            return _this.alert({
              title: _this.messages.alertTitleUpdateError(),
              message: _this.messages.alertMessageUpdateError()
            });
          }
        };
      })(this));
    };

    GuideGuideCore.prototype.checkForUpdates = function(callback) {
      var result;
      this.log('Checking for updates');
      result = {
        hasUpdate: false
      };
      return $.ajax({
        type: 'GET',
        url: "" + this.siteUrl + this.data.application.id,
        success: (function(_this) {
          return function(data) {
            var hasUpdate, i, num, ours, theirs, _i, _len;
            hasUpdate = false;
            ours = _this.data.application.guideguideVersion.replace(/-/g, '.').split('.');
            theirs = data.version.replace(/-/g, '.').split('.');
            while (theirs.length < ours.length) {
              theirs.push(0);
            }
            while (theirs.length > ours.length) {
              ours.push(0);
            }
            for (i = _i = 0, _len = theirs.length; _i < _len; i = ++_i) {
              num = theirs[i];
              if (parseInt(num) > parseInt(ours[i])) {
                result.hasUpdate = true;
                result.url = data.url;
                result.title = _this.messages.alertTitleUpdate();
                result.message = _this.messages.alertMessageUpdate();
              }
            }
            return callback(result);
          };
        })(this),
        error: (function(_this) {
          return function(error) {
            _this.log(error);
            return callback(result);
          };
        })(this)
      });
    };

    GuideGuideCore.prototype.saveData = function(data) {
      if (data) {
        this.data = $.extend(true, this.data, data);
      }
      return this.bridge.setData(this.data);
    };

    GuideGuideCore.prototype.recordUsage = function(property, count) {
      var button1, button2;
      if (count == null) {
        count = 1;
      }
      this.data.panel.usage.lifetime += count;
      if (this.data.panel.usage[property] != null) {
        this.data.panel.usage[property]++;
        if (property !== 'clear') {
          this.data.panel.usage.guideActions++;
        }
        this.saveData();
      }
      if (this.data.panel.usage.guideActions === 30 && this.data.application.env !== 'demo') {
        button1 = this.button(this.messages.uiDonate(), 'donate', true);
        button2 = this.button(this.messages.uiNiceNo());
        this.alert({
          title: this.messages.alertTitleDonate(),
          message: this.messages.alertMessageDonate(),
          buttons: [button1, button2]
        });
      }
      return this.data.panel.usage;
    };

    GuideGuideCore.prototype.getSets = function(args) {
      var group;
      group = this.data.sets[(args != null ? args.group : void 0) || "Default"];
      if (!(args != null ? args.set : void 0)) {
        return group.sets;
      }
      return group.sets[args.set];
    };

    GuideGuideCore.prototype.deleteSet = function(group, set) {
      delete this.data.sets[group].sets[set];
      this.saveData();
      return this.refreshSets();
    };

    GuideGuideCore.prototype.saveSet = function(data) {
      var set;
      if ((data.id != null) && data.id.length > 0) {
        delete this.data.sets["Default"].sets[data.id];
      }
      if (typeof data.contents === "object") {
        data.contents = this.stringifyFormData(data.contents);
      }
      set = {
        name: data.name,
        string: data.contents
      };
      set.id = this.generateSetID(set);
      this.data.sets["Default"].sets[set.id] = set;
      this.saveData();
      this.refreshSets();
      this.bridge.selectTab('sets');
      return set;
    };

    GuideGuideCore.prototype.exportSets = function() {
      var data;
      if (this.isDemo()) {
        return;
      }
      data = {
        description: this.messages.helpGistExport(),
        "public": false,
        files: {
          "sets.json": {
            content: JSON.stringify(this.data.sets)
          }
        }
      };
      this.showLoader();
      return $.ajax({
        url: 'https://api.github.com/gists',
        type: 'POST',
        data: JSON.stringify(data),
        complete: (function(_this) {
          return function(data) {
            return _this.hideLoader();
          };
        })(this),
        success: (function(_this) {
          return function(data) {
            return _this.alert({
              title: _this.messages.alertTitleExportSuccess(),
              message: _this.messages.alertMessageExportSuccess(data.html_url)
            });
          };
        })(this),
        error: (function(_this) {
          return function(data) {
            return _this.alert({
              title: _this.messages.alertTitleExportError(),
              message: _this.messages.alertMessageExportError()
            });
          };
        })(this)
      });
    };

    GuideGuideCore.prototype.importSets = function(id) {
      if (id == null) {
        return this.alert({
          title: this.messages.alertTitleImportNotGist(),
          message: this.messages.alertMessageImportNotGist()
        });
      }
      this.showLoader();
      return $.ajax({
        url: "https://api.github.com/gists/" + id,
        type: 'GET',
        complete: (function(_this) {
          return function(data) {
            return _this.hideLoader();
          };
        })(this),
        success: (function(_this) {
          return function(data) {
            var g, group, key, set, sets, _base, _ref;
            if (data.files["sets.json"] && (sets = JSON.parse(data.files["sets.json"].content))) {
              _this.bridge.hideImporter();
              for (key in sets) {
                group = sets[key];
                (_base = _this.data.sets)[key] || (_base[key] = {
                  name: group.name,
                  sets: []
                });
                g = _this.data.sets[key];
                _ref = group.sets;
                for (key in _ref) {
                  set = _ref[key];
                  if (g.sets[set.id] == null) {
                    g.sets[set.id] = set;
                  }
                }
              }
              _this.saveData();
              _this.refreshSets();
              _this.bridge.selectTab('sets');
              return _this.alert({
                title: _this.messages.alertTitleImportSuccess(),
                message: _this.messages.alertMessageImportSuccess()
              });
            } else {
              return _this.alert({
                title: _this.messages.alertTitleImportGistNoSets(),
                message: _this.messages.alertMessageImportGistNoSets()
              });
            }
          };
        })(this),
        error: (function(_this) {
          return function(data) {
            return _this.alert({
              title: _this.messages.alertTitleImportGistError(),
              message: _this.messages.alertMessageImportGistError()
            });
          };
        })(this)
      });
    };

    GuideGuideCore.prototype.showLoader = function() {
      return this.bridge.showLoader();
    };

    GuideGuideCore.prototype.hideLoader = function() {
      return this.bridge.hideLoader();
    };

    GuideGuideCore.prototype.alert = function(args) {
      if (args == null) {
        return;
      }
      args.title || (args.title = "Title");
      args.message || (args.message = "Message");
      args.buttons || (args.buttons = [this.button(this.messages.uiOk(), 'dismissAlert', true)]);
      return this.bridge.alert(args);
    };

    GuideGuideCore.prototype.dismissAlert = function() {
      return this.bridge.dismissAlert();
    };

    GuideGuideCore.prototype.donate = function() {
      return this.bridge.openURL("http://guideguide.me/donate");
    };

    GuideGuideCore.prototype.button = function(label, callbackName, primary) {
      return {
        label: label,
        callback: callbackName,
        primary: primary || false
      };
    };

    GuideGuideCore.prototype.generateSetID = function(set) {
      return this.bridge.toHash("" + set.name + set.string);
    };

    GuideGuideCore.prototype.getDocumentInfo = function(callback) {
      return this.bridge.getDocumentInfo((function(_this) {
        return function(info) {
          return callback(info);
        };
      })(this));
    };

    GuideGuideCore.prototype.panelBootstrap = function() {
      return {
        id: null,
        launchCount: 0,
        usage: {
          lifetime: 0,
          guideActions: 0,
          grid: 0,
          custom: 0,
          set: 0,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          verticalMidpoint: 0,
          horizontalMidpoint: 0,
          clear: 0
        }
      };
    };

    GuideGuideCore.prototype.setsBootstrap = function() {
      var set1, set2, set3, setsBootstrap;
      set1 = {
        name: 'Outline',
        string: "| ~ | (vFl)\n| ~ | (hFl)"
      };
      set2 = {
        name: 'Two column grid',
        string: "| ~ | ~ | (vFl)"
      };
      set3 = {
        name: 'Three column grid',
        string: "| ~ | ~ | ~ | (vFl)"
      };
      setsBootstrap = {
        Default: {
          name: "Default",
          sets: {}
        }
      };
      set1.id = this.generateSetID(set1);
      set2.id = this.generateSetID(set2);
      set3.id = this.generateSetID(set3);
      setsBootstrap.Default.sets[set1.id] = set1;
      setsBootstrap.Default.sets[set2.id] = set2;
      setsBootstrap.Default.sets[set3.id] = set3;
      return setsBootstrap;
    };

    GuideGuideCore.prototype.settingsBootstrap = function() {
      return {
        horizontalRemainder: 'last',
        verticalRemainder: 'last',
        horizontalPosition: 'first',
        verticalPosition: 'first',
        calculation: 'pixel'
      };
    };

    GuideGuideCore.prototype.consolidate = function(existing, added, args) {
      var e, i, inBounds, include, list, result, _ref, _ref1;
      if (args == null) {
        args = {};
      }
      list = {};
      result = [];
      for (i in existing) {
        e = existing[i];
        list["" + e.location + "." + e.orientation] = true;
      }
      for (i in added) {
        e = added[i];
        include = list["" + e.location + "." + e.orientation] == null;
        list["" + e.location + "." + e.orientation] = true;
        if (args.bounds && include) {
          inBounds = false;
          if (e.orientation === "horizontal" && (args.bounds.bottom >= (_ref = e.location) && _ref >= args.bounds.top)) {
            inBounds = true;
          }
          if (e.orientation === "vertical" && (args.bounds.right >= (_ref1 = e.location) && _ref1 >= args.bounds.left)) {
            inBounds = true;
          }
          if ((inBounds && args.invert) || (!inBounds && !args.invert)) {
            include = false;
          }
        }
        if (include) {
          result.push(e);
        }
      }
      return result;
    };

    GuideGuideCore.prototype.formChanged = function(data) {
      return this.bridge.updateCustomField(this.stringifyFormData(data.contents));
    };

    GuideGuideCore.prototype.validateInput = function(value, integerOnly) {
      var units;
      if (integerOnly == null) {
        integerOnly = false;
      }
      if (value === "") {
        return true;
      }
      units = value.split(',');
      units = units.filter((function(_this) {
        return function(unit) {
          var u;
          u = new Unit(unit, integerOnly);
          return !u.isValid;
        };
      })(this));
      return units.length === 0;
    };

    GuideGuideCore.prototype.stringifyFormData = function(data) {
      var string1, string2;
      string1 = this.stringifyGridPlane({
        count: data.countColumn,
        width: data.widthColumn,
        gutter: data.gutterColumn,
        firstMargin: data.marginLeft,
        lastMargin: data.marginRight,
        columnMidpoint: data.midpointColumn || false,
        gutterMidpoint: data.midpointColumnGutter || false,
        orientation: 'v',
        position: this.data.settings.verticalPosition,
        remainder: this.data.settings.verticalRemainder
      });
      string2 = this.stringifyGridPlane({
        count: data.countRow,
        width: data.widthRow,
        gutter: data.gutterRow,
        firstMargin: data.marginTop,
        lastMargin: data.marginBottom,
        columnMidpoint: data.midpointRow || false,
        gutterMidpoint: data.midpointRowGutter || false,
        orientation: 'h',
        position: this.data.settings.horizontalPosition,
        remainder: this.data.settings.horizontalRemainder
      });
      return "" + string1 + (string1 && string2 ? '\n' : '') + string2;
    };

    GuideGuideCore.prototype.stringifyGridPlane = function(data) {
      var column, firstMargString, gridString, gutter, lastMargString, leftBuffer, optionsString, rightBuffer, unit, varString;
      data || (data = {});
      data.count = parseInt(data.count);
      data.width || (data.width = '');
      data.gutter || (data.gutter = '');
      data.firstMargin || (data.firstMargin = '');
      data.lastMargin || (data.lastMargin = '');
      data.columnMidpoint || (data.columnMidpoint = false);
      data.gutterMidpoint || (data.gutterMidpoint = false);
      data.orientation || (data.orientation = 'v');
      data.position || (data.position = 'first');
      data.remainder || (data.remainder = 'last');
      firstMargString = '';
      varString = '';
      gridString = '';
      lastMargString = '';
      optionsString = '';
      if (data.firstMargin) {
        firstMargString = '|' + data.firstMargin.replace(/\s/g, '').split(',').join('|') + '|';
      }
      if (data.lastMargin) {
        lastMargString = '|' + data.lastMargin.replace(/\s/g, '').split(',').join('|') + '|';
      }
      if (data.count || data.width) {
        column = data.width ? data.width : '~';
        if (data.columnMidpoint) {
          if (data.width) {
            unit = new Unit(data.width);
          }
          column = data.width ? "" + (unit.value / 2) + unit.type + "|" + (unit.value / 2) + unit.type : "~|~";
        }
        varString += "$" + data.orientation + "=|" + column + "|\n";
        if (data.gutter && data.count !== 1) {
          gutter = data.gutter ? data.gutter : '~';
          if (data.gutterMidpoint) {
            if (data.gutter) {
              unit = new Unit(data.gutter);
            }
            gutter = data.gutter ? "" + (unit.value / 2) + unit.type + "|" + (unit.value / 2) + unit.type : "~|~";
          }
          varString = "$" + data.orientation + "=|" + column + "|" + gutter + "|\n";
          if (data.count) {
            varString += "$" + data.orientation + "C=|" + column + "|\n";
          }
        }
      }
      if (data.count || data.width) {
        gridString += "|$" + data.orientation;
        if (data.count !== 1) {
          gridString += "*";
        }
        if (data.count > 1 && data.gutter) {
          gridString += data.count - 1;
        }
        if (data.count > 1 && !data.gutter) {
          gridString += data.count;
        }
        gridString += "|";
        if (data.count > 1 && data.gutter) {
          gridString += "|$" + data.orientation + (data.gutter ? 'C' : '') + "|";
        }
      }
      if ((!data.count && !data.width) && data.firstMargin) {
        gridString += "|";
      }
      if ((!data.count && !data.width) && (data.firstMargin || data.lastMargin)) {
        gridString += "~";
      }
      if ((!data.count && !data.width) && data.lastMargin) {
        gridString += "|";
      }
      if (data.firstMargin || data.lastMargin || data.count || data.width) {
        optionsString += "(";
        optionsString += data.orientation.charAt(0).toLowerCase();
        optionsString += data.remainder.charAt(0).toLowerCase();
        if (this.data.settings.calculation === "pixel") {
          optionsString += "p";
        }
        optionsString += ")";
      }
      leftBuffer = rightBuffer = "";
      if (data.width) {
        if (data.position === "last" || data.position === "center") {
          leftBuffer = "~";
        }
        if (data.position === "first" || data.position === "center") {
          rightBuffer = "~";
        }
      }
      return ("" + varString + firstMargString + leftBuffer + gridString + rightBuffer + lastMargString + optionsString).replace(/\|+/g, "|");
    };

    GuideGuideCore.prototype.getGuidesFromGGN = function(ggn, info) {
      var guides;
      guides = [];
      $.each(ggn.grids, (function(_this) {
        return function(index, grid) {
          var arbitrarySum, fill, fillCollection, fillIterations, fillWidth, guideOrientation, i, insertMarker, measuredWidth, newGap, offset, remainderOffset, remainderPixels, wholePixels, wildcardArea, wildcardWidth, _i, _ref;
          guideOrientation = grid.options.orientation.value;
          wholePixels = ((_ref = grid.options.calculation) != null ? _ref.value : void 0) === 'pixel';
          if (grid.gaps.fill) {
            fill = grid.gaps.fill;
          }
          measuredWidth = guideOrientation === 'horizontal' ? info.height : info.width;
          if (grid.options.width) {
            measuredWidth = grid.options.width.value;
          }
          offset = guideOrientation === 'horizontal' ? info.offsetY : info.offsetX;
          if (grid.gaps.percents) {
            $.each(grid.gaps.percents, function(index, gap) {
              var percentValue;
              percentValue = measuredWidth * (gap.value / 100);
              if (wholePixels) {
                Math.floor(percentValue);
              }
              return gap.convertPercent(percentValue);
            });
          }
          arbitrarySum = grid.gaps.arbitrary ? _this.sum(grid.gaps.arbitrary, 'value') : 0;
          wildcardArea = measuredWidth - arbitrarySum;
          if (wildcardArea && fill) {
            fillIterations = Math.floor(wildcardArea / fill.sum(ggn.variables));
            fillCollection = [];
            fillWidth = 0;
            for (i = _i = 1; 1 <= fillIterations ? _i <= fillIterations : _i >= fillIterations; i = 1 <= fillIterations ? ++_i : --_i) {
              if (fill.isVariable) {
                fillCollection = fillCollection.concat(ggn.variables[fill.id].all);
                fillWidth += _this.sum(ggn.variables[fill.id].all, 'value');
              } else {
                newGap = fill.clone();
                newGap.isFill = false;
                fillCollection.push(newGap);
                fillWidth += newGap.value;
              }
            }
            wildcardArea -= fillWidth;
          }
          if (wildcardArea && grid.gaps.wildcards) {
            wildcardWidth = wildcardArea / grid.gaps.wildcards.length;
            if (wholePixels) {
              wildcardWidth = Math.floor(wildcardWidth);
              remainderPixels = wildcardArea % grid.gaps.wildcards.length;
            }
            $.each(grid.gaps.wildcards, function(index, gap) {
              return gap.value = wildcardWidth;
            });
          }
          if (remainderPixels) {
            remainderOffset = 0;
            if (grid.options.remainder.value === 'center') {
              remainderOffset = Math.floor((grid.gaps.wildcards.length - remainderPixels) / 2);
            }
            if (grid.options.remainder.value === 'last') {
              remainderOffset = grid.gaps.wildcards.length - remainderPixels;
            }
            $.each(grid.gaps.wildcards, function(index, gap) {
              if (index >= remainderOffset && index < remainderOffset + remainderPixels) {
                return gap.value++;
              }
            });
          }
          insertMarker = grid.options.offset ? grid.options.offset.value : offset;
          $.each(grid.gaps.all, function(index, item) {
            if (item.isFill) {
              return grid.gaps.all = grid.gaps.all.slice(0, index).concat(fillCollection, grid.gaps.all.slice(index + 1));
            }
          });
          return $.each(grid.gaps.all, function(index, item) {
            var obj;
            if (item === '|') {
              return guides.push(obj = {
                location: insertMarker,
                orientation: guideOrientation
              });
            } else {
              return insertMarker += item.value;
            }
          });
        };
      })(this));
      return guides;
    };

    GuideGuideCore.prototype.addGuidesfromGGN = function(ggn, source) {
      return this.bridge.getDocumentInfo((function(_this) {
        return function(info) {
          var guides;
          if (!(info && info.hasOpenDocuments)) {
            return;
          }
          guides = [];
          guides = _this.getGuidesFromGGN(new GGN(ggn, _this.messages), info);
          guides = _this.consolidate(info.existingGuides, guides);
          _this.recordUsage(source, guides.length);
          return _this.addGuides(guides);
        };
      })(this));
    };

    GuideGuideCore.prototype.getGGNFromExistingGuides = function(callback) {
      return this.bridge.getDocumentInfo((function(_this) {
        return function(info) {
          var bounds, guides, prevHorizontal, prevVertical, string, xString, yString;
          xString = '';
          yString = '';
          string = '';
          prevHorizontal = info.isSelection ? info.offsetY : 0;
          prevVertical = info.isSelection ? info.offsetX : 0;
          guides = info.existingGuides;
          if (info.isSelection) {
            bounds = {
              top: info.offsetY,
              left: info.offsetX,
              bottom: info.offsetY + info.height,
              right: info.offsetX + info.width
            };
            guides = _this.consolidate([], info.existingGuides, {
              bounds: bounds
            });
          }
          if (guides) {
            guides.sort(function(a, b) {
              return a.location - b.location;
            });
            $.each(guides, function(index, guide) {
              if (guide.orientation === 'vertical') {
                xString = "" + xString + (guide.location - prevVertical) + "px | ";
                prevVertical = guide.location;
              }
              if (guide.orientation === 'horizontal') {
                yString = "" + yString + (guide.location - prevHorizontal) + "px | ";
                return prevHorizontal = guide.location;
              }
            });
            if (xString !== '') {
              xString = "" + xString + "(v" + (_this.data.settings.calculation === 'pixel' ? 'p' : void 0) + ")";
            }
            if (yString !== '') {
              yString = "" + yString + "(h" + (_this.data.settings.calculation === 'pixel' ? 'p' : void 0) + ")";
            }
            string += xString;
            if (xString) {
              string += '\n';
            }
            string += yString;
            if (yString) {
              string += '\n';
            }
            if (xString || yString) {
              string += '\n# ' + _this.messages.ggnStringFromExistingGuides();
            }
          }
          return callback(string);
        };
      })(this));
    };

    GuideGuideCore.prototype.addGuides = function(guides) {
      this.bridge.addGuides(guides);
      return guides;
    };

    GuideGuideCore.prototype.quickGuide = function(type) {
      var after, before, ggn, orientation;
      if (type !== "top" && type !== "bottom" && type !== "horizontalMidpoint" && type !== "left" && type !== "right" && type !== "verticalMidpoint") {
        return;
      }
      orientation = before = after = ggn = "";
      switch (type) {
        case "top":
        case "bottom":
        case "horizontalMidpoint":
          orientation = "h";
          break;
        case "left":
        case "right":
        case "verticalMidpoint":
          orientation = "v";
      }
      switch (type) {
        case "right":
        case "bottom":
        case "horizontalMidpoint":
        case "verticalMidpoint":
          before = "~";
      }
      switch (type) {
        case "top":
        case "left":
        case "horizontalMidpoint":
        case "verticalMidpoint":
          after = "~";
      }
      ggn = "" + before + "|" + after + "(" + orientation + (this.calculationType()) + ")";
      this.addGuidesfromGGN(ggn);
      return ggn;
    };

    GuideGuideCore.prototype.makeGridFromForm = function(data) {
      return this.addGuidesfromGGN(this.stringifyFormData(data.contents), 'grid');
    };

    GuideGuideCore.prototype.makeGridFromSet = function(set, group) {
      set = this.getSets({
        set: set,
        group: group
      });
      return this.addGuidesfromGGN(set.string, 'set');
    };

    GuideGuideCore.prototype.makeGridFromCustom = function(string) {
      return this.addGuidesfromGGN(string, 'custom');
    };

    GuideGuideCore.prototype.clearGuides = function() {
      var guides;
      guides = [];
      return this.bridge.getDocumentInfo((function(_this) {
        return function(info) {
          var bounds;
          if (info.isSelection) {
            bounds = {
              top: info.offsetY,
              left: info.offsetX,
              bottom: info.offsetY + info.height,
              right: info.offsetX + info.width
            };
            guides = _this.consolidate([], info.existingGuides, {
              bounds: bounds,
              invert: true
            });
            _this.log(guides);
          }
          _this.bridge.resetGuides(guides);
          return _this.recordUsage("clear");
        };
      })(this));
    };

    GuideGuideCore.prototype.calculationType = function() {
      if (this.data.settings.calculation === 'pixel') {
        return 'p';
      } else {
        return '';
      }
    };

    GuideGuideCore.prototype.isDemo = function() {
      return this.data.application.env === 'demo';
    };

    GuideGuideCore.prototype.openURL = function(url) {
      return this.bridge.openURL(url);
    };

    GuideGuideCore.prototype.toggleGuides = function() {
      return this.bridge.toggleGuides();
    };

    GuideGuideCore.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.bridge.log(args);
    };

    GuideGuideCore.prototype.sum = function(array, key) {
      var total;
      if (key == null) {
        key = null;
      }
      total = 0;
      $.each(array, (function(_this) {
        return function(index, value) {
          if (key) {
            if (array[index][key]) {
              return total += array[index][key];
            }
          } else {
            return total += array[index];
          }
        };
      })(this));
      return total;
    };

    GuideGuideCore.prototype.updateTheme = function(colors) {
      return this.bridge.updateTheme(colors);
    };

    return GuideGuideCore;

  })();

}).call(this);
