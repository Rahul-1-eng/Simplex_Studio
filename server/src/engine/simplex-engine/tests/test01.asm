; test01.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: Valid simple test

; Valid simple test
start:
    ldc 5
    adc 7
    br done
temp: data 0
done:
    HALT
