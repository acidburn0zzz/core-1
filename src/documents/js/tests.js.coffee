gg = {}

asyncTest "Init GuideGuide", ->
  expect 1
  args =
    bridge: new Bridge()
    locale: "en_us"

  gg = new GuideGuideLib args, (err) ->
    ok !err, err
    start()

    test "Default locale succeeds", ->
      expect 2
      ok messages = new GuideGuideMessages("en_us")
      equal messages.uiGrid(), "Grid"

    test "Non-english locales succeed", ->
      expect 2
      ok messages = new GuideGuideMessages("es_es")
      equal messages.uiGrid(), "Retícula"

    test "Bad locales fail gracefully", ->
      expect 2
      ok messages = new GuideGuideMessages("foo")
      equal messages.uiGrid(), "Grid"

    test "Can create button object", ->
      expect 1
      propEqual gg.button("Ok","foo",true), {label:"Ok", callback: "foo", primary: true}
