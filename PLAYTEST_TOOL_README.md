# 🎮 COMBO MEAL - Improved Playtest Tool

## Overview

The **Improved Playtest Tool** (`test-game-improved.html`) is a streamlined, user-friendly interface designed specifically for testing the core scenarios you need to validate:

- **New Play vs Completed** - Test users who haven't played vs those who have already finished
- **Anonymous vs Verified** - Test anonymous users vs logged-in users
- **Recipe Selection** - Easy browsing and selection of recipes by date or from a sortable list
- **Real-time Logging** - Monitor exactly what's happening during your tests

## 🚀 Quick Start

1. **Open the tool**: Load `test-game-improved.html` in your browser
2. **Select a scenario**: Click one of the four test scenarios on the left
3. **Choose a recipe**: Pick a recipe by date or from the scrollable list on the right
4. **Launch the game**: Click "🚀 Launch Game" to test your selected scenario
5. **Monitor the log**: Watch the bottom panel for detailed feedback

## 🎭 Test Scenarios Explained

### 1. Anonymous New (👤)
- **Purpose**: Test a brand new anonymous user
- **Setup**: Creates anonymous session, clears any existing progress
- **Use Case**: First-time visitor experience, no account required

### 2. Anonymous Completed (👤✅)
- **Purpose**: Test anonymous user who already finished today's recipe
- **Setup**: Creates anonymous session, simulates completion
- **Use Case**: Returning visitor who completed the daily challenge

### 3. Verified New (🔐)
- **Purpose**: Test a logged-in user who hasn't played today
- **Setup**: Logs in test user, clears progress for selected recipe
- **Use Case**: Registered user starting a new game

### 4. Verified Completed (🔐✅)
- **Purpose**: Test a logged-in user who already finished today
- **Setup**: Logs in test user, simulates completion
- **Use Case**: Registered user returning after completion

## 📅 Recipe Selection Features

### Quick Date Selection
- **Today's Recipe**: Instantly load today's recipe
- **Date Picker**: Choose any specific date
- **Load Selected Date**: Load the recipe for your chosen date

### Recipe Browser
- **Scrollable List**: Browse all available recipes
- **Sorted by Date**: Most recent recipes appear first
- **Recipe Count**: See total number of available recipes
- **Visual Selection**: Selected recipe is clearly highlighted

## 📊 Status Monitoring

The tool provides real-time status indicators for:

- **Scenario**: Currently selected test scenario
- **Database**: Connection status (Connected/Error)
- **User Type**: Anonymous or Verified
- **Completion**: New Play or Completed status

## 📋 Playtest Log

The bottom panel shows detailed logging including:

- **Timestamps**: When each action occurred
- **Color-coded Levels**: Info (blue), Success (green), Warning (yellow), Error (red)
- **Detailed Messages**: Exactly what the tool is doing
- **Scrollable History**: Keep track of your testing session

## 🛠️ How to Use for Testing

### Testing User Authentication States

1. **Anonymous User Testing**:
   - Select "Anonymous New" or "Anonymous Completed"
   - Choose a recipe
   - Launch game to test anonymous user experience

2. **Verified User Testing**:
   - Select "Verified New" or "Verified Completed"
   - Choose a recipe
   - Launch game to test logged-in user experience

### Testing Completion States

1. **New Player Testing**:
   - Select either "Anonymous New" or "Verified New"
   - Test first-time player experience

2. **Completed Player Testing**:
   - Select either "Anonymous Completed" or "Verified Completed"
   - Test returning player experience after completion

### Testing Different Recipes

1. **Today's Recipe**:
   - Click "Today's Recipe" for current date testing
   - Most common scenario for daily players

2. **Historical Recipes**:
   - Use date picker to select past dates
   - Test older recipes for consistency

3. **Browse All Recipes**:
   - Scroll through the recipe list
   - Click any recipe to select it
   - Test specific recipes you want to validate

## 🔧 Troubleshooting

### Database Connection Issues
**Problem**: Red "Error" status for Database
**Solutions**:
- Check internet connection
- Verify Supabase configuration in `js/supabase.js`
- Check browser console for detailed error messages

### Authentication Problems
**Problem**: User authentication not working
**Solutions**:
- Check if anonymous sign-in is enabled in Supabase
- Verify email authentication settings
- Clear browser cache and cookies

### Recipe Loading Issues
**Problem**: No recipes appear or "(Error loading)"
**Solutions**:
- Check database permissions
- Verify recipes table exists and has data
- Check network connectivity

### Game Launch Problems
**Problem**: Game doesn't open or shows errors
**Solutions**:
- Ensure `index.html` exists in the same directory
- Check browser popup blocker settings
- Verify game files are properly configured

## 🎯 Best Practices for Testing

### 1. Systematic Testing
- Test all four scenarios for each recipe you want to validate
- Document any issues you find in the log
- Use the reset button between different test sessions

### 2. Focus Areas
- **New User Flow**: How intuitive is the first-time experience?
- **Completion Feedback**: What happens when users finish?
- **Return Experience**: How does the game handle completed users?
- **Authentication**: Are anonymous and verified experiences different?

### 3. Edge Cases
- Test with very old recipes
- Test with recipes that might have missing data
- Test rapid scenario switching
- Test multiple browser tabs

## 📈 Monitoring and Feedback

### What to Watch For
- **Loading Times**: How quickly do recipes load?
- **User State Accuracy**: Is the completion status correct?
- **Error Handling**: Are errors gracefully handled?
- **Visual Feedback**: Is it clear what state the user is in?

### Log Analysis
- **Blue Messages**: Normal operations
- **Green Messages**: Successful operations
- **Yellow Messages**: Warnings or partial failures
- **Red Messages**: Errors that need attention

## 🔗 Integration with Other Tools

### Admin Panel Links
The tool provides quick access to:
- **Admin Panel**: For user management and data viewing
- **Recipe Editor**: For creating and editing recipes
- **Original Playtest**: For date-specific recipe testing

### Workflow Integration
1. Use this tool for scenario testing
2. Use admin panel for data verification
3. Use recipe editor for content creation
4. Use original playtest for specific recipe debugging

## 💡 Advanced Usage

### URL Parameters
The tool passes these parameters to the game:
- `testMode=true`: Enables testing mode
- `scenario`: The selected scenario type
- `recipeId`: The specific recipe ID
- `selectedDate`: The recipe date

### Custom Scenarios
You can extend the tool by:
- Adding new scenario types in the JavaScript
- Modifying the setup functions for different test cases
- Adding custom logging for specific test metrics

## 🐛 Known Limitations

1. **Test User Creation**: May require email confirmation depending on Supabase settings
2. **Anonymous Sessions**: Browser-dependent, may not persist across restarts
3. **Database Permissions**: Some operations may fail without proper database permissions
4. **Browser Compatibility**: Modern browsers required for all features

## 📝 Feedback and Improvements

This tool is designed to be iterative. As you use it, consider:
- What additional scenarios would be helpful?
- What information is missing from the status panel?
- What would make the workflow more efficient?
- What error handling could be improved?

The goal is to make playtesting as smooth and comprehensive as possible while focusing on the core user experience variations that matter most for COMBO MEAL.