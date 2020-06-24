; 鼠标滑轮上下翻页速度调整
; 默认速度3左右合适
WheelDown::
    MouseClick, WheelDown, , , 3, 0, D, R
Return

WheelUp::
    MouseClick, WheelUp, , , 3, 0, D, R
Return

; 按下PrintScreen 可切换菜单
; 按下Enter 选择菜单并结束
; 一定要按下Enter键
PrintScreen::
    {
        Send, {Alt Down}
        Send, {Tab Down}
        keywait, Enter, D
        Send, {Alt Up}
        Send, {Tab Up}
    }
Return

; 关闭当前窗口
Insert::
    {
        Send, {Alt Down}
        Send, {F4 Down}
        keywait, Insert, U
        Send, {Alt Up}
        Send, {F4 Up}
    }
Return


; ; 获取当前时间
; :*:d:: 
; {
;     send %A_YYYY%-%A_MM%-%A_DD% %A_Hour%:%A_Min%:%A_Sec%
; }
; Return