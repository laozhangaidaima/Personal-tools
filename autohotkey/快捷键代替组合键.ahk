
; 基本示例:

; GetKeyState, state, RButton  ; 鼠标右键.
; MsgBox state
;     if state = RButton
; MsgBox At least one 123.
;     else
; MsgBox Neither 321.

; GetKeyState, state, CapsLock, T ;  当 CapsLock 打开时为 D, 否则为 U.
; state := GetKeyState("Capslock", "T")  ; 当 CapsLock 打开时为真, 否则为假.

; 一键tab页
; 按下enter 就不再按下
PrintScreen::
    Send, {Alt Down}
    Send, {Tab Down}
    if KeyWait, Enter{
    Send, {Alt Up}
    Send, {Tab Up}
    }
Return


