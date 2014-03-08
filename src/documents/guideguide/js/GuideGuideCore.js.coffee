class window.GuideGuideCore
  siteUrl: 'http://guideguide.me'
  env:     'production'
  bridge: {}
  data: {}

  # Create a new GuideGuide instance
  #
  #  args        - Object: Specify options for GuideGuide.
  #    .bridge   - Object: Contains all the necessary methods for GuideGuide to function in the host application.
  #    .messages - Object: Contains all the necessary messages for GuideGuide.
  #    .locale   - String: Locale string that GuideGuide will use to pick its language.
  #    .siteUrl  - String: Url for guideguide.me. Specify this to switch to a dev url.
  #
  constructor: (args, callback) ->
    return if !args.bridge?
    args.locale ||= "en_us"

    @bridge   = args.bridge
    @messages = args.messages

    @data = @bridge.getData()

    @data.panel    or= @panelBootstrap()
    @data.sets     or= @setsBootstrap()
    @data.settings or= @settingsBootstrap()
    @data.panel.launchCount++
    @saveData()

    @siteUrl = args.siteUrl if args.siteUrl?

    if !@data.panel.askedAboutAnonymousData and !@isDemo()
      title   = @messages.alertTitleWelcome()
      message = @messages.alertMessageWelcome()
      button1 = @button(@messages.uiYes(), 'submitDataConfirmed', true)
      button2 = @button(@messages.uiNo())

      @alert
        title: title
        message: message
        buttons: [button1, button2]

    @bridge.localizeUI()
    @bridge.refreshSets(@data.sets["Default"].sets)
    @bridge.onSettingsUpdate()

    unless @isDemo()
      @submitData()
      if @data.application.checkForUpdates
        @checkForUpdates (data) =>
          @bridge.hideLoader()
          if data? and data.hasUpdate
            @bridge.showUpdateIndicator(data)
    callback(args) if callback

  # When the user grants data collection permission, update the settings and
  # dismiss the alert.
  #
  # Returns nothing.
  submitDataConfirmed: () =>
    @data.settings.reportAnonymousData = true
    @data.panel.askedAboutAnonymousData = true
    @saveData()
    @bridge.onSettingsUpdate()
    @dismissAlert()

  # Submit anonymous usage data to the GuideGuide servers.
  #
  # Returns nothing.
  submitData: () =>
    return unless @data.settings.reportAnonymousData and @data.application.submitAnonymousData
    @bridge.log 'Submitting anonymous data'

    data =
      usage: @data.panel.usage

    if @data.panel.id?
      data._id          = @data.panel.id
    else
      data.version      = @data.application.guideguideVersion
      data.appID        = @data.application.id
      data.appName      = @data.application.name
      data.AppVersion   = @data.application.version
      data.os           = @data.application.os
      data.localization = @data.application.localization

    $.ajax
      type: 'POST'
      url: "#{ @siteUrl }/install"
      data: data
      success: (data) =>
        @bridge.log 'Anonymous data submitted successfully'
        if typeof data is 'object' and data._id
          @data.panel.id = data._id
          @saveData()

  # Check the GuideGuide server to see if there are updates available.
  #
  # Returns nothing.
  checkForUpdates: (callback) =>
    @bridge.log 'Checking for updates'

    $.ajax
      type: 'GET'
      url: "#{ @siteUrl }/panel/#{ @data.application.id }"
      data:
        version: @data.application.guideguideVersion || '0.0.0'
        i18n: @data.application.localization
      success: (data) =>
        callback(data)
      error: (error) =>
        @bridge.log error
        callback({ hasUpdate: false })

  # Save GuideGuide's data, including usage data, user preferences, and sets
  #
  # Returns nothing.
  saveData: =>
    @bridge.setData @data

  # Increment a usage counter of a given property.
  #
  #   property - usage property to increment
  #   count    - number of guides being added
  #
  # Returns nothing.
  recordUsage: (property, count = 1) =>
    @data.panel.usage.lifetime += count
    if @data.panel.usage[property]?
      @data.panel.usage[property]++
      @data.panel.usage.guideActions++ if property isnt 'clear'
      @saveData()

    if @data.panel.usage.guideActions == 30 and @data.application.env != 'demo'
      button1 = @button(@messages.uiDonate(), 'donate', true)
      button2 = @button(@messages.uiNiceNo())

      @alert
        title: @messages.alertTitleDonate()
        message: @messages.alertMessageDonate()
        buttons: [button1, button2]

    @data.panel.usage

  # Alert a message to the user
  #
  # Reterns nothing.
  alert: (args) =>
    return unless args?
    args.title   ||= "Title"
    args.message ||= "Message"
    args.buttons ||= [ @button(@messages.uiOk(), 'dismissAlert', true) ]
    @bridge.alert(args)

  # Dismiss a GuideGuide alert without taking action
  #
  # Returns nothing.
  dismissAlert: =>
    @bridge.dismissAlert()

  # Open the donate url in a browser.
  #
  # Returns the donate url
  donate: =>
    @bridge.openURL "http://guideguide.me/donate"

  # Form a button data object.
  #
  #  label        - String: Text to be used for the button label.
  #  callbackName - String: Callback to be executed when the button is clicked.
  #  primary      - Boolean: If true, the button will be highlighted.
  #
  #
  # Returns an Object.
  button: (label, callbackName, primary) =>
    label: label
    callback: callbackName
    primary: primary || false

  # Generate a set ID based on a hash of the GGN. This will allow us to detect
  # duplicates easier. Since this is a dependency situation, leave it up to
  # the bridge to provide the utility.
  #
  #   set - Object: Set object used as a seed for the ID hash
  #
  # returns a String
  generateSetID: (set) =>
    @bridge.toHash("#{ set.name }#{ set.string }")

  # Get info about the current state of the active document.
  #
  # Returns an Object.
  getDocumentInfo: =>
    @bridge.getDocumentInfo()

  # Default info about GuideGuide.
  #
  # Returns an Object
  panelBootstrap: =>
    id: null
    launchCount: 0
    askedAboutAnonymousData: false
    usage:
      lifetime: 0
      guideActions: 0
      grid: 0
      custom: 0
      set: 0
      top: 0
      bottom: 0
      left: 0
      right: 0
      verticalMidpoint: 0
      horizontalMidpoint: 0
      clear: 0

  # Default sets for GuideGuide.
  #
  # Returns an Object.
  setsBootstrap: =>
    set1 =
      name:'Outline'
      string: """
      | ~ | (vFl)
      | ~ | (hFl)
      """
    set2 =
      name:'Two column grid'
      string: """
      | ~ | ~ | (vFl)
      """
    set3 =
      name:'Three column grid'
      string: """
      | ~ | ~ | ~ | (vFl)
      """
    setsBootstrap =
      Default:
        name: "Default"
        sets: {}

    set1.id = @generateSetID set1
    set2.id = @generateSetID set2
    set3.id = @generateSetID set3

    setsBootstrap.Default.sets[set1.id] = set1
    setsBootstrap.Default.sets[set2.id] = set2
    setsBootstrap.Default.sets[set3.id] = set3

    setsBootstrap

  # Default settings for GuideGuide
  #
  # Returns an Object.
  settingsBootstrap: =>
    horizontalRemainder: 'last'
    verticalRemainder:   'last'
    horizontalPosition:  'first'
    verticalPosition:    'first'
    calculation:         'pixel'
    reportAnonymousData: false

  # Create a collection of unique guides from multiple guide arrrays
  #
  #   first  - (Array) First array
  #   second - (Array) Second array
  #   args   - (Object) Options
  #
  # Returns an array of guides
  consolidate: (first, second, args = {}) =>
    list = {}
    guides = $.map $.merge($.merge([], first), second), (e,i) ->
      key = "#{ e.location }.#{ e.orientation }"
      guide = e
      return null if list[key]
      list[key] = true

      if args.bounds
        guide = if args.invert then null else e
        return guide if e.orientation == "horizontal" and args.bounds.bottom >= e.location >= args.bounds.top
        return guide if e.orientation == "vertical" and args.bounds.right >= e.location >= args.bounds.left
        return if args.invert then e else null

      guide
    guides

  # Turn a GuideGuide object into a collection of guides.
  #
  #   ggn  - GuideGuide Object to pull guides from
  #   info - Document info
  #
  # Returns a collection of guides
  getGuidesFromGGN: (ggn, info) =>
    guides = []

    $.each ggn.grids, (index,grid) =>
      guideOrientation = grid.options.orientation.value
      wholePixels      = grid.options.calculation && grid.options.calculation.value == 'pixel'
      fill             = grid.gaps.fill if grid.gaps.fill
      measuredWidth    = if guideOrientation == 'horizontal' then info.height else info.width
      measuredWidth    = grid.options.width.value if grid.options.width
      offset           = if guideOrientation == 'horizontal' then info.offsetY else info.offsetX

      # Calculate and set the value percent gaps. This calculation is based on
      # the document or selection width, less the margin area if it is greater
      # zero.
      if grid.gaps.percents
        $.each grid.gaps.percents, (index,gap) =>
          percentValue = measuredWidth*(gap.value/100)
          Math.floor percentValue if wholePixels
          gap.convertPercent percentValue

      # Subtract arbitrary gap value from non-margin area to get wildcard area,
      # which is used to calculate the size of the wildcards
      arbitrarySum = if grid.gaps.arbitrary then @sum grid.gaps.arbitrary, 'value' else 0
      wildcardArea = measuredWidth - arbitrarySum

      if wildcardArea and fill
        # The grid contains a fill, figure out how many times it will fit and generate
        # new gaps for it.
        fillIterations = Math.floor wildcardArea/fill.sum(ggn.variables)
        fillCollection = []
        fillWidth = 0

        for i in [1..fillIterations]
          if fill.isVariable
            fillCollection = fillCollection.concat ggn.variables[fill.id].all
            fillWidth += @sum ggn.variables[fill.id].all, 'value'
          else
            newGap = fill.clone()
            newGap.isFill = false
            fillCollection.push newGap
            fillWidth += newGap.value

        wildcardArea -= fillWidth

      if wildcardArea and grid.gaps.wildcards
        # If the grid contains wildcards, figure out and set how wide they are
        wildcardWidth = wildcardArea/grid.gaps.wildcards.length

        if wholePixels
          wildcardWidth = Math.floor wildcardWidth
          remainderPixels = wildcardArea % grid.gaps.wildcards.length

        $.each grid.gaps.wildcards, (index,gap) =>
          gap.value = wildcardWidth

      if remainderPixels
        # If this is a pixel specific grid, whole pixel math usually results in remainder pixels.
        # This decides where amongst the wildcards the remainders should be distributed.
        remainderOffset = 0

        remainderOffset = Math.floor (grid.gaps.wildcards.length - remainderPixels)/2 if grid.options.remainder.value == 'center'
        remainderOffset = grid.gaps.wildcards.length - remainderPixels if grid.options.remainder.value == 'last'

        $.each grid.gaps.wildcards, (index, gap) =>
          gap.value++ if index >= remainderOffset && index < remainderOffset + remainderPixels

      # Figure out where the grid starts
      insertMarker = if grid.options.offset then grid.options.offset.value else offset

      # Expand any fills
      $.each grid.gaps.all, (index,item) =>
        grid.gaps.all = grid.gaps.all.slice(0, index).concat fillCollection, grid.gaps.all.slice(index + 1) if item.isFill

      # Add all the guides
      $.each grid.gaps.all, (index,item) =>
        if item == '|'
          guides.push obj =
            location: insertMarker
            orientation: guideOrientation
        else
          insertMarker += item.value

    guides

  # Add guides to the stage from GuideGuide Notation.
  #
  #   ggn    - String: GuideGuide Notation
  #   source - String: Action executed to add guides, used for recording usage.
  #
  # Returns the array of guides generated from the GuideGuide Notation.
  addGuidesfromGGN: (ggn, source) =>
    info = @bridge.getDocumentInfo()

    return unless info and info.hasOpenDocuments
    guides = []

    guides = @getGuidesFromGGN new GGN(ggn), info
    guides = @consolidate(guides, info.existingGuides)

    @recordUsage source, guides.length
    # TODO: @bridge.resetGuides()
    @addGuides guides
    guides

  # Add an array of guides to the document.
  #
  #  guides - Array: Guides to add.
  #
  # Returns the original guide array.
  addGuides: (guides) =>
    for i, guide of guides
      @bridge.addGuide(guide)
    guides


  # Create a single guide in the location specified
  #
  # Returns the resulting GuideGuide Notation string
  quickGuide: (type) =>
    return unless type in ["top", "bottom", "horizontalMidpoint", "left", "right", "verticalMidpoint"]

    orientation = before = after = ggn = ""

    switch type
      when "top", "bottom", "horizontalMidpoint"
        orientation = "h"
      when "left", "right", "verticalMidpoint"
        orientation = "v"

    switch type
      when "right", "bottom", "horizontalMidpoint", "verticalMidpoint"
        before = "~"

    switch type
      when "top", "left", "horizontalMidpoint", "verticalMidpoint"
        after = "~"

    ggn = "#{ before }|#{ after }(#{ orientation }#{ @calculationType() })"
    @addGuidesfromGGN ggn
    return ggn

  # Get the option value that corresponds to the calculation type of the app
  #
  # Returns a String
  calculationType: =>
    if @data.settings.calculation == 'pixel' then 'p' else ''

  # Truthy if the environment is set to "demo"
  #
  # Returns a Boolean
  isDemo: =>
    @data.application.env == 'demo'

  # Open a url in the default browser
  #
  #  url - String: URL to open
  #
  # Returns nothing
  openURL: (url) =>
    @bridge.openURL url

  # Toggle guide visibility.
  #
  # Returns nothing.
  toggleGuides: =>
    @bridge.toggleGuides()

  # Log a message
  #
  #  args - an array of messages to print
  #
  # Returns nothing
  log: (args...) =>
    @bridge.log args

  # Calculate the sum of an array of values
  #
  #   array - array to be added together
  #   key   - optional key value to be used if array contains objects
  #
  # Returns a Number
  sum: (array, key = null) ->
    total = 0
    $.each array, (index,value) =>
      if key
        total += array[index][key] if array[index][key]
      else
        total += array[index]
    total
