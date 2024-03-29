class window.Gap
  variableRegexp: /^\$([^\*]+)?(\*(\d+)?)?$/i
  arbitraryRegexp: /^(([-0-9\.]+)?[a-z%]+)(\*(\d+)?)?$/i
  wildcardRegexp: /^~(\*(\d*))?$/i

  # boolean - truthy if this is valid and can be parsed
  isValid: true

  # string - original string
  original: null

  # object - collection of error message strings
  errors: {}

  # object - Unit for the gap
  unit: {}

  # number - value of gap in base units, usually pixels
  value: null

  # types for testing
  isFill: null
  isVariable: null
  isArbitrary: null
  isWildcard: null
  isUnrecognized: null
  isPercent: null

  # ggn symbol that represents this type of gap
  typePrefix: ''

  # Create a unit object
  #
  #   string - string to be parsed into a Unit
  #
  # Returns an object
  constructor: (string, messages) ->
    @errors = {}
    @original = string = string.replace /\s/g, ''

    @messages = messages

    if @variableRegexp.test string
      @parseVariable string
    else if @arbitraryRegexp.test string
      @parseArbitrary string
    else if @wildcardRegexp.test string
      @parseWildcard string
    else
      @multiplier = 1
      @invalidBecause @messages.gapUnrecognized()

  # Determine wildcard validity, string and multiplier
  #
  #   string - gap string to parse
  #
  # Returns nothing
  parseWildcard: (string) =>
    @isWildcard = true
    gapBits    = @wildcardRegexp.exec string
    @isFill     = gapBits[1] && !gapBits[2] || false
    @multiplier = parseInt(gapBits[2]) || 1
    @invalidBecause @messages.gapNoFillWildcards() if @isFill

  # Determine variable validity, id, multiplier, if it's a fill, and it's string
  #
  #   string - gap string to parse
  #
  # Returns nothing
  parseVariable: (string) ->
    @isVariable = true
    gapBits    = @variableRegexp.exec string
    @id         = if gapBits[1] then gapBits[1] else "_"
    @multiplier = parseInt(gapBits[3]) || 1
    @isFill     = gapBits[2] && !gapBits[3] || false

  # Determine normal gap validity, type, unit, multiplier, if it's a fill,
  # and it's string
  #
  #   string - gap string to parse
  #
  # Returns nothing
  parseArbitrary: (string) =>
    @isArbitrary = true
    gapBits    = @arbitraryRegexp.exec string
    @unit       = new Unit(gapBits[1])
    @multiplier = parseInt(gapBits[4]) || 1
    @isFill     = gapBits[3] && !gapBits[4] || false

    @isPercent = true if @unit.type == '%'

    if @unit.isValid
      @value = @unit.baseValue
      @value = @unit.value if @isPercent
    else
      @invalidBecause @messages.gapUnrecognized()

  # Convert a percent gap to an arbitrary gap. This has to be called
  # externally at the time a grid is generated because we don't know how big
  # the document or selection is at this point.
  #
  #   value - new value of the gap
  #
  # Returns nothing
  convertPercent: (value) =>
    @isPercent = false
    @unit = new Unit "#{value}px"
    @value = @unit.value

  # Invalidate the gap and provide a reason
  #
  #   reason - reason the gap is invalid
  #
  # Returns nothing
  invalidBecause: (reason) =>
    @isValid = false
    @errors[reason.replace(/\s/g,'').toLowerCase()] =
      id: ''
      message: reason

  toString: (validate = true) =>
    string = ""
    if @isVariable
      string += '$'
      string += @id if @id != '_'
      string += '*' if @isFill or @multiplier > 1
      string += @multiplier if @multiplier > 1
    else if @isArbitrary
      string += @typePrefix + @unit.toString()
      string += '*' if @isFill or @multiplier > 1
      string += @multiplier if @multiplier > 1
    else if @isWildcard
      string += "~"
      string += '*' if @isFill or @multiplier > 1
      string += @multiplier if @multiplier > 1
    else
      string = @original

    if validate and !$.isEmptyObject @errors
      string = """{#{string} [#{
        $.map @errors, (error) ->
          return error.id
        .join ','
      }]}
      """

    string

  # Duplicate this gap. Used to disassociate gap objects so they can be
  # modified independantly.
  #
  # This is pretty ugly right now. I'm not quite sure at the moment why this
  # needs so many redundant calls. I'll need to look into/refactor this.
  #
  # Returns a gap
  clone: () ->
    gap = new Gap @original, @messages
    gap.multiplier = 1
    gap = new Gap gap.toString(false), @messages
    gap.errors = @errors
    gap


  sum: (variables={}) ->
    if @isVariable
      sum = 0
      $.each variables[@id].all, (index, gap) ->
        sum += gap.value if gap.value
      sum
    else
      @value * @multiplier
