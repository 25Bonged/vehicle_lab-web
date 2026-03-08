# Training Gemini File Search with Advanced Diagnostics and Plotting Knowledge

## Overview

This guide explains how to enhance Gemini File Search with comprehensive knowledge about:
- **Advanced Vehicle Diagnostics Analysis Strategies**
- **Plotting Strategies and Visualization Best Practices**

By uploading these knowledge documents to Gemini File Search stores, the AI agent will be able to retrieve contextual information about diagnostic methodologies and visualization techniques when answering user queries.

## Prerequisites

1. **Gemini API Key**: Set `GEMINI_API_KEY` or `GOOGLE_API_KEY` environment variable
2. **Gemini File Search Stores**: Configured stores for different knowledge domains
3. **Required packages**: `google-genai>=1.0.0` (already in requirements.txt)

## Knowledge Documents Created

### 1. Advanced Vehicle Diagnostics Analysis Strategies
**File**: `docs/ADVANCED_VEHICLE_DIAGNOSTICS_ANALYSIS_STRATEGIES.md`

**Content**:
- Engine Diagnostics (SI/CI engines)
- Transmission Analysis (gear hunting, shift quality)
- Drivability Analysis (anti-jerk, torque filter, pedal map)
- Emissions and Compliance (WLTP, OBD-II)
- Multi-Agent Orchestration strategies
- Signal Processing Techniques
- Anomaly Detection Strategies
- Root Cause Analysis methodologies

**Target Store**: Vehicle Analysis store

### 2. Plotting Strategies and Visualization Best Practices
**File**: `docs/PLOTTING_STRATEGIES_AND_VISUALIZATION_BEST_PRACTICES.md`

**Content**:
- Fundamental Plotting Principles
- Plot Types and Use Cases
- Multi-Signal Visualization
- Time Domain Visualization
- Frequency Domain Visualization
- Statistical Visualization
- Interactive Features
- Domain-Specific Visualizations
- Plot Quality Guidelines
- Performance Optimization

**Target Store**: MATLAB Methodology store

## Automatic Upload System ✅

**NEW**: The system now automatically uploads knowledge documents! No manual steps needed.

### How It Works

1. **On Server Startup**: When the Flask app starts, it automatically scans the `docs/` directory and uploads any new knowledge documents to Gemini File Search stores.

2. **Automatic Categorization**: Documents are automatically categorized based on filename and content:
   - **Vehicle Analysis**: Documents with "diagnostic", "drivability", "vehicle", "fleet", "analysis", "agent" keywords
   - **MATLAB**: Documents with "plot", "visualization", "matlab", "function", "plotting", "graph" keywords
   - **Calibration**: Documents with "calibration", "tuning", "map", "cal" keywords
   - **SI/CI Engine**: Documents with "si", "ci", "engine", "spark", "ignition", "diesel", "gasoline" keywords

3. **Duplicate Prevention**: The system tracks uploaded files to avoid duplicate uploads. Files are only re-uploaded if they've been modified.

4. **Store Mapping**: Documents are automatically uploaded to the appropriate Gemini File Search store based on category.

### Manual Upload (Optional)

If you want to manually upload or force re-upload:

```bash
# Set environment variables (if not already set)
export GEMINI_API_KEY='your-api-key-here'
export GEMINI_FILE_SEARCH_STORE_VEHICLE='projects/.../fileSearchStores/vehicle-analysis'
export GEMINI_FILE_SEARCH_STORE_MATLAB='projects/.../fileSearchStores/matlab-methodology'
export GEMINI_FILE_SEARCH_STORE='projects/.../fileSearchStores/main-store'

# Run manual upload script
python scripts/upload_diagnostics_plotting_knowledge.py
```

### Adding New Knowledge Documents

**Just add files to `docs/` directory!**

1. Create or update markdown (`.md`) or PDF (`.pdf`) files in the `docs/` directory
2. Use descriptive filenames with relevant keywords (e.g., `ADVANCED_DIAGNOSTICS_ANALYSIS.md`, `PLOTTING_BEST_PRACTICES.md`)
3. Restart the server or wait for next startup
4. Documents will be automatically uploaded and indexed

**That's it!** No manual steps required.

## How It Works

### Knowledge Retrieval

When users ask questions about diagnostics or plotting, Gemini File Search will:
1. **Query Analysis**: Analyze the user query to identify relevant topics
2. **Knowledge Retrieval**: Search uploaded documents for relevant snippets
3. **Context Injection**: Inject retrieved knowledge into the AI prompt
4. **Enhanced Response**: AI provides answers grounded in the knowledge base

