/**
 * 打印堆栈
 */
function showStacks() {
    Java.perform(function () {
        console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}

Java.perform(function () {
    /**
     * 在微信启动时尝试直接打开微信日志开关.
     */
    const LauncherUI = Java.use("com.tencent.mm.ui.LauncherUI");
    LauncherUI.onCreate.implementation = function (b) {
        const XLogSetup = Java.use("com.tencent.mm.xlog.app.XLogSetup");
        console.log("尝试打开微信日志开关 ======================= >");
        XLogSetup.realSetupXlog();
        return this.onCreate(b);
    };
    const XLogSetup = Java.use("com.tencent.mm.xlog.app.XLogSetup");
    XLogSetup.keep_setupXLog.implementation = function (z, str, str2, num, bool, bool2, str3) {
        console.log("keep_setupXLog ================= start");
        // this.a.overload('[Landroid.content.Intent;').call(this, intentArray);
        arguments[5] = true;
        // 下面这行不要感觉啰嗦,我也很难受,在本人手机上死活报错,无奈..
        return this.keep_setupXLog.overload('boolean', 'java.lang.String', 'java.lang.String', 'java.lang.Integer', 'java.lang.Boolean', 'java.lang.Boolean', 'java.lang.String').call(this, arguments);
    };
    // 打开日志开关结束


    /**
     * 打印所有等级日志
     * arguments[0] / 第一个参数 就是日志等级
     */
    const Xlog = Java.use("com.tencent.mars.xlog.Xlog");
    Xlog.logWrite2.implementation = function () {
        // console.log("logWrite2 ===================== start");
        if (arguments[0] == 2) {
            // console.log("..");
        }
        for (var i = 0; i < arguments.length; i++) {
            console.log("[" + i + "]", arguments[i]);
        }
        return Xlog.logWrite2.apply(this, arguments);
    };
});
