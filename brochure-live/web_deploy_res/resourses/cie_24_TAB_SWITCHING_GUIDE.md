# Tab Switching Guide

## ✅ Tab Switching - Enhanced & Verified

### Available Tabs

1. **Dashboard** (`data-page="dashboard"`) → `page-dashboard`
2. **Data Management** (`data-page="data-management"`) → `page-data-management`
3. **Model Training** (`data-page="training"`) → `page-training`
4. **Prediction** (`data-page="prediction"`) → `page-prediction`
5. **Optimization** (`data-page="optimization"`) → `page-optimization`
6. **Calibration Maps** (`data-page="maps"`) → `page-maps`
7. **Advanced DoE** (`data-page="doe"`) → `page-doe`
8. **Analytics** (`data-page="analytics"`) → `page-analytics`
9. **Collaboration** (`data-page="collaboration"`) → `page-collaboration`
10. **Dynamic DoE** (`data-page="doe-enhanced"`) → `page-doe-enhanced`
11. **Data & Modeling** (`data-page="data-enhanced"`) → `page-data-enhanced`
12. **Production** (`data-page="optimization-enhanced"`) → `page-optimization-enhanced`

### How Tab Switching Works

1. **Navigation Binding**: `bindNavigation()` attaches click handlers to all `.nav-item` buttons
2. **Page Switching**: `switchPage(page)` handles the actual switching:
   - Removes `active` class from all nav items
   - Adds `active` class to clicked nav item
   - Hides all pages (removes `active` class)
   - Shows target page (adds `active` class)

### Enhanced Features

- ✅ Console logging for debugging
- ✅ Error handling with user notifications
- ✅ Validation of page existence
- ✅ Handles missing elements gracefully

### Testing

1. Open browser console (F12)
2. Click any tab
3. Check console for:
   - `Switching to page: XXX`
   - `Navigation button for "XXX" activated`
   - `Page "XXX" displayed`

### Troubleshooting

**If tabs don't switch:**

1. Check browser console (F12) for errors
2. Look for warning messages about missing pages
3. Verify the page name matches exactly
4. Check if JavaScript is enabled
5. Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

**Common Issues:**

- Page not found → Check if `page-{name}` div exists
- Button not found → Check if `data-page="{name}"` attribute exists
- JavaScript errors → Check console for syntax errors

---

**Status:** ✅ Tab switching is configured and ready to test!

