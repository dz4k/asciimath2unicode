
# asciimath2unicode

Translates a subset of AsciiMath syntax in a document to Unicode math symbols.

I made this to take notes with an app I really liked that doesn't have TeX support.
The Unicode math, while nowhere near as beautiful as LaTeX output,
is great for storing and reading as plaintext.

It uses ¨ (combining diaeresis) as a marker for math
because&mdash;for some reason&mdash;that's on my laptop's keyboard.
Expressions with whitespace in them need to be wrapped in parentheses.


# Examples

| Source | Output |
|--------|--------|
| ¨phi | ϕ |
| ¨(int(-oo, oo) x(tau) h(t - tau) dtau) | ∫(-∞, ∞) x(τ) h(t - τ) dτ |
