# Multi-Vessel Final Combination Fix

## Problem
The game's automation system was only combining 2 vessels at a time, which broke final recipe combinations that require 3 or more items. For example, a "Buffalo Wings Platter" requiring Buffalo Wings + Blue Cheese Dip + Celery would incorrectly combine Buffalo Wings + Blue Cheese Dip first, creating an intermediate combo that prevented the final recipe from being completed.

## Root Cause
The `findBestVesselPair()` function was hardcoded to only look for pairs of vessels to combine, and the automation logic in the PENULTIMATE state only attempted pair-wise combinations.

## Solution
Added support for multi-vessel final combinations by:

### 1. New Function: `findVesselsForFinalCombination()`
- Finds ALL vessels needed for the final recipe (not just pairs)
- Returns an array of vessels that collectively contain all required items
- Handles both direct items and items that need to be expanded from combos

### 2. New Function: `combineMultipleVessels()`
- Can combine any number of vessels at once (not limited to 2)
- Creates the final combination vessel directly
- Properly handles animations and cleanup of merged vessels

### 3. Updated PENULTIMATE State Logic
- First checks if all vessels needed for final combination are available using `findVesselsForFinalCombination()`
- If a multi-vessel final combination is ready (3+ vessels), skips intermediate combinations and moves directly to ANIMATE state
- Falls back to pair-wise combinations only when multi-vessel combination isn't ready

## Key Changes in `js/GameLogic.js`

1. Added `findVesselsForFinalCombination()` at line ~1746
2. Added `combineMultipleVessels()` at line ~1856  
3. Modified PENULTIMATE state logic at line ~1398 to check for multi-vessel combinations first

## Result
The game now correctly handles final recipe combinations of any size:
- 2-vessel combinations continue to work as before
- 3+ vessel combinations are now properly detected and combined all at once
- The automation sequence properly animates all vessels moving together before combining
- No more broken intermediate combinations that prevent final recipe completion

## Testing
The fix has been tested with:
- 3-vessel combination (Buffalo Wings + Blue Cheese Dip + Celery)
- 4-vessel combination scenarios
- Backwards compatibility with 2-vessel combinations