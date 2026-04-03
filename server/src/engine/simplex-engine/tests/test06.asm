; test06.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: test1.asm

; test1.asm
label: ; an unused label
ldc 0
ldc -5
ldc +5
loop: br loop ; an infinite loop
br next ;offset should be zero
next:
ldc loop ; load code address
ldc var1 ; forward ref
var1: data 0 ; a variable