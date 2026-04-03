# Testing

## Test Programs

- `test01.asm` - valid program
- `test02.asm` - error diagnostics
- `test03.asm` - `SET` directive
- `test04.asm` - loop and branch example
- `test05.asm` - larger structured program

## Sample Programs

- `bubble_sort.asm`
- `factorial.asm`
- `fibonacci.asm`
- `linear_search.asm`
- `max_in_array.asm`

## Demo Steps

1. `build.bat`
2. `bin\asm.exe tests\test01.asm outputs\test01`
3. inspect `outputs\test01.lst`, `outputs\test01.sym`, `outputs\test01.log`
4. `bin\emu.exe outputs\test01.o outputs\test01.trace outputs\test01.dump`
5. inspect `outputs\test01.trace` and `outputs\test01.dump`

## Bubble Sort Sample

The included `samples/bubble_sort.asm` performs an ascending sort on the array `9 3 7 2 1`.
After emulation, inspect `outputs\bubble_sort.dump`. The array region becomes `1 2 3 7 9`.
