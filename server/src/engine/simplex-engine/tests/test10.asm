; test10.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: test10.asm - sum 1..(n-1) example using branches and variables

; test10.asm - sum 1..(n-1) example using branches and variables
n:    SET 5
acc:  data 0
i:    data 1

start:
    ldl acc      ; A=acc
    ldl i        ; A=i, B=acc
    add          ; A=acc+i
    stl acc      ; acc=A, A=old B

    ldl i        ; A=i
    ldc 1        ; A=1, B=i
    add          ; A=i+1
    stl i        ; i=A, A=old B

    ldc n        ; A=n
    ldl i        ; A=i, B=n
    sub          ; A=n-i
    brz done     ; if zero then stop
    br start

done:
    HALT
