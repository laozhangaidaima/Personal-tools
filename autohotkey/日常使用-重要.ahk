
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
:O:git2::git commit -m '' --no-verify
:O:git3::git push

:O:npm1::npm run dev
:O:npm2::npm run serve

:O:f1::document.body.contentEditable="true"







; 鼠标滑轮上下翻页速度调整
; 默认速度3左右合适
WheelDown::
    MouseClick, WheelDown, , , 3, 0, D, R
Return

WheelUp::
    MouseClick, WheelUp, , , 3, 0, D, R
Return


; 重复按下N次回车键
F10::
    loop, 10 {
        Send, {#}
        Send, {Space}
        Send, {Enter}

    }
Return
