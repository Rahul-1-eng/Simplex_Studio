; bubble_sort.asm
; Author: Rahul Kumar Sahoo (2401CS09)
; Purpose: Demonstrates ascending bubble sort on demo array 9 3 7 2 1.

; bubble_sort.asm
; Working bubble sort for the SIMPLEX emulator in this project.
; Input array  : 9 3 7 2 1
; Expected dump: 1 2 3 7 9
;
; Uses global variables only, so code memory is not overwritten.

start:
    ; i = 0
    ldc 0
    ldc i
    stnl 0

outer_check:
    ; limit = (n - 2) - i
    ldc n
    ldnl 0
    adc -2
    ldc i
    ldnl 0
    sub
    brlz done

    ldc limit
    stnl 0

    ; j = 0
    ldc 0
    ldc j
    stnl 0

inner_check:
    ; while (j <= limit)
    ldc limit
    ldnl 0
    ldc j
    ldnl 0
    sub
    brlz next_outer

    ; val1 = arr[j]
    ldc base
    ldnl 0
    ldc j
    ldnl 0
    add
    ldnl 0
    ldc val1
    stnl 0

    ; val2 = arr[j + 1]
    ldc base
    ldnl 0
    ldc j
    ldnl 0
    adc 1
    add
    ldnl 0
    ldc val2
    stnl 0

    ; if (val1 <= val2) skip swap
    ldc val1
    ldnl 0
    ldc val2
    ldnl 0
    sub
    brlz no_swap
    brz no_swap

    ; ptr = base + j
    ldc base
    ldnl 0
    ldc j
    ldnl 0
    add
    ldc ptr
    stnl 0

    ; arr[j] = val2
    ldc val2
    ldnl 0
    ldc ptr
    ldnl 0
    stnl 0

    ; ptr = base + j + 1
    ldc base
    ldnl 0
    ldc j
    ldnl 0
    adc 1
    add
    ldc ptr
    stnl 0

    ; arr[j + 1] = val1
    ldc val1
    ldnl 0
    ldc ptr
    ldnl 0
    stnl 0

no_swap:
    ; j = j + 1
    ldc j
    ldnl 0
    adc 1
    ldc j
    stnl 0
    br inner_check

next_outer:
    ; i = i + 1
    ldc i
    ldnl 0
    adc 1
    ldc i
    stnl 0
    br outer_check

done:
    halt

n:      data 5
base:   data arr
i:      data 0
j:      data 0
limit:  data 0
ptr:    data 0
val1:   data 0
val2:   data 0
arr:    data 9
        data 3
        data 7
        data 2
        data 1
