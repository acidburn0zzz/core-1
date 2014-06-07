class GuideNotation

  constructor: (args = {}) ->

  # Convert a string of gap and guide commands into an object.
  #
  # Returns a command object
  parseCommandList: (string) ->
    commands = []
    return commands if !string or string == ""
    bits = string.replace(/^\s+|\s+$/g, '').replace(/\s\s+/g, ' ').split(/\s/)

    for command, index in bits
      commands.push if command == "|" then isGuide:true else command

    commands

#
# Unit is a utility for parsing and validating unit strings
#
class Unit

  constructor: (args = {}) ->

  # Parse a string and change it to a friendly unit
  #
  #   string - string to be parsed
  #
  # Returns a string or null, if invalid
  preferredName: (string) ->
    switch string
      when 'centimeter', 'centimeters', 'centimetre', 'centimetres', 'cm'
        'cm'
      when 'inch', 'inches', 'in'
        'in'
      when 'millimeter', 'millimeters', 'millimetre', 'millimetres', 'mm'
        'mm'
      when 'pixel', 'pixels', 'px'
        'px'
      when 'point', 'points', 'pts', 'pt'
        'points'
      when 'pica', 'picas'
        'picas'
      when 'percent', 'pct', '%'
        '%'
      else
        null


if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports =
    notation: new GuideNotation()
    unit: new Unit()
else
  window.GuideNotation = new GuideNotation()
  window.Unit = new Unit()
