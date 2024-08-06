const touchVibrateUtil = (vibCycle=[60]) =>{ //진동 함수
    if (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
    ) {
        window.navigator.vibrate(vibCycle);
    }
}

export default touchVibrateUtil;