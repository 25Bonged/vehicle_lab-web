# Gemini File Search Enhanced Training Guide

This guide explains how to use the enhanced training pipeline that integrates Gemini File Search to enrich training data with relevant context from previous training materials.

## Overview

The enhanced training pipeline now:
1. **Retrieves relevant context** from previous training documents using Gemini File Search
2. **Enriches training examples** with this retrieved context to improve model learning
3. **Optionally uploads** processed documents to Gemini File Search for future use

## Prerequisites

1. **Gemini API Key**: Set `GEMINI_API_KEY` or `GOOGLE_API_KEY` environment variable
2. **Gemini File Search Store**: Set `GEMINI_FILE_SEARCH_STORE` environment variable with your store resource name
3. **Required packages**: Ensure `google-genai>=1.0.0` is installed

```bash
export GEMINI_API_KEY="your-api-key"
export GEMINI_FILE_SEARCH_STORE="projects/your-project/locations/us-central1/fileSearchStores/your-store"
```

## Basic Usage

### Training with Gemini Search Enabled (Default)

```bash
python training/train_from_pdfs.py \
    training/pdftrain \
    --model microsoft/DialoGPT-medium \
    --output-dir trained_models/my_model \
    --data-format instruction \
    --epochs 3 \
    --batch-size 4
```

This will:
- Extract text from PDFs in `training/pdftrain`
- Query Gemini File Search for relevant context from previous trainings
- Enrich each training example with retrieved context
- Train the model with enhanced data

### Training with Custom Gemini Search Settings

```bash
python training/train_from_pdfs.py \
    training/pdftrain \
    --model microsoft/DialoGPT-medium \
    --output-dir trained_models/my_model \
    --data-format instruction \
    --gemini-max-snippets 10 \
    --gemini-store-names store1 store2 \
    --epochs 3
```

### Uploading Processed PDFs to Gemini File Search

To upload processed PDFs for future training enrichment:

```bash
python training/train_from_pdfs.py \
    training/pdftrain \
    --model microsoft/DialoGPT-medium \
    --output-dir trained_models/my_model \
    --upload-to-gemini \
    --gemini-upload-store projects/your-project/locations/us-central1/fileSearchStores/your-store
```

### Disabling Gemini Search

If you want to train without Gemini Search enrichment:

```bash
python training/train_from_pdfs.py \
    training/pdftrain \
    --model microsoft/DialoGPT-medium \
    --output-dir trained_models/my_model \
    --no-gemini-search
```

## Advanced Usage

### Using Existing Extracted Data

If you've already extracted PDF text:

```bash
python training/train_from_pdfs.py \
    training/pdftrain \
    --model microsoft/DialoGPT-medium \
    --skip-extraction \
    --extraction-file extracted_pdfs.json \
    --use-gemini-search
```

### Using Existing Training Data

If you've already formatted training data:

```bash
python training/train_from_pdfs.py \
    training/pdftrain \
    --model microsoft/DialoGPT-medium \
    --skip-extraction \
    --skip-formatting \
    --training-data-file training_data.jsonl
```

## How It Works

### 1. Document-Level Context Retrieval

For each PDF document, the system:
- Creates a query from the filename and initial text content
- Queries Gemini File Search for relevant snippets from previous trainings
- Uses this context to enhance all training examples from that document

### 2. Example-Level Context Retrieval

For each training example (instruction/QA/conversational):
- Creates a query from the text content (first 200 characters)
- Retrieves relevant context snippets
- Prepends context to the output/answer

### 3. Context Format

Retrieved context is formatted as:

```
[Relevant context from previous trainings]:
[Gemini File Search snippets with citations]

[Current content]:
[Original training example content]
```

## Configuration Options

### TrainingDataCollector Parameters

```python
from training.data_collector import TrainingDataCollector

collector = TrainingDataCollector(
    output_dir=Path("training_data"),
    use_gemini_search=True,              # Enable/disable Gemini Search
    gemini_max_snippets=6,                # Max snippets per query
    gemini_store_names=None               # Specific stores (None = use defaults)
)
```

### Command-Line Arguments

- `--use-gemini-search`: Enable Gemini File Search (default: True)
- `--no-gemini-search`: Disable Gemini File Search
- `--gemini-max-snippets N`: Maximum snippets to retrieve (default: 6)
- `--gemini-store-names STORE1 STORE2`: Specific stores to query
- `--upload-to-gemini`: Upload processed PDFs to Gemini File Search
- `--gemini-upload-store STORE`: Specific store for uploading

## Benefits

1. **Better Context**: Training examples include relevant knowledge from previous trainings
2. **Improved Learning**: Models learn from accumulated knowledge, not just current documents
3. **Knowledge Continuity**: Previous training materials inform new training sessions
4. **Automatic Enrichment**: No manual curation needed - Gemini Search finds relevant content automatically

## Troubleshooting

### Gemini Search Not Working

1. Check environment variables:
   ```bash
   echo $GEMINI_API_KEY
   echo $GEMINI_FILE_SEARCH_STORE
   ```

2. Verify Gemini Search is available:
   ```python
   from bots.databot.gemini_file_search import GEMINI_FILE_SEARCH_ENABLED
   print(GEMINI_FILE_SEARCH_ENABLED)
   ```

3. Check logs for warnings about Gemini Search failures

### No Context Retrieved

- Ensure previous training documents are uploaded to Gemini File Search
- Check that store names are correct
- Verify API key has File Search permissions
- Increase `--gemini-max-snippets` if needed

### Training Data Too Large

- Reduce `--gemini-max-snippets` to limit context size
- Use `--max-length` to limit sequence length
- Consider disabling Gemini Search for very large datasets

## Example Workflow

1. **Initial Training** (without Gemini Search):
   ```bash
   python training/train_from_pdfs.py training/pdftrain/01_DRIVABILITY \
       --model microsoft/DialoGPT-medium \
       --output-dir trained_models/v1 \
       --upload-to-gemini
   ```

2. **Subsequent Training** (with Gemini Search enrichment):
   ```bash
   python training/train_from_pdfs.py training/pdftrain/02_START \
       --model microsoft/DialoGPT-medium \
       --output-dir trained_models/v2 \
       --use-gemini-search \
       --upload-to-gemini
   ```

The second training will automatically retrieve relevant context from the first training's documents!

## Best Practices

1. **Upload First**: Always use `--upload-to-gemini` when processing new documents
2. **Start Small**: Begin with `--gemini-max-snippets 3-4` and increase if needed
3. **Monitor Context**: Check training data files to see how context is being added
4. **Store Organization**: Use separate stores for different document types if needed
5. **Iterative Training**: Each training session improves future sessions through Gemini Search

## Integration with Existing Code

The enhanced `TrainingDataCollector` is backward compatible. Existing code will work without changes, but will benefit from Gemini Search if enabled:

```python
# Old code still works
collector = TrainingDataCollector()
examples = collector.process_multiple_pdfs(pdf_data)

# New code with Gemini Search
collector = TrainingDataCollector(use_gemini_search=True)
examples = collector.process_multiple_pdfs(pdf_data)
```

