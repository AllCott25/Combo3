# COMBO MEAL - Comprehensive Game Testing Suite

## Overview

The Comprehensive Game Testing Suite (`test-game.html`) is a powerful testing tool designed to help developers and testers validate the COMBO MEAL game in various user states, completion scenarios, and with different recipes. This suite addresses the key testing challenges:

- Testing as anonymous vs verified users
- Testing users who have/haven't completed today's game
- Testing with different recipes from any date
- Integration with existing admin tools

## Getting Started

### Quick Start
1. Open `test-game.html` in your browser
2. The suite will automatically initialize and check database connections
3. Use the "Quick Test Scenarios" section for immediate testing

### Prerequisites
- Access to the COMBO MEAL database (Supabase)
- Valid admin credentials (for certain functions)
- Modern web browser with JavaScript enabled

## Main Features

### 🚀 Quick Test Scenarios
Pre-configured scenarios that automatically set up common testing conditions:

- **Anonymous New User**: Fresh anonymous user who hasn't played
- **Anonymous Completed**: Anonymous user who finished today's recipe
- **Verified New User**: Authenticated user who hasn't played today
- **Verified Completed**: Authenticated user who finished today
- **Historical Recipe**: Test with older recipes
- **Future Recipe**: Test with upcoming recipes

### 👤 User Authentication Control
Comprehensive user state management:

- **Set Anonymous User**: Creates anonymous session
- **Login Test User**: Uses default test account
- **Create New Test User**: Generates fresh test account
- **Custom Login**: Login with specific credentials
- **Logout**: Clear all authentication

### 📅 Recipe Selection & Date Control
Flexible recipe testing:

- **Date Selection**: Pick any specific date
- **Available Recipes**: Browse all recipes in database
- **Load Today's Recipe**: Quick access to current recipe
- **Load Random Recipe**: Random selection for varied testing
- **Recipe Metadata**: View recipe details and selection status

### ✅ Completion State Control
Simulate various game states:

- **Simulate Game Completion**: Create completed session with realistic data
- **Simulate Partial Progress**: Create in-progress session
- **Clear All Progress**: Reset user's game history
- **Check Current Progress**: View detailed progress information

### 🎮 Game Launch & Testing
Multiple ways to test the game:

- **Launch in Frame**: Embedded testing within the suite
- **Launch in New Tab**: Full-screen game testing
- **Launch Playtest Mode**: Access original playtest interface
- **Debug Monitoring**: Track game events and errors

### 🗄️ Database Testing & Analytics
Comprehensive data validation:

- **Test DB Connection**: Verify database connectivity
- **Check Recipe Data**: Validate recipe integrity
- **Validate User Data**: Check session data consistency
- **Data Integrity Check**: Full system validation
- **User Analytics**: Detailed user statistics
- **Export Test Data**: Download test results

## Detailed Usage Guide

### Setting Up Test Scenarios

#### Testing Anonymous Users
```javascript
// Quick setup for anonymous user testing
setupScenario('anonymous-fresh')  // New anonymous user
setupScenario('anonymous-completed')  // Completed anonymous user
```

#### Testing Verified Users
```javascript
// Quick setup for verified user testing
setupScenario('verified-fresh')  // New verified user
setupScenario('verified-completed')  // Completed verified user
```

#### Testing Historical/Future Recipes
```javascript
// Test with past/future recipes
setupScenario('historical-date')  // Older recipe
setupScenario('future-date')  // Future recipe
```

### Manual Testing Workflow

1. **Set User State**
   - Choose authentication type (anonymous/verified)
   - Clear or simulate previous progress

2. **Select Recipe**
   - Pick specific date or use today's recipe
   - Verify recipe selection in status panel

3. **Configure Completion State**
   - Simulate completion if testing "already played" scenarios
   - Leave fresh for new user testing

4. **Launch Game**
   - Use embedded frame for quick testing
   - Use new tab for full experience testing

5. **Monitor and Validate**
   - Check debug log for errors
   - Verify completion state changes
   - Export data for analysis

### Common Testing Scenarios

#### Scenario 1: New Anonymous User
```
1. Click "Anonymous New User" in Quick Scenarios
2. Verify status shows: Anonymous, Not Completed, Today's Recipe
3. Launch game and play through
4. Check completion state updates correctly
```

