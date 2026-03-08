# Enhanced Pattern Matching - MATLAB & CSS Electronics Integration

## Overview

This document describes the enhanced pattern matching system inspired by MATLAB's pattern matching capabilities and CSS Electronics CAN bus signal patterns. The system provides improved signal extraction, query recognition, and DBC file parsing.

## Key Features

### 1. MATLAB-Style Pattern Matching

The new `utils/pattern_matcher.py` module provides MATLAB-inspired pattern matching functions:

#### `wildcardPattern(pattern, min_length, max_length, case_insensitive)`
- Flexible wildcard matching with `*` and `?`
- Supports length constraints
- Case-insensitive by default

**Example:**
```python
from utils.pattern_matcher import wildcardPattern

pattern = wildcardPattern("CAN_*_SPEED")
matches = pattern.findall("CAN_VEHICLE_SPEED and CAN_ENGINE_SPEED")
# Returns: ['CAN_VEHICLE_SPEED', 'CAN_ENGINE_SPEED']
```

#### `caseInsensitivePattern(pattern)`
- Case-insensitive pattern matching
- Useful for matching signal names regardless of case

**Example:**
```python
from utils.pattern_matcher import caseInsensitivePattern

pattern = caseInsensitivePattern("rpm")
matches = pattern.findall("RPM is 3000, rpm is also 3000")
# Returns: ['RPM', 'rpm']
```

#### `possessivePattern(pattern, case_insensitive)`
- Non-backtracking patterns for improved performance
- Once matched, doesn't backtrack to find alternative matches
- Useful for large text processing

**Example:**
```python
from utils.pattern_matcher import possessivePattern

pattern = possessivePattern("CAN_.*_SPEED")
# Efficiently matches without backtracking
```

### 2. CSS Electronics CAN Bus Patterns

The `CANBusPatternMatcher` class provides patterns for common CAN bus signal naming conventions:

#### Signal Type Detection
- Automatically categorizes signals (engine_speed, vehicle_speed, torque, etc.)
- Supports multiple OEM naming conventions
- Handles J1939, OBD-II, and generic CAN patterns

**Example:**
```python
from utils.pattern_matcher import CANBusPatternMatcher

matcher = CANBusPatternMatcher()
signal_types = matcher.match_signal_type("CAN_VEHICLE_SPEED")
# Returns: ['vehicle_speed']
```

#### Message ID Extraction
- Extracts hex (0x123) and decimal message IDs
- Supports various CAN protocol formats

#### DBC Signal Extraction
- Enhanced DBC file parsing patterns
- Handles variations in DBC format

### 3. Enhanced Signal Extractor

The `EnhancedSignalExtractor` class combines MATLAB-style patterns with CAN bus patterns:

```python
from utils.pattern_matcher import EnhancedSignalExtractor

extractor = EnhancedSignalExtractor()
signals = extractor.extract_signals(
    "The CAN_VEHICLE_SPEED signal shows 80 km/h. RPM_ENGINE is 2500.",
    use_wildcards=True
)
# Returns list of signals with metadata (name, type, source, position)
```

## Integration Points

### 1. Automotive Document Processor

**File:** `training/automotive_document_processor.py`

**Enhancements:**
- Uses enhanced pattern matching for signal extraction from PDFs, DOCX, PPTX
- MATLAB-style wildcard patterns for common signals
- CAN bus pattern recognition
- Improved signal categorization

**Benefits:**
- Better signal extraction from technical documents
- More accurate signal type detection
- Support for multiple OEM naming conventions

### 2. Agent Pattern Matching

**File:** `bots/databot/agent.py`

**Enhancements:**
- Enhanced `_extract_signal_names()` function
- Uses wildcard patterns for flexible signal matching
- Case-insensitive pattern matching
- Better handling of DBC format signals

**Benefits:**
- Improved query recognition
- Better signal name extraction from user queries
- Support for various signal naming formats

### 3. DBC File Parsing