### Example Queries That Benefit

**Diagnostics Queries**:
- "How do I analyze anti-jerk control?"
- "What's the best way to detect gear hunting?"
- "How should I perform lambda control analysis?"
- "What metrics should I use for shift quality analysis?"

**Plotting Queries**:
- "What's the best way to visualize engine maps?"
- "How should I create multi-signal plots?"
- "What plotting strategies work best for drivability analysis?"
- "How do I create effective FFT visualizations?"

## Store Configuration

The knowledge documents are uploaded to specialized stores:

| Category | Store | Documents |
|----------|-------|-----------|
| Vehicle Analysis | `GEMINI_FILE_SEARCH_STORE_VEHICLE` | Diagnostics strategies, drivability analysis |
| MATLAB Methodology | `GEMINI_FILE_SEARCH_STORE_MATLAB` | Plotting strategies, visualization best practices |
| Calibration | `GEMINI_FILE_SEARCH_STORE` | Diagnostics strategies (also relevant for calibration) |

## Additional Documentation

The script can optionally upload additional relevant documentation:

**Vehicle Analysis Store**:
- `docs/DRIVABILITY_AGENT_ENHANCEMENTS.md`
- `docs/DRIVABILITY_AGENT_REVIEW.md`
- `docs/TOOL_COMPARISON_AND_GAPS.md`

**MATLAB Store**:
- `docs/FUNCTION_REVIEW_AND_FIXES.md`
- `docs/PLOT_INSIGHTS_ENHANCEMENT.md`
- `docs/LLM_PLOT_INTEGRATION_VERIFIED.md`

**Calibration Store**:
- `docs/ADVANCED_DIAG_AI_FEATURES.md`
- `docs/DATABOT_DIAGNOSTICS_STATUS.md`

## Verification

After uploading, test the knowledge retrieval:

```python
from bots.databot.gemini_file_search import get_file_search_context

# Test diagnostics knowledge
context = get_file_search_context(
    "How do I analyze anti-jerk control using FFT?",
    max_snippets=4
)
print(context)

# Test plotting knowledge
context = get_file_search_context(
    "What's the best way to create engine map visualizations?",
    max_snippets=4
)
print(context)
```

## Benefits

1. **Enhanced Context**: AI responses include relevant knowledge from documentation
2. **Consistent Methodology**: Standardized diagnostic and plotting approaches
3. **Best Practices**: AI recommends best practices from knowledge base
4. **Comprehensive Coverage**: Covers multiple domains (engine, transmission, drivability, emissions, plotting)

## Troubleshooting

### Store Not Found
**Error**: "No File Search store configured"

**Solution**: Set the appropriate environment variables:
```bash
export GEMINI_FILE_SEARCH_STORE_VEHICLE='...'
export GEMINI_FILE_SEARCH_STORE_MATLAB='...'
```

### API Key Error
**Error**: "GEMINI_API_KEY not set"

**Solution**: Set the API key:
```bash
export GEMINI_API_KEY='your-api-key'
```

### Store Full
**Error**: "Store full (1GB limit reached)"

**Solution**: 
- Delete old documents from the store
- Use a different store
- Contact Google Cloud support to increase limits

### Unsupported Format
**Warning**: "Unsupported MIME type"

**Solution**: Gemini File Search currently supports PDF files. Markdown files (.md) may need to be converted to PDF first, or the API may support them depending on version.

## Updating Knowledge

To update the knowledge base:

1. **Edit Documents**: Modify the markdown files in `docs/`
2. **Re-upload**: Run the upload script again
3. **Wait for Re-indexing**: Gemini File Search will re-index updated documents

## Best Practices

1. **Regular Updates**: Update knowledge documents as methodologies evolve
2. **Version Control**: Keep knowledge documents in version control
3. **Testing**: Test knowledge retrieval after updates
4. **Documentation**: Keep knowledge documents well-structured and comprehensive
5. **Categorization**: Upload documents to appropriate stores for better retrieval

## Conclusion

By training Gemini File Search with advanced diagnostics and plotting knowledge, you enhance the AI agent's ability to provide contextual, accurate, and comprehensive answers about vehicle diagnostics analysis and visualization strategies. The knowledge base serves as a reference that the AI can retrieve and incorporate into its responses, ensuring consistent and high-quality diagnostic guidance.

