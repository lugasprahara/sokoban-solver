# Sokoban Solver

[![](https://make.fun/badge/sokoban-solver-01-run-20261121.svg)](https://make.fun/bounty/sokoban-solver-01-run-20261121)
[![](https://make.fun/badge/sokoban-solver-01-run-20261121/lugasprahara/sokoban-solver/rank.svg)](https://make.fun/bounty/sokoban-solver-01-run-20261121)
[![](https://make.fun/badge/sokoban-solver-01-run-20261121/lugasprahara/sokoban-solver/reward.svg)](https://make.fun/bounty/sokoban-solver-01-run-20261121)

A push-optimal Sokoban solver in one dependency-free TypeScript file. Node 22: `node main.ts` reads every `/input/<id>/level.txt` and writes `/output/<id>/solution.txt`.

How it works: for each goal, pull distances are precomputed (pushes a box needs to reach it, other boxes ignored). Boxes that can reach a common goal form a component; components never interact, so each is solved alone by an A* over pushes — player reachability flooded per state, cost in pushes, estimate the summed pull distances, which never overstates, so solutions are push-optimal. Other components' boxes are fixed obstacles; if a component resists, the whole level is tried as one. Budgets count expansions, never the clock, so runs are deterministic.

Referral: https://make.fun/r/aes5np1n