**Files:** 
- `scripts/decode_dbc_signals.py`
- `scripts/decode_and_index_dbc_signals.py`

**Enhancements:**
- Enhanced regex patterns for BO_ (message) and SG_ (signal) definitions
- Support for hex message IDs (0x format)
- Case-insensitive parsing
- More flexible format handling

**Benefits:**
- Better DBC file compatibility
- Support for more DBC file variations
- Improved error handling

## Pattern Examples

### MATLAB-Style Patterns

```python
# Wildcard pattern
pattern = wildcardPattern("CAN_*_SPEED")
# Matches: CAN_VEHICLE_SPEED, CAN_ENGINE_SPEED, CAN_WHEEL_SPEED

# Case-insensitive pattern
pattern = caseInsensitivePattern("rpm")
# Matches: RPM, rpm, Rpm, RPM_ENGINE, etc.

# Possessive pattern (performance optimized)
pattern = possessivePattern("CAN_.*_SPEED")
# Efficiently matches without backtracking
```

### CAN Bus Patterns

```python
# Signal type detection
matcher = CANBusPatternMatcher()
types = matcher.match_signal_type("CAN_VEHICLE_SPEED")
# Returns: ['vehicle_speed']

# Message ID extraction
message_ids = matcher.extract_message_id("Message ID 0x123 or 456")
# Returns: ['0x123', '456']

# DBC signal extraction
dbc_signals = matcher.extract_dbc_signals("BO_ 123 MessageName : 8 Sender")
# Returns list of DBC signal definitions
```

## Performance Improvements

1. **Possessive Patterns**: Non-backtracking patterns improve performance for large text processing
2. **Pattern Caching**: `@lru_cache` decorator for frequently used patterns
3. **Compiled Patterns**: Patterns are compiled once and reused
4. **Early Exit**: Pattern matching stops at first match when appropriate

## Usage Examples

### Basic Signal Extraction

```python
from utils.pattern_matcher import extract_signal_names

signals = extract_signal_names(
    "The CAN_VEHICLE_SPEED is 80 km/h and RPM_ENGINE is 2500",
    use_enhanced=True
)
# Returns: ['CAN_VEHICLE_SPEED', 'RPM_ENGINE']
```

### Document Processing

```python
from training.automotive_document_processor import AutomotiveSignalExtractor

extractor = AutomotiveSignalExtractor()
signals = extractor.extract_from_text(
    "Engine speed (RPM) is measured at the crankshaft...",
    source="document.pdf"
)
# Returns set of extracted signal names
```

### Query Processing

```python
from bots.databot.agent import _extract_signal_names

signals = _extract_signal_names(
    "What is the RPM and vehicle speed?",
    use_enhanced=True
)
# Returns: ['RPM_ENGINE', 'CAN_VEHICLE_SPEED', ...]
```

## Benefits Summary

1. **Better Signal Recognition**: Improved pattern matching for various signal naming conventions
2. **OEM Compatibility**: Support for multiple OEM naming patterns (BMW, VW/Audi, Mercedes, etc.)
3. **Performance**: Possessive patterns and caching improve processing speed
4. **Flexibility**: Wildcard patterns allow flexible matching
5. **Accuracy**: Enhanced DBC parsing with better format support
6. **Maintainability**: Centralized pattern matching logic in `utils/pattern_matcher.py`

## Future Enhancements

1. **Machine Learning Integration**: Use ML models for signal type classification
2. **Pattern Learning**: Learn new patterns from user feedback
3. **Multi-language Support**: Enhanced support for non-English signal names
4. **Pattern Validation**: Validate patterns against known signal databases
5. **Performance Monitoring**: Track pattern matching performance metrics

## References

- MATLAB Pattern Matching Documentation: https://www.mathworks.com/help/matlab/ref/pattern.html
- CSS Electronics CAN Bus Resources: https://www.csselectronics.com/
- DBC File Format Specification: Various automotive industry standards

