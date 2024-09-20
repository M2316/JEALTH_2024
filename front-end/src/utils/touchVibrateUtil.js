const touchVibrateUtil = (vibCycle=[60]) =>{ //진동 함수
       
    //아이폰이면 진동을 수행하지 않음
    var deviceType = window.navigator.userAgent.toLowerCase();
    if ( deviceType.includes("iphone")) return false;

    if (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
    ) {
        window.navigator?.vibrate(vibCycle);
    }
}

export default touchVibrateUtil;