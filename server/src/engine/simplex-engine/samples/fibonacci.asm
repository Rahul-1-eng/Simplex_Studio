; fibonacci.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: Simple iterative Fibonacci update demo.
; Final value is kept in variable b. For count = 8, b becomes 21.

start:
    ldc vars
    a2sp

    ldc 0
    stl 0      ; a = 0

    ldc 1
    stl 1      ; b = 1

    ldc 8
    stl 2      ; count = 8

    ldl 2
    brz done

    ldl 2
    adc -1
    stl 2

loop:
    ldl 2
    brz done

    ldl 0
    ldl 1
    add
    stl 3      ; next = a + b

    ldl 1
    stl 0      ; a = b

    ldl 3
    stl 1      ; b = next

    ldl 2
    adc -1
    stl 2

    br loop

done:
    HALT

vars:
a:      data 0
b:      data 0
count:  data 0
next:   data 0
