/**
 * Watchface Aion 7 by the_dise
 */

(() => {
  // Utility function to create an array of image paths
  function mkImgArray(dir, count = 10) {
    const out = [];
    for (let i = 0; i < count; i++) {
      out.push(`${dir}/${i}.png`);
    }
    return out;
  }

  // Constants
  const FONT = mkImgArray("fonts/num");
  const BAR_TOP = mkImgArray("bars/top", 21);
  const BAR_END = mkImgArray("bars/end", 21);
  const EDIT_WIDGETS = {
    // Weather == 0
    weather: {
      value: 0,
      url: "WeatherScreen",
      config: {
        type: hmUI.data_type.WEATHER_CURRENT,
        invalid_image: "fonts/null.png",
        negative_image: "fonts/minus.png",
        unit_en: "fonts/degree.png",
      },
      configBar: {
        type: hmUI.data_type.HUMIDITY,
      },
    },
    // Steps == 1
    steps: {
      value: 1,
      url: "activityAppScreen",
      config: {
        type: hmUI.data_type.STEP,
      },
      configBar: {
        type: hmUI.data_type.STEP,
      },
    },
    // Battery == 2
    battery: {
      value: 2,
      url: "FlashLightScreen",
      config: {
        type: hmUI.data_type.BATTERY,
        unit_en: "fonts/percent.png",
      },
      configBar: {
        type: hmUI.data_type.BATTERY,
      },
    },
    // SPO2 == 3
    spo2: {
      value: 3,
      url: "heart_app_Screen",
      config: {
        type: hmUI.data_type.SPO2,
        invalid_image: "fonts/null.png",
        unit_en: "fonts/percent.png",
      },
      configBar: {
        type: hmUI.data_type.SPO2,
      },
    },
    // Sleep == 4
    sleep: {
      value: 4,
      url: "Sleep_HomeScreen",
      config: {
        type: hmUI.data_type.SLEEP,
        dot_image: "fonts/point.png",
      },
      configBar: {
        type: hmUI.data_type.SLEEP,
      },
    },
    // Heartrate == 5
    heartrate: {
      value: 5,
      url: "heart_app_Screen",
      config: {
        type: hmUI.data_type.HEART,
      },
      configBar: {
        type: hmUI.data_type.HEART,
      },
    },
    // Calories
    calories: {
      value: 6,
      url: "activityAppScreen",
      config: {
        type: hmUI.data_type.CAL,
      },
      configBar: {
        type: hmUI.data_type.CAL,
      },
    },
    // Alarm == 7
    alarm: {
      value: 7,
      url: "AlarmInfoScreen",
      config: {
        type: hmUI.data_type.ALARM_CLOCK,
      },
      configBar: {
        type: hmUI.data_type.ALARM_CLOCK,
      },
    },
  };

  function renderBackground(background) {
    hmUI.createWidget(hmUI.widget.IMG, {
      src: background,
    });
  }

  // Function to render clock widget
  function renderClockWidget(isAOD) {
    const widgetConfig = {
      hour_zero: 1,
      hour_startX: 26,
      hour_startY: 115,
      hour_array: mkImgArray(isAOD ? "digital/aod" : "digital/normal"),
      hour_space: 7,

      minute_zero: 1,
      minute_startX: 26,
      minute_startY: 216,
      minute_array: mkImgArray("digital/line"),
      minute_space: 7,
    };

    hmUI.createWidget(hmUI.widget.IMG_TIME, widgetConfig);
  }

  // Function to render date widget
  function renderDateWidget() {
    hmUI.createWidget(hmUI.widget.IMG_WEEK, {
      x: 30,
      y: 334,
      week_en: mkImgArray("date/week", 7),
    });

    hmUI.createWidget(hmUI.widget.IMG_DATE, {
      day_zero: 1,
      day_startX: 59,
      day_startY: 364,
      day_en_array: mkImgArray("date/day"),
      month_startX: 91,
      month_startY: 363,
      month_en_array: mkImgArray("date/month", 12),
      month_is_character: 1,
    });
  }

  // Function to render status icons
  function renderStatus() {
    const isEdit = hmSetting.getScreenType() === hmSetting.screen_type.SETTINGS;
    const editor = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
      edit_id: 804,
      x: 30,
      y: 358,
      w: 133,
      h: 32,
      select_image: "status/edit/center.png",
      un_select_image: "status/edit/center_w.png",
      default_type: 0,
      optional_types: [
        { type: 0, preview: "status/demo/off.png" },
        { type: 1, preview: "status/demo/on.png" },
      ],
      count: 2,
      tips_BG: "",
      tips_x: -1000,
      tips_y: 0,
      tips_width: 1,
    });

    if (isEdit) {
      return;
    }

    const status = editor.getProperty(hmUI.prop.CURRENT_TYPE);

    if (status === 1) {
      renderStatusIcons();
    }
  }

  // Function to render status icons
  function renderStatusIcons() {
    const y = 370;

    const iconConfigs = [
      { x: 44, y, src: "status/off.png" },
      { x: 143, y, src: "status/off.png" },
      {
        x: 44,
        y,
        src: "status/disconnect.png",
        type: hmUI.system_status.DISCONNECT,
      },
      {
        x: 143,
        y,
        src: "status/disturb.png",
        type: hmUI.system_status.DISTURB,
      },
    ];
  }

  // Function to render widgets
  function renderWidgets() {
    const urls = [];
    const isEdit = hmSetting.getScreenType() == hmSetting.screen_type.SETTINGS;

    for (let i = 0; i < 2; i++) {
      const editView = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, {
        edit_id: 110 + i,
        x: 48,
        y: i == 0 ? 34 : 410,
        w: 96,
        h: 46,
        select_image: "widgets/edit/center.png",
        un_select_image: "widgets/edit/center_w.png",
        default_type: i,
        optional_types: Object.keys(EDIT_WIDGETS).map((key) => {
          const data = EDIT_WIDGETS[key];
          return {
            type: data.value,
            preview: `widgets/demo/${key}.png`,
          };
        }),
        count: Object.keys(EDIT_WIDGETS).length,
        tips_BG: "",
        tips_x: -1000,
        tips_y: 0,
        tips_width: 1,
      });

      if (isEdit) continue;

      const current = editView.getProperty(hmUI.prop.CURRENT_TYPE);

      let currentKey = "weather";
      for (let i in EDIT_WIDGETS) {
        if (EDIT_WIDGETS[i].value === current) {
          currentKey = i;
          break;
        }
      }

      const currentData = EDIT_WIDGETS[currentKey];
      _drawWidget(i, currentKey, currentData);
      urls.push(currentData.url);
    }

    return urls;
  }

  // Function to draw a widget
  function _drawWidget(i, currentKey, currentData) {
    var BAR_ARRAY = i == 0 ? BAR_TOP : BAR_END;

    if (currentData.render) {
      currentData.render(i == 0 ? 10 : 376);
      return;
    }
    // Config for bars
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      x: 4,
      y: i == 0 ? 10 : 404,
      image_array: BAR_ARRAY,
      image_length: 21,
      ...currentData.configBar,
    });

    // Config for icons
    if (currentKey == "weather") {
      hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
        x: 81,
        y: i == 0 ? 2 : 460,
        image_array: mkImgArray("widgets/weather", 29),
        image_length: 29,
        type: hmUI.data_type.WEATHER_CURRENT,
      });
    } else {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 84,
        y: i == 0 ? 2 : 460,
        src: `widgets/icon/${currentKey}.png`,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });
    }

    // Config for text
    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: 48,
      y: i == 0 ? 50 : 422,
      w: 96,
      h: 18,
      font_array: FONT,
      align_h: hmUI.align.CENTER_H,
      invalid_image: "fonts/null.png",
      negative_image: "fonts/minus.png",
      dot_image: "fonts/point.png",
      ...currentData.config,
    });
  }

  // Function to handle tap zones
  function initTapZones(widgetURLs) {
    const zone = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: 192,
      h: 490,
      src: "",
    });

    zone.addEventListener(hmUI.event.CLICK_DOWN, () => {
      zone.mustHandle = true;
    });

    zone.addEventListener(hmUI.event.MOVE, () => {
      zone.mustHandle = false;
    });

    zone.addEventListener(hmUI.event.CLICK_UP, (info) => {
      if (!zone.mustHandle) return;
      zone.mustHandle = false;

      const { x, y } = info;

      if (x >= 24 && x <= 131) {
        if (y >= 41 && y <= 77) {
          _call(widgetURLs[0]);
          return;
        } else if (y >= 411 && y <= 447) {
          _call(widgetURLs[1]);
          return;
        }
      }

      // Change brightness
      if (x >= 61 && x <= 164) {
        if (y >= 115 && y <= 210) {
          _setTap(1); // dimming, tap on the minutes
        } else if (y >= 215 && y <= 310) {
          _setTap(0); // increase, tap on the hour
        }
      }
    });
  }

  // Initialization logic
  let __$$app$$__ = __$$hmAppManager$$__.currentApp;
  let __$$module$$__ = __$$app$$__.current;
  __$$module$$__.module = DeviceRuntimeCore.WatchFace({
    onInit() {
      const currentScreen = hmSetting.getScreenType();
      switch (currentScreen) {
        case hmSetting.screen_type.AOD:
          renderClockWidget(true);
          renderDateWidget();
          return;

        case hmSetting.screen_type.SETTINGS:
          renderBackground("bkg/pref.png");
          renderDateWidget();
          renderWidgets();
          renderStatus();
          return;

        default:
          renderBackground("bkg/norm.png");
          renderClockWidget(false);
          renderDateWidget();
          renderStatus();
          initTapZones(renderWidgets());
      }
    },
  });

  // Function to make a call
  function _call(url) {
    if (typeof url === "function") return url();

    if (url) {
      hmApp.startApp({
        url,
        native: true,
      });
    }
  }

  // Function to change brightness
  function _setTap(side) {
    const brightnessChange = side === 0 ? -10 : 10;
    _changeBrightness(brightnessChange);
  }

  function _changeBrightness(delta) {
    const val = Math.min(Math.max(0, hmSetting.getBrightness() + delta), 100);
    hmSetting.setBrightness(val);
  }
})();
