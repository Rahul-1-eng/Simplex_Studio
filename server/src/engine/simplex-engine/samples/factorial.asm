; factorial.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: Demonstrates loop control using a countdown style program.
; Note: This sample counts down from n to 0 and is kept simple for emulator testing.

n: data 5
one: data 1

start:
    ldc n
    ldnl 0
loop:
    brz done
    adc -1
    br loop
done:
    HALT
