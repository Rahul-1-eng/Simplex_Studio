; max_in_array.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: Scans the array and stores the maximum value in maxv.
; For the given array, maxv becomes 9.

start:
    ldc vars
    a2sp

    ldc 0
    stl 2      ; i = 0

    ldc arr
    ldnl 0
    stl 1      ; maxv = arr[0]

loop:
    ldl 2
    ldl 0
    sub
    brz done

    ldc arr
    ldl 2
    add
    ldnl 0

    ldl 1
    sub
    brlz skip

    ldc arr
    ldl 2
    add
    ldnl 0
    stl 1

skip:
    ldl 2
    adc 1
    stl 2

    br loop

done:
    HALT

vars:
n:    data 4
maxv: data 0
i:    data 0

arr:
    data 7
    data 2
    data 9
    data 1
