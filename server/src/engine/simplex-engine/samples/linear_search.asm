; linear_search.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: Searches for key in arr and stores index in result.
; Expected result for key = 9 is index 2.

start:
    ldc vars
    a2sp

    ldc 0
    stl 3      ; i = 0

loop:
    ldl 3
    ldl 0
    sub
    brz not_found

    ldc arr
    ldl 3
    add
    ldnl 0

    ldl 1
    sub
    brz found

    ldl 3
    adc 1
    stl 3

    br loop

found:
    ldl 3
    stl 4
    HALT

not_found:
    ldc -1
    stl 4
    HALT

vars:
n:      data 4
key:    data 9
unused: data 0
i:      data 0
result: data 0

arr:
    data 3
    data 7
    data 9
    data 1
