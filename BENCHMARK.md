## Benchmark

Multiple tests, repeated for _100ms_ each, using Bun v1.4.4 on Apple Silicon.

_classix_ only handles string concatenation; it was therefore excluded from tests involving other data types.

More `Score` => **Better**. Score is tinybench's sample count for the run.

### Results

- **𝒌𝒍𝒔𝒙 is the fastest in four of the five tests** (mixed, objects, arrays and long strings) and is level with _classix_ on short strings, where the gap is within noise.
- **𝒌𝒍𝒔𝒙 ships a larger bundle than _classix_ and _clsx_** (426 bytes raw, 196 bytes Brotli). _classix_ is the smallest.
- **Load memory is similar across libraries**, except _classnames_, which is about 2.7 times larger.

#### Benchmark (mixed / real-world)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score   |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 1st  | 𝒌𝒍𝒔𝒙       | 46.45 ± 0.61%    | 42.00 ± 0.00     | 22908431 ± 0.02%       | 23809524 ± 0           | 2152942 |
| 2nd  | clsx       | 66.35 ± 1.44%    | 42.00 ± 1.00     | 18115164 ± 0.06%       | 23809524 ± 580720      | 1507048 |
| 3rd  | classnames | 100.25 ± 0.73%   | 84.00 ± 41.00    | 11453697 ± 0.08%       | 11904762 ± 3904762     | 997540  |

#### Benchmark (objects)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score   |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 1st  | 𝒌𝒍𝒔𝒙       | 77.64 ± 0.73%    | 83.00 ± 1.00     | 14468793 ± 0.06%       | 12048193 ± 143431      | 1288008 |
| 2nd  | classnames | 84.75 ± 0.75%    | 83.00 ± 0.00     | 12866220 ± 0.06%       | 12048193 ± 0           | 1179878 |
| 3rd  | clsx       | 89.64 ± 0.79%    | 83.00 ± 0.00     | 12338257 ± 0.06%       | 12048193 ± 0           | 1115631 |

#### Benchmark (arrays)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score   |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 1st  | 𝒌𝒍𝒔𝒙       | 79.45 ± 0.41%    | 83.00 ± 0.00     | 13728159 ± 0.06%       | 12048193 ± 0           | 1258611 |
| 2nd  | clsx       | 93.96 ± 0.64%    | 83.00 ± 0.00     | 11539212 ± 0.05%       | 12048193 ± 0           | 1064287 |
| 3rd  | classnames | 117.41 ± 0.71%   | 125.00 ± 0.00    | 9003611 ± 0.05%        | 8000000 ± 0            | 851718  |

#### Benchmark (long strings)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score  |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------ |
| 1st  | 𝒌𝒍𝒔𝒙       | 104.72 ± 0.79%   | 84.00 ± 1.00     | 10272946 ± 0.04%       | 11904762 ± 143431      | 954941 |
| 2nd  | classix    | 122.83 ± 1.51%   | 125.00 ± 0.00    | 9310430 ± 0.06%        | 8000000 ± 0            | 814116 |
| 3rd  | classnames | 122.87 ± 0.74%   | 125.00 ± 0.00    | 8654288 ± 0.05%        | 8000000 ± 0            | 813867 |
| 4th  | clsx       | 178.19 ± 1.28%   | 167.00 ± 1.00    | 5991933 ± 0.04%        | 5988024 ± 36072        | 561187 |

#### Benchmark (short strings)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score   |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 1st  | 𝒌𝒍𝒔𝒙       | 55.16 ± 0.40%    | 42.00 ± 1.00     | 20346448 ± 0.04%       | 23809524 ± 580719      | 1813030 |
| 2nd  | classix    | 56.88 ± 0.63%    | 42.00 ± 1.00     | 20056617 ± 0.04%       | 23809524 ± 580719      | 1758029 |
| 3rd  | classnames | 63.28 ± 0.40%    | 42.00 ± 1.00     | 18129326 ± 0.05%       | 23809523 ± 580721      | 1580392 |
| 4th  | clsx       | 69.79 ± 0.32%    | 83.00 ± 1.00     | 16343234 ± 0.06%       | 12048193 ± 143431      | 1432776 |

#### Analysis (memory usage)

| Rank | Package    | Shallow (bytes) | Storage (bytes) | Load (bytes) | Dist (bytes) | Gzip (bytes) | Brotli (bytes) |
| ---- | ---------- | --------------- | --------------- | ------------ | ------------ | ------------ | -------------- |
| 1st  | classix    | 32              | 163             | 2114         | 151          | 142          | 109            |
| 2nd  | clsx       | 32              | 163             | 2879         | 388          | 242          | 192            |
| 3rd  | 𝒌𝒍𝒔𝒙       | 32              | 222             | 2885         | 426          | 219          | 196            |
| 4th  | classnames | 36              | 241             | 7903         | 1530         | 664          | 517            |
