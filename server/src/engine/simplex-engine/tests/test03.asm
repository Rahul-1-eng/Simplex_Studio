; test03.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: SET pseudo-instruction test

; SET pseudo-instruction test
val: SET 75
val2: SET 66
    ldc val
    adc val2
    HALT
