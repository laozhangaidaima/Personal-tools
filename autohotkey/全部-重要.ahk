; 关闭当前窗口
; Insert::
;     {
;         Send, {Alt Down}
;         Send, {F4 Down}
;         keywait, Insert, U
;         Send, {Alt Up}
;         Send, {F4 Up}
;     }
; Return

; ; 获取当前时间
; :*:d::
; {
;     send %A_YYYY%-%A_MM%-%A_DD% %A_Hour%:%A_Min%:%A_Sec%
; }
; Return

; 窗口置顶
; alt + q
; !q::
; WinSet, AlwaysOnTop, toggle, A
; WinGetTitle, getTitle, A
; Winget, getTop, ExStyle, A
; if (getTop & 0x8)
;     TrayTip 已置顶, 窗口标题: `n%getTitle%, 10, 1
; else
;     TrayTip 取消置顶, 窗口标题:`n %getTitle%, 10, 1
; return

; win + h  加入自定义短语
#h::  ; Win+H hotkey
; Get the text currently selected. The clipboard is used instead of
; "ControlGet Selected" because it works in a greater variety of editors
; (namely word processors).  Save the current clipboard contents to be
; restored later. Although this handles only plain text, it seems better
; than nothing:
AutoTrim Off  ; Retain any leading and trailing whitespace on the clipboard.
ClipboardOld := ClipboardAll
Clipboard := ""  ; Must start off blank for detection to work.
Send ^c
ClipWait 1
if ErrorLevel ; ClipWait timed out.
return
; Replace CRLF and/or LF with `n for use in a "send-raw" hotstring:
; The same is done for any other characters that might otherwise
; be a problem in raw mode:
StringReplace, Hotstring, Clipboard, ``, ````, All  ; Do this replacement first to avoid interfering with the others below.
StringReplace, Hotstring, Hotstring, `r`n, ``r, All  ; Using `r works better than `n in MS Word, etc.
StringReplace, Hotstring, Hotstring, `n, ``r, All
StringReplace, Hotstring, Hotstring, %A_Tab%, ``t, All
StringReplace, Hotstring, Hotstring, `;, ```;, All
Clipboard := ClipboardOld  ; Restore previous contents of clipboard.
; This will move the InputBox's caret to a more friendly position:
SetTimer, MoveCaret, 10
; Show the InputBox, providing the default hotstring:
InputBox, Hotstring, New Hotstring, Type your abreviation at the indicated insertion point. You can also edit the replacement text if you wish.`n`nExample entry: :O:btw`::by the way, , , , , , , , :O:`::%Hotstring%
if ErrorLevel ; The user pressed Cancel.
return
if InStr(Hotstring, ":O`:::") {
    MsgBox You didn't provide an abbreviation. The hotstring has not been added.
    return
}
; Otherwise, add the hotstring and reload the script:
FileAppend, `n%Hotstring%, %A_ScriptFullPath%  ; Put a `n at the beginning in case file lacks a blank line at its end.
Reload
Sleep 200 ; If successful, the reload will close this instance during the Sleep, so the line below will never be reached.
MsgBox, 4, , The hotstring just added appears to be improperly formatted.  Would you like to open the script for editing? Note that the bad hotstring is at the bottom of the script.
IfMsgBox, Yes, Edit
return

MoveCaret:
    IfWinNotActive, New Hotstring
return
; Otherwise, move the InputBox's insertion point to where the user will type the abbreviation.
Send {Home}{Right 3}
SetTimer, MoveCaret, Off
return
; O  确定键 输入的空格、回车是不生效的
:O:u11::15928446337
:O:u12::ly123456
:O:u21::13438067470
:O:u22::123456
:O:u31::18628309200
:O:u32::309200
:O:u41::18190165596
:O:u42::165596F

:O:git1::git add .
:O:git2::git commit -m ' ' --no-verify
    :O:git3::git push
:O:npm1::npm run dev
:O:npm2::npm run serve

:O:u1::http://m.pay.shanglv51.com/#/

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

:O:f1::document.body.contentEditable="true"

; 重复按下N次回车键
F1::
    loop, 1000 {
        Send, {Enter}
    }
Return