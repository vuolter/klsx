## Benchmark

Multiple tests, repeated for _100ms_ each, using Bun v1.4.4 on Apple Silicon.

More `Score` => **Better**. Score is tinybench's sample count for the run.

### Packages compared

- [𝒌𝒍𝒔𝒙 _v0.4.2_](https://www.npmjs.com/package/klsx)
- [classix _v2.2.27_](https://www.npmjs.com/package/classix)
- [clsx _v2.1.1_](https://www.npmjs.com/package/clsx)
- [classnames _v2.5.1_](https://www.npmjs.com/package/classnames)

### Results

- **𝒌𝒍𝒔𝒙 is the fastest in all of the five tests**. Level with _classix_ on short strings, where the gap is within noise.
- **𝒌𝒍𝒔𝒙 ships a larger bundle than _classix_ and _clsx_** (477 bytes raw, 203 bytes Brotli). _classix_ is the smallest.
- **Load memory is similar across libraries**, except _classnames_, which is about 2.6 times larger than _𝒌𝒍𝒔𝒙_.

### Notes

- _classix_ only handles string concatenation; it was therefore excluded from tests involving other data types.

#### Benchmark (mixed / real-world)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score   |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 1st  | 𝒌𝒍𝒔𝒙       | 45.50 ± 0.43%    | 42.00 ± 0.00     | 23105230 ± 0.02%       | 23809524 ± 0           | 2197808 |
| 2nd  | clsx       | 67.26 ± 0.53%    | 83.00 ± 41.00    | 17555902 ± 0.06%       | 12048193 ± 6060169     | 1486876 |
| 3rd  | classnames | 85.73 ± 0.71%    | 83.00 ± 1.00     | 14003924 ± 0.08%       | 12048193 ± 143431      | 1166490 |

#### Benchmark (objects)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score   |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 1st  | 𝒌𝒍𝒔𝒙       | 77.75 ± 0.88%    | 83.00 ± 1.00     | 14538252 ± 0.06%       | 12048193 ± 143431      | 1286168 |
| 2nd  | classnames | 83.95 ± 0.64%    | 83.00 ± 0.00     | 12990422 ± 0.06%       | 12048193 ± 0           | 1191158 |
| 3rd  | clsx       | 90.58 ± 0.75%    | 83.00 ± 0.00     | 12068166 ± 0.05%       | 12048193 ± 0           | 1103994 |

#### Benchmark (arrays)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score   |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 1st  | 𝒌𝒍𝒔𝒙       | 77.70 ± 0.25%    | 83.00 ± 0.00     | 14177904 ± 0.06%       | 12048193 ± 0           | 1287026 |
| 2nd  | clsx       | 99.01 ± 0.62%    | 84.00 ± 1.00     | 10840904 ± 0.04%       | 11904762 ± 143431      | 1009954 |
| 3rd  | classnames | 112.29 ± 0.58%   | 125.00 ± 0.00    | 9447594 ± 0.05%        | 8000000 ± 0            | 890586  |

#### Benchmark (long strings)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score  |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------ |
| 1st  | 𝒌𝒍𝒔𝒙       | 102.97 ± 1.03%   | 84.00 ± 1.00     | 10524306 ± 0.04%       | 11904762 ± 143431      | 971163 |
| 2nd  | classix    | 118.89 ± 1.14%   | 125.00 ± 0.00    | 9357327 ± 0.05%        | 8000000 ± 0            | 841136 |
| 3rd  | classnames | 122.98 ± 0.79%   | 125.00 ± 0.00    | 8653651 ± 0.05%        | 8000000 ± 0            | 813143 |
| 4th  | clsx       | 179.12 ± 1.27%   | 167.00 ± 0.00    | 5963802 ± 0.04%        | 5988024 ± 0            | 558285 |

#### Benchmark (short strings)

| Rank | Package    | Latency avg (ns) | Latency med (ns) | Throughput avg (ops/s) | Throughput med (ops/s) | Score   |
| ---- | ---------- | ---------------- | ---------------- | ---------------------- | ---------------------- | ------- |
| 1st  | 𝒌𝒍𝒔𝒙       | 54.71 ± 0.08%    | 42.00 ± 1.00     | 20424308 ± 0.04%       | 23809524 ± 580719      | 1827662 |
| 2nd  | classix    | 56.80 ± 0.25%    | 42.00 ± 1.00     | 19974909 ± 0.04%       | 23809524 ± 580719      | 1760631 |
| 3rd  | classnames | 64.05 ± 0.57%    | 42.00 ± 1.00     | 17961577 ± 0.05%       | 23809523 ± 580721      | 1561201 |
| 4th  | clsx       | 71.22 ± 0.34%    | 83.00 ± 1.00     | 15940474 ± 0.06%       | 12048193 ± 143431      | 1404049 |

#### Analysis (memory usage)

| Rank | Package    | Shallow (bytes) | Load (bytes) |
| ---- | ---------- | --------------- | ------------ |
| 1st  | classix    | 32              | 2114         |
| 2nd  | 𝒌𝒍𝒔𝒙       | 32              | 2779         |
| 3rd  | clsx       | 32              | 2879         |
| 4th  | classnames | 36              | 7337         |

#### Analysis (disk usage)

| Rank | Package    | Storage (bytes) | Dist (bytes) | Gzip (bytes) | Brotli (bytes) |
| ---- | ---------- | --------------- | ------------ | ------------ | -------------- |
| 1st  | classix    | 163             | 150          | 140          | 102            |
| 2nd  | clsx       | 163             | 388          | 242          | 192            |
| 3rd  | 𝒌𝒍𝒔𝒙       | 368             | 477          | 249          | 203            |
| 4th  | classnames | 241             | 1530         | 664          | 517            |
