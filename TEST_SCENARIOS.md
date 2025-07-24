# Test Scenarios for Combo3 Game

## Setup Instructions

1. Open the game in your browser
2. Open the browser console (F12)
3. Use the recipe selector to choose "Buffalo Wings Feast"

## Test Scenario 1: Combo + Combo + Ingredient Auto-Combination

**Goal**: Test that Buffalo Wings + Blue Cheese Dip + Celery auto-combines into Buffalo Wings Feast

**Steps**:
1. Drag "Chicken Wings" and "Hot Sauce" together to create "Buffalo Wings"
2. Drag "Blue Cheese" and "Mayo" together to create "Blue Cheese Dip"  
3. Drag "Buffalo Wings" and "Blue Cheese Dip" together to create "Buffalo Wings with Blue Cheese Dip"
4. Now drag "Celery" near the combo vessel
5. **Expected**: The game should auto-combine into "Buffalo Wings Feast"
6. **Console Check**: Look for:
   - "AUTO COMBINATION STATE: PENULTIMATE"
   - "Found valid pair for final combination (after expansion)!"
   - The expanded items should show all base ingredients

## Test Scenario 2: T1A + T1B = T2 Intermediate Combo

**Goal**: Test that intermediate combinations work correctly

**Steps**:
1. Choose a recipe that has intermediate combos (e.g., one where T1A + T1B = T2)
2. Drag the two T1 ingredients together
3. **Expected**: Should create the T2 combo successfully
4. **Console Check**: 
   - Should see "✓ Matched: [T2 combo name]"
   - Should NOT see any error about incorrect combo

## Debug Commands

If auto-combination fails, run these in the console:

```javascript
// Check current vessels
vessels.forEach((v, i) => {
  console.log(`Vessel ${i}:`, {
    name: v.name,
    ingredients: v.ingredients,
    items: getAllItemsFromVessel(v)
  });
});

// Check final recipe requirements
console.log('Final recipe requires:', final_combination.required);

// Test item expansion
const allItems = [];
vessels.forEach(v => allItems.push(...getAllItemsFromVessel(v)));
console.log('All items:', allItems);
console.log('Expanded items:', expandItemsForFinalRecipe(allItems));

// Force auto-combination check
if (typeof processAutoFinalCombination === 'function') {
  processAutoFinalCombination();
}
```

## Common Issues and Fixes

### Issue: "completedCombos is not defined" error
**Fix**: This has been fixed in GameLogic.js by defining the variable in findBestVesselPair

### Issue: Combo + Combo + Ingredient doesn't auto-combine
**Fix**: Added expandItemsForFinalRecipe function to properly expand combos when checking final recipe

### Issue: T1A + T1B shows as incorrect combo
**Fix**: The findMatchingRecipe function should properly match using arraysMatchExact

### Issue: Diagnostic tool shows "Vessel is not defined"
**Fix**: Added Vessel class definition to the diagnostic HTML file