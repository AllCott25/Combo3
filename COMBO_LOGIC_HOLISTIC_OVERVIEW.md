# Combo Logic Holistic Overview

## Current Issues Identified

1. **Combo + Combo + Ingredient(s) = Final Recipe**: Some recipes that include Ingredients (rather than just combos) as parts of the final recipe are not autocompleting with the ingredient and moving on to the Win Screen.

2. **Combo 1 + Combo 2 = Combo 3, Combo 3 + Combo 4 (or Ingredient) = Final Recipe**: When trying to combine Combo 1 and Combo 2 to make Intermediate Combo 3, this combination is treated as an incorrect move.

3. **Animation Speed Issues**: The autocomplete of the final recipe combo is moving too slow, as is the vessel size increase animation when a player gets a correct addition to a combo.

## Current Implementation Analysis

### Combo Recognition System (in `combineVessels()`)

The system uses a unified approach with these key functions:

1. **`getAllItems(vessel)`**: Extracts all items from a vessel including:
   - Base ingredients from `vessel.ingredients`
   - Combo name from `vessel.name` (if no ingredients)
   - Complete combinations from `vessel.complete_combinations`

2. **`findMatchingRecipe(items)`**: Checks if items match any recipe by:
   - First checking against final_combination
   - Then checking all intermediate_combinations
   - Also checks for partial matches (subset of required ingredients)

3. **`createVesselFromRecipe(recipe, items)`**: Creates appropriate vessel based on match

### Issues with Current Logic

1. **Problem with Combo + Combo + Ingredient**: The `getAllItems()` function may not be properly handling vessels that contain both combo names AND ingredients together.

2. **Problem with Intermediate Combo Recognition**: When combining two combos to create a third combo, the system may not be properly recognizing the combo names as valid ingredients for the new combo.

3. **Debug Logging Too Verbose**: The extensive "BUGSLIFE" logging makes it hard to track the actual flow.

## Proposed Solutions

### 1. Fix Item Extraction Logic
- Ensure `getAllItems()` properly handles all vessel states
- Make sure combo names are recognized as valid ingredients for other combos

### 2. Fix Recipe Matching
- Ensure the recipe matching logic properly handles combo names as ingredients
- Fix any issues with duplicate handling

### 3. Optimize Animation Timing
- Increase the vessel growth animation speed (currently using `lerp` with 0.2 factor)
- Reduce the auto-combination timer delays

### 4. Simplify Debug Logging
- Create a cleaner debug logging system that's easier to follow
- Add specific logs for combo matching logic