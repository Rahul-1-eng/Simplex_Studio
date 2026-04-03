; test05.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: Larger structured sample

; Larger structured sample
    ldc 0x1000
    a2sp
    adj -1
    ldc result
    stl 0
    ldc count
    ldnl 0
    call main
    adj 1
    HALT

main:
    adj -3
    stl 1
    stl 2
    ldc 0
    stl 0
    adj -1
    ldl 3
    stl 0
    ldl 1
    call triangle
    adj 1
    ldl 3
    stnl 0
    ldl 1
    adj 3
    return

triangle:
    adj -3
    stl 1
    stl 2
    ldc 1
    shl
    ldl 3
    sub
    brlz skip
    ldl 3
    ldl 2
    sub
    stl 2
skip:
    ldl 2
    brz one
    ldl 3
    adc -1
    stl 0
    adj -1
    ldl 1
    stl 0
    ldl 3
    adc -1
    call triangle
one:
    ldl 1
    adj 3
    return

count: data 5
result: data 0
