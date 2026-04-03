; test04.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: Branch/loop style test

; Branch/loop style test
start:
    ldc 3
loop:
    adc -1
    brz done
    br loop
done:
    HALT