#### Scenario 2: Returning Verified User
```
1. Click "Verified Completed" in Quick Scenarios
2. Verify status shows: Verified, Completed, Today's Recipe
3. Launch game - should show win screen
4. Test recipe box and sharing features
```

#### Scenario 3: Historical Recipe Testing
```
1. Click "Historical Recipe" in Quick Scenarios
2. Select different historical date manually
3. Test game with older recipe data
4. Verify no "today's completion" conflicts
```

#### Scenario 4: Cross-User State Testing
```
1. Start as anonymous user, play partially
2. Switch to verified user authentication
3. Verify separate progress tracking
4. Test data migration if applicable
```

## Status Indicators

The suite provides real-time status monitoring:

### Authentication Status
- 🟢 **Online**: User authenticated
- 🔴 **Offline**: No authentication
- 🔶 **Unknown**: Checking status

### User Type
- **Anonymous**: Anonymous session active
- **Verified**: Authenticated user session
- **None**: No user session

### Database Status
- 🟢 **Connected**: Database accessible
- 🔴 **Error**: Connection failed
- 🔶 **Checking**: Testing connection

### Completion State
- **Completed**: User finished selected recipe
- **Not Completed**: User hasn't finished recipe
- **Unknown**: Cannot determine state

## Advanced Features

### Debug Mode
Enable comprehensive logging and error tracking:
```javascript
enableDebugMode()  // Toggle debug mode
monitorGameEvents()  // Track game iframe events
```

### Data Export
Export test results for analysis:
```javascript
exportTestData()  // User session data
exportDebugLog()  // Debug log contents
```

### Database Validation
Ensure data integrity:
```javascript
runDataIntegrityCheck()  // Full validation
checkRecipeData()  // Recipe-specific checks
validateUserData()  // User session checks
```

## Integration with Admin Tools

The testing suite integrates with existing admin interfaces:

- **Standard Admin Panel**: Recipe management and analytics
- **Recipe Tree Editor**: Create and modify recipes
- **Original Playtest**: Date-specific recipe testing

Access these tools via the admin links at the top of the suite.

## Troubleshooting

### Common Issues

#### "Supabase not available"
- Check network connection
- Verify Supabase configuration
- Ensure all required JS files are loaded

#### "No recipes available"
- Check database connection
- Verify recipe data exists
- Run data integrity check

#### "Authentication failed"
- Check user credentials
- Try creating new test user
- Verify Supabase auth configuration

#### "Game won't launch"
- Check selected recipe
- Verify iframe permissions
- Try new tab launch instead

### Debug Information

The debug log provides detailed information about:
- Authentication state changes
- Database operations
- Recipe loading status
- Game launch events
- Error conditions

## Best Practices

### Testing Workflow
1. Always check status indicators before testing
2. Use Quick Scenarios for rapid setup
3. Clear progress between different test types
4. Export data for regression testing
5. Monitor debug log for unexpected issues

### Data Management
- Regularly clear test user progress
- Use separate test users for different scenarios
- Export important test data before clearing
- Validate data integrity periodically

### Performance Testing
- Test with various recipe sizes
- Monitor load times for different user states
- Check memory usage during extended testing
- Validate mobile responsiveness

## API Reference

### Key Functions

#### Authentication
- `setAnonymousUser()`: Create anonymous session
- `loginTestUser()`: Login default test user
- `loginCustomUser()`: Login with custom credentials
- `logoutUser()`: Clear authentication

#### Recipe Management
- `loadAvailableRecipes()`: Refresh recipe list
- `selectRecipe(recipeId)`: Choose specific recipe
- `loadTodayRecipe()`: Load current day's recipe
- `loadRandomRecipe()`: Select random recipe

#### Testing Control
- `setupScenario(type)`: Configure test scenario
- `simulateGameCompletion()`: Create completed session
- `clearUserProgress()`: Reset user data
- `checkUserCompletionState()`: Verify completion status

#### Game Launch
- `launchGameInFrame()`: Embed game in suite
- `launchGameNewTab()`: Open game in new tab
- `enableDebugMode()`: Toggle debug features

## Support and Feedback

For issues with the testing suite:
1. Check the debug log for error details
2. Export test data for analysis
3. Verify database connectivity
4. Contact development team with specific error messages

The testing suite is designed to be comprehensive and user-friendly. Regular use during development helps ensure the game works correctly across all user scenarios and edge cases.