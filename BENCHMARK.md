## Benchmark

Test results _10ms_ each in Bun v1.3.2 on Apple Silicon.
Look at the column `Samples` as a quick indicator of performance.

(TL;DR: **KLSX is the lightest & fastest almost everywhere, but the gap is so negligible and error prone**)

Benchmark (short strings):

|     | Task name  | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Samples |
| --- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 0   | KLSX       | 56.46 ± 0.68%    | 42.00 ± 1.00     | 20554389 ± 0.13%       | 23809524 ± 580720      | 177109  |
| 1   | classix    | 58.41 ± 4.33%    | 42.00 ± 1.00     | 20227141 ± 0.13%       | 23809524 ± 580720      | 171195  |
| 2   | clsx       | 55.72 ± 0.28%    | 42.00 ± 1.00     | 20357130 ± 0.13%       | 23809524 ± 580720      | 179455  |
| 3   | classnames | 58.06 ± 4.55%    | 42.00 ± 1.00     | 20150251 ± 0.13%       | 23809524 ± 580720      | 172248  |

Benchmark (long strings):

|     | Task name  | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Samples |
| --- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 0   | KLSX       | 135.32 ± 5.93%   | 125.00 ± 0.00    | 9377312 ± 0.19%        | 8000000 ± 0            | 73900   |
| 1   | classix    | 174.34 ± 0.75%   | 125.00 ± 0.00    | 6765287 ± 0.20%        | 8000000 ± 0            | 57360   |
| 2   | clsx       | 222.94 ± 6.05%   | 167.00 ± 1.00    | 5421387 ± 0.20%        | 5988024 ± 36072        | 44855   |
| 3   | classnames | 147.47 ± 0.53%   | 125.00 ± 0.00    | 7482902 ± 0.13%        | 8000000 ± 0            | 67812   |

Benchmark (objects):

|     | Task name  | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Samples |
| --- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 0   | KLSX       | 98.96 ± 1.29%    | 83.00 ± 0.00     | 11274574 ± 0.10%       | 12048193 ± 0           | 101049  |
| 1   | clsx       | 105.39 ± 0.68%   | 83.00 ± 0.00     | 10986267 ± 0.13%       | 12048193 ± 0           | 94887   |
| 2   | classnames | 97.48 ± 0.42%    | 83.00 ± 0.00     | 11183838 ± 0.11%       | 12048193 ± 0           | 102591  |

Benchmark (arrays):

|     | Task name  | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Samples |
| --- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 0   | KLSX       | 91.37 ± 0.71%    | 83.00 ± 0.00     | 11628447 ± 0.08%       | 12048193 ± 0           | 109448  |
| 1   | clsx       | 140.18 ± 9.28%   | 125.00 ± 0.00    | 8325415 ± 0.16%        | 8000000 ± 0            | 71340   |
| 2   | classnames | 137.70 ± 0.34%   | 125.00 ± 0.00    | 7673930 ± 0.11%        | 8000000 ± 0            | 72624   |

Benchmark (mixed):

|     | Task name  | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Samples |
| --- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 0   | KLSX       | 120.19 ± 6.40%   | 125.00 ± 41.00   | 9823538 ± 0.16%        | 8000000 ± 3904762      | 83200   |
| 1   | clsx       | 150.46 ± 6.24%   | 125.00 ± 0.00    | 7441597 ± 0.13%        | 8000000 ± 0            | 66465   |
| 2   | classnames | 179.99 ± 5.99%   | 167.00 ± 0.00    | 6080521 ± 0.13%        | 5988024 ± 0            | 55558   |

Memory Usage:

|     | Task name  | Footprint size (bytes) | Shallow size (bytes) |
| --- | ---------- | ---------------------- | -------------------- |
| 0   | KLSX       | 44                     | 32                   |
| 1   | classix    | 163                    | 32                   |
| 2   | clsx       | 163                    | 32                   |
| 3   | classnames | 241                    | 36                   |
