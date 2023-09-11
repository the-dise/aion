(() => {
  var e = __$$hmAppManager$$__.currentApp;
  __$$hmAppManager$$__.currentApp.app = DeviceRuntimeCore.App({
    globalData: {},
    onCreate(e) {},
    onShow(e) {},
    onHide(e) {},
    onDestory(e) {},
    onError(e) {},
    onPageNotFound(e) {},
    onUnhandledRejection(e) {},
  });

  e.app.__globals__ = {
    lang: new DeviceRuntimeCore.HmUtils.Lang(
      DeviceRuntimeCore.HmUtils.getLanguage()
    ),
    px: DeviceRuntimeCore.HmUtils.getPx(192),
  };
})();
