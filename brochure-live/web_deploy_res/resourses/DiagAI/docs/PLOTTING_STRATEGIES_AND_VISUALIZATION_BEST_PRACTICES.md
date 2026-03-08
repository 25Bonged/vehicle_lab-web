# Plotting Strategies and Visualization Best Practices

## Overview

This document provides comprehensive strategies and best practices for creating effective visualizations in vehicle diagnostics analysis. It covers plot types, design principles, interactive features, and domain-specific visualization techniques.

## Table of Contents

1. [Fundamental Plotting Principles](#fundamental-plotting-principles)
2. [Plot Types and Use Cases](#plot-types-and-use-cases)
3. [Multi-Signal Visualization](#multi-signal-visualization)
4. [Time Domain Visualization](#time-domain-visualization)
5. [Frequency Domain Visualization](#frequency-domain-visualization)
6. [Statistical Visualization](#statistical-visualization)
7. [Interactive Features](#interactive-features)
8. [Domain-Specific Visualizations](#domain-specific-visualizations)
9. [Plot Quality Guidelines](#plot-quality-guidelines)
10. [Performance Optimization](#performance-optimization)

---

## Fundamental Plotting Principles

### Clarity and Readability

#### Color Selection
- **Use Colorblind-Friendly Palettes**: Avoid red-green combinations, use blue-orange or blue-purple
- **Consistent Color Mapping**: Use same colors for same signals across plots
- **Contrast**: Ensure sufficient contrast between plot elements and background
- **Color Meaning**: Use intuitive colors (red = warning/error, green = normal, blue = reference)

#### Typography
- **Font Size**: Minimum 12pt for labels, 14pt for titles
- **Font Style**: Use sans-serif fonts (Arial, Helvetica) for clarity
- **Label Clarity**: Use descriptive labels with units (e.g., "Engine RPM [rpm]")
- **Legend Placement**: Place legends outside plot area when possible

#### Layout
- **Aspect Ratio**: Use 16:9 or 4:3 for standard plots, adjust for specific needs
- **Margins**: Leave adequate margins (10-15% of plot area)
- **Grid**: Use light grid lines for easier reading (alpha = 0.3)
- **White Space**: Don't overcrowd plots, use subplots for multiple signals

### Information Density

#### Balance Detail and Clarity
- **Data Points**: Limit to 10,000-50,000 points for performance (use downsampling)
- **Downsampling Methods**:
  - **LTTB (Largest-Triangle-Three-Buckets)**: Best visual quality, preserves trends
  - **Stride**: Simple decimation, faster but may lose important details
  - **Peak Preservation**: Keep local maxima/minima when downsampling
- **Zoom Levels**: Provide multiple zoom levels for detailed analysis

#### Annotation Strategy
- **Key Points**: Annotate important events (peaks, transitions, anomalies)
- **Statistics**: Overlay mean, min, max lines with annotations
- **Thresholds**: Mark critical thresholds (e.g., idle RPM range, torque limits)
- **Events**: Mark significant events (gear changes, DTC occurrences)

---

## Plot Types and Use Cases

### Line Plots

#### Use Cases
- **Time Series Data**: Signal evolution over time
- **Trend Analysis**: Long-term trends and patterns
- **Comparison**: Multiple signals on same time axis

#### Best Practices
- **Line Width**: 1.5-2px for main signals, 1px for reference lines
- **Line Style**: Solid for main signals, dashed for references/thresholds
- **Markers**: Use markers sparingly (every Nth point) to avoid clutter
- **Multiple Signals**: Use different colors and line styles, add legend

#### Example Applications
- RPM, torque, speed over time
- Lambda sensor readings
- Gear position changes
- Temperature profiles

### Scatter Plots

#### Use Cases
- **Correlation Analysis**: Relationship between two signals
- **Map Visualization**: Engine maps (RPM vs. torque)
- **Distribution Analysis**: Data distribution patterns
- **Hysteresis Detection**: Different paths for increasing/decreasing values

#### Best Practices
- **Point Size**: Adjust based on data density (smaller for dense data)
- **Transparency**: Use alpha = 0.5-0.7 for overlapping points
- **Color Mapping**: Use color for third dimension (e.g., temperature, load)
- **Trend Lines**: Add regression lines with R² values

#### Example Applications
- Pedal map (pedal position vs. torque)
- Engine map (RPM vs. torque)
- Lambda vs. fuel injection
- Speed vs. gear position

### Histograms

#### Use Cases
- **Distribution Analysis**: Signal value distribution
- **Frequency Analysis**: Occurrence frequency of values
- **Outlier Detection**: Identify unusual value ranges
- **Statistical Summary**: Visual representation of statistics

#### Best Practices
- **Bin Count**: 30-50 bins for most signals, adjust based on data range
- **Normalization**: Use density normalization for comparison
- **Overlay**: Overlay normal distribution for comparison
- **Statistics**: Annotate mean, median, std dev on plot

#### Example Applications
- RPM distribution
- Torque distribution
- Speed distribution
- Lambda distribution

### Heatmaps

#### Use Cases
- **2D Maps**: Engine maps (RPM vs. torque with color-coded values)
- **Correlation Matrices**: Signal correlation visualization
- **Time-Frequency Analysis**: Spectrograms
- **Multi-Dimensional Data**: Color-coded third dimension

#### Best Practices
- **Color Scale**: Use perceptually uniform colormaps (viridis, plasma)
- **Colorbar**: Always include colorbar with units and scale
- **Interpolation**: Use smooth interpolation for continuous data
- **Contour Lines**: Add contour lines for precise value reading

#### Example Applications
- BSFC maps (fuel consumption)
- Engine efficiency maps
- Correlation matrices
- Spectrograms (time-frequency)

### Box Plots

#### Use Cases
- **Distribution Comparison**: Compare distributions across groups
- **Outlier Visualization**: Show outliers clearly
- **Statistical Summary**: Quartiles, median, outliers
- **Grouped Analysis**: Compare by gear, condition, etc.

#### Best Practices
- **Orientation**: Use horizontal for many groups, vertical for few groups
- **Outliers**: Mark outliers distinctly (different color/marker)
- **Notches**: Use notched boxes to show confidence intervals
- **Grouping**: Group related categories together

#### Example Applications
- Torque by gear
- RPM by operating condition
- Fuel consumption by cycle phase
- Emissions by test condition

---

## Multi-Signal Visualization

### Dual-Axis Plots

#### Use Cases
- **Different Units**: Signals with different units/scales
- **Related Signals**: Signals that should be compared but have different scales
- **Reference Overlay**: Overlay reference signal on main signal

#### Best Practices
- **Color Coding**: Use different colors for left/right axes
- **Legend**: Clearly indicate which axis applies to which signal
- **Scale Alignment**: Align zero lines when possible
- **Axis Labels**: Clearly label both axes with units

#### Example Applications
- Torque (left) vs. RPM (right)
- Speed (left) vs. Gear (right)
- Lambda (left) vs. Fuel injection (right)
- Temperature (left) vs. Pressure (right)

### Subplot Arrangements

#### Layout Strategies
- **Vertical Stack**: For time-aligned signals (shared X-axis)
- **Grid Layout**: For multiple independent analyses
- **Custom Layout**: For specific analysis needs

#### Best Practices
- **Shared Axes**: Share X-axis for time-aligned signals
- **Consistent Scales**: Use same Y-axis scale for comparable signals
- **Title Each Subplot**: Clear titles for each subplot
- **Spacing**: Adequate spacing between subplots

#### Example Applications
- Multi-signal time series (RPM, torque, speed, gear)
- Frequency domain analysis (FFT, PSD, spectrogram)
- Before/after comparisons
- Multi-file analysis

### Overlay Plots

#### Use Cases
- **Comparison**: Compare multiple conditions on same plot
- **Reference**: Overlay reference/target values
- **Thresholds**: Show acceptable ranges

#### Best Practices
- **Transparency**: Use transparency for overlapping areas
- **Line Styles**: Use different line styles (solid, dashed, dotted)
- **Fill Areas**: Use filled areas for ranges/thresholds
- **Legend**: Clear legend for all elements

#### Example Applications
- Actual vs. target signals
- Multiple test runs comparison
- Operating range visualization
- Before/after calibration comparison

---

## Time Domain Visualization

### Signal Evolution Plots

#### Key Elements
- **Time Axis**: Clear time axis with appropriate units (seconds, minutes, hours)
- **Signal Lines**: Clear signal lines with appropriate colors
- **Annotations**: Mark important events (gear changes, DTCs, anomalies)
- **Statistics Overlay**: Mean, min, max lines with annotations

#### Best Practices
- **Time Range**: Show appropriate time range (not too compressed or expanded)
- **Sampling**: Downsample for long time ranges (> 1 hour)
- **Events**: Mark events with vertical lines and labels
- **Zoom**: Provide zoom capability for detailed analysis

### Transient Analysis Plots

#### Step Response Visualization
- **Rise Time**: Mark 10% and 90% points
- **Settling Time**: Mark 2% tolerance band
- **Overshoot**: Highlight maximum overshoot
- **Steady State**: Mark steady-state value

#### Transient Event Marking
- **Event Start**: Mark with vertical line
- **Response Phases**: Mark different phases (rise, overshoot, settling)
- **Metrics**: Annotate key metrics (rise time, settling time, overshoot)

### Multi-File Comparison

#### Overlay Strategy
- **Color Coding**: Different colors for different files
- **Transparency**: Use transparency for overlapping signals
- **Legend**: Clear legend with file identifiers
- **Statistics**: Compare statistics across files

---

## Frequency Domain Visualization

### FFT Plots

#### Key Elements
- **Frequency Axis**: Clear frequency axis (Hz) with appropriate range
- **Amplitude Axis**: Amplitude or power axis with units
- **Peak Marking**: Mark dominant frequencies with annotations
- **Nyquist Frequency**: Mark Nyquist frequency limit

#### Best Practices
- **Log Scale**: Use log scale for amplitude (dB) when appropriate
- **Frequency Range**: Show relevant frequency range (0 to Nyquist)
- **Peak Detection**: Automatically detect and annotate peaks
- **Window Function**: Indicate window function used (Hanning, Hamming, etc.)

### Power Spectral Density (PSD) Plots

#### Key Elements
- **Frequency Axis**: Frequency axis (Hz or rad/s)
- **Power Density**: Power spectral density with units
- **Log Scale**: Often use log scale for better visualization
- **Peak Marking**: Mark significant peaks

#### Best Practices
- **Scale**: Use appropriate scale (linear or log)
- **Smoothing**: Apply smoothing if needed (Welch's method)
- **Units**: Clear units (dB/Hz, V²/Hz, etc.)
- **Reference**: Include reference levels if applicable

### Spectrograms

#### Key Elements
- **Time Axis**: X-axis for time
- **Frequency Axis**: Y-axis for frequency
- **Color Mapping**: Color represents power/amplitude
- **Colorbar**: Colorbar with scale and units

#### Best Practices
- **Window Size**: Appropriate window size for resolution
- **Overlap**: Adequate overlap for smooth visualization
- **Colormap**: Use perceptually uniform colormap
- **Time Resolution**: Balance time and frequency resolution

---

## Statistical Visualization

### Distribution Plots

#### Histogram + KDE Overlay
- **Histogram**: Show actual data distribution
- **KDE Curve**: Overlay kernel density estimate
- **Normal Distribution**: Overlay normal distribution for comparison
- **Statistics**: Annotate mean, median, std dev

#### Box Plot + Violin Plot
- **Box Plot**: Show quartiles and outliers
- **Violin Plot**: Show distribution shape
- **Combination**: Use both for comprehensive view

### Correlation Visualization

#### Correlation Matrix Heatmap
- **Color Coding**: Use color to represent correlation strength
- **Values**: Include correlation coefficients in cells
- **Symmetry**: Show symmetric matrix (upper/lower triangle)
- **Clustering**: Optionally cluster similar correlations

#### Scatter Plot Matrix
- **Diagonal**: Show distributions (histograms)
- **Off-Diagonal**: Show scatter plots with trend lines
- **Color Coding**: Use color for grouping (if applicable)

### Statistical Summary Plots

#### Bar Charts with Error Bars
- **Bars**: Represent mean values
- **Error Bars**: Show standard deviation or confidence intervals
- **Grouping**: Group related categories
- **Labels**: Clear labels with units

---

## Interactive Features

### Zoom and Pan

#### Implementation
- **Zoom**: Mouse wheel or zoom box
- **Pan**: Click and drag
- **Reset**: Button to reset zoom
- **Zoom History**: Navigate zoom history

#### Best Practices
- **Smooth Zoom**: Smooth zoom transitions
- **Axis Limits**: Maintain appropriate axis limits
- **Performance**: Optimize for large datasets

### Hover Tooltips

#### Information Display
- **Signal Values**: Show exact values at cursor
- **Time/Index**: Show time or index
- **Statistics**: Show local statistics
- **Metadata**: Show signal metadata (units, source)

#### Best Practices
- **Formatting**: Format numbers appropriately (decimals, units)
- **Positioning**: Position tooltip to avoid obscuring data
- **Performance**: Optimize for real-time updates

### Selection and Filtering

#### Interactive Filtering
- **Brush Selection**: Select data ranges
- **Filter Application**: Apply filters to other plots
- **Linked Views**: Link multiple plots for coordinated filtering

### Export Capabilities

#### Export Formats
- **PNG**: High-resolution static images
- **PDF**: Vector graphics for reports
- **SVG**: Scalable vector graphics
- **CSV**: Export underlying data

---

## Domain-Specific Visualizations

### Engine Map Visualization

#### BSFC Maps
- **X-Axis**: Engine RPM
- **Y-Axis**: Engine torque
- **Color**: BSFC (Brake Specific Fuel Consumption)
- **Contour Lines**: BSFC contour lines
- **Operating Points**: Overlay actual operating points

#### Efficiency Maps
- **Layout**: Similar to BSFC maps
- **Color**: Efficiency (thermal, mechanical)
- **Optimal Region**: Highlight optimal operating region
- **Load Lines**: Overlay typical load lines

### Drivability Visualization

#### Anti-Jerk Analysis Plots
- **Time Domain**: Torque signal with jerk overlay (dual-axis)
- **Frequency Domain**: FFT showing oscillation frequencies
- **Phase Plot**: Torque vs. torque rate (phase portrait)
- **Metrics Overlay**: Rise time, settling time, overshoot annotations

#### Pedal Map Plots
- **Scatter Plot**: Pedal position vs. torque
- **Hysteresis**: Different colors for increasing/decreasing pedal
- **Linear Fit**: Overlay linear fit with R²
- **Deadband**: Highlight deadband region

### Transmission Visualization

#### Gear Usage Plots
- **Bar Chart**: Time spent in each gear
- **Pie Chart**: Percentage distribution
- **Heatmap**: Gear vs. speed/load conditions
- **Gear Change Frequency**: Histogram of gear change frequency

#### Shift Quality Plots
- **Shift Events**: Mark shift events on time series
- **Shift Duration**: Bar chart of shift durations
- **Shift Jerk**: Histogram of shift jerk values
- **Shift Timing**: RPM at shift point distribution

### Emissions Visualization

#### WLTP Cycle Visualization
- **Cycle Trace**: Speed vs. time with cycle phases
- **Phase Analysis**: Separate plots for each phase
- **Emissions Overlay**: Overlay emissions on cycle trace
- **Compliance Indicators**: Visual indicators for compliance

#### Emissions Maps
- **NOx Map**: NOx emissions vs. operating conditions
- **CO2 Map**: CO2 emissions map
- **Compliance Regions**: Highlight compliant/non-compliant regions

---

## Plot Quality Guidelines

### Visual Quality

#### Resolution
- **Minimum**: 1200x600 pixels for standard plots
- **High Quality**: 2400x1200 pixels for publications
- **DPI**: 150 DPI minimum, 300 DPI for print

#### Anti-Aliasing
- **Enable**: Always enable anti-aliasing
- **Smoothing**: Smooth lines and curves
- **Text**: Clear, readable text rendering

### Data Quality

#### Accuracy
- **Precision**: Appropriate decimal places (not excessive)
- **Units**: Always include units in labels
- **Scale**: Use appropriate scales (avoid misleading scales)

#### Completeness
- **Missing Data**: Clearly indicate missing data (gaps, NaN markers)
- **Data Range**: Show full data range or indicate truncation
- **Sampling**: Indicate sampling rate if relevant

### Professional Appearance

#### Consistency
- **Style**: Consistent style across all plots
- **Colors**: Consistent color scheme
- **Fonts**: Consistent font family and sizes
- **Layout**: Consistent layout and spacing

#### Branding (if applicable)
- **Logo**: Include logo if required
- **Colors**: Use brand colors if specified
- **Style Guide**: Follow style guide if available

---

## Performance Optimization

### Data Handling

#### Downsampling Strategies
- **LTTB Algorithm**: Best visual quality, O(n) complexity
- **Peak Preservation**: Keep important points (peaks, valleys)
- **Adaptive Sampling**: Higher density in regions of interest
- **Time-Based**: Sample based on time intervals for long datasets

#### Memory Management
- **Streaming**: Stream data for very large datasets
- **Chunking**: Process data in chunks
- **Caching**: Cache processed data for repeated plots

### Rendering Optimization

#### Plot Complexity
- **Point Limit**: Limit to 10,000-50,000 points per plot
- **Line Simplification**: Simplify lines for faster rendering
- **Lazy Loading**: Load data on demand

#### Interactive Performance
- **Debouncing**: Debounce interactive updates
- **Throttling**: Throttle frequent updates
- **Progressive Rendering**: Render progressively for large datasets

---

## Best Practices Summary

### Do's ✅
- Use clear, descriptive labels with units
- Choose appropriate plot types for data
- Use colorblind-friendly color palettes
- Include legends for multi-signal plots
- Annotate important events and statistics
- Downsample large datasets appropriately
- Use consistent styling across plots
- Provide interactive features (zoom, pan, tooltips)
- Export in multiple formats (PNG, PDF, SVG)

### Don'ts ❌
- Don't use misleading scales or axes
- Don't overcrowd plots with too much information
- Don't use red-green color combinations
- Don't forget to include units in labels
- Don't use excessive decimal places
- Don't render too many data points (> 50,000)
- Don't use inconsistent styling
- Don't omit legends for multi-signal plots
- Don't forget to handle missing data

---

## Conclusion

Effective plotting in vehicle diagnostics requires:
- **Understanding Data**: Know your data and what you want to show
- **Choosing Right Plot Type**: Match plot type to analysis goal
- **Following Best Practices**: Apply design principles consistently
- **Optimizing Performance**: Handle large datasets efficiently
- **Providing Interactivity**: Enable users to explore data
- **Maintaining Quality**: Ensure professional appearance

By following these strategies and best practices, you can create visualizations that effectively communicate diagnostic insights and support engineering decision-making.

