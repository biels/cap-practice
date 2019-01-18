testExample5
	"Fibonacci of #n"
	|a b|

	a := (PROG withInit: {{ #n . 10 } . { #fib . 1 }. { #prevFib . 1}. { #i . 2} . {#temp . 0}}
	do: {
    { #label1 . [ (#n binding <= 1) ifTrue: [ #RETURN binding value: #n binding ] ] } .
    { #loop . [ (#i binding = (#n binding)) ifTrue: [#endloop binding value] ] } .
    { #label2 . [ #temp changeBinding: (#fib binding) ] } .
    { #label3 . [ #fib changeBinding: (#fib binding + (#prevFib binding))] } .
    { #label4 . [ #prevFib changeBinding: (#temp binding) ] } .
    { #label5 . [ #i changeBinding: (#i binding + 1)] } .
    { #label6 . [ #loop binding value ] } .
    { #endloop . [ ] } .
    { #label7 . [ #RETURN binding value: (#fib binding) ] } .
	}).
	b := 55.
	self assert: (a value) = b.
