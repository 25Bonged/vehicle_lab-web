# LLM Training Module

Complete solution for collecting training data from PDFs and fine-tuning LLMs using LoRA.

## Features

- **PDF Text Extraction**: Extract text from PDF files using multiple backends (PyPDF2, pdfplumber, PyMuPDF)
- **Training Data Collection**: Format extracted text into training examples (instruction-following, Q&A, conversational)
- **LoRA Fine-tuning**: Efficiently fine-tune LLMs using Low-Rank Adaptation
- **Complete Pipeline**: End-to-end script from PDFs to trained model

## Installation

Install required dependencies:

```bash
pip install -r requirements.txt
```

For GPU support (recommended):
```bash
pip install torch --index-url https://download.pytorch.org/whl/cu118  # CUDA 11.8
```

For 4/8-bit quantization (saves memory, not available on macOS):
```bash
pip install bitsandbytes
```

## Quick Start

### 1. Extract Text from PDFs

```bash
python training/pdf_processor.py path/to/pdfs -o extracted_text.json
```

### 2. Format Training Data

```bash
python training/data_collector.py extracted_text.json -f instruction -o training_data.jsonl
```

### 3. Fine-tune Model

```bash
python training/lora_trainer.py \
    --model microsoft/DialoGPT-medium \
    --data training_data.jsonl \
    --format instruction \
    --epochs 3 \
    --batch-size 4 \
    --output trained_models
```

### 4. Complete Pipeline (All-in-One)

```bash
python training/train_from_pdfs.py path/to/pdfs \
    --model microsoft/DialoGPT-medium \
    --output-dir trained_models \
    --epochs 3 \
    --batch-size 4 \
    --data-format instruction
```

## Usage Examples

### Extract PDFs from Directory

```python
from training import PDFProcessor

processor = PDFProcessor()
results = processor.process_directory("path/to/pdfs", recursive=True)
```

### Create Training Data

```python
from training import TrainingDataCollector
import json

# Load extracted PDF data
with open("extracted_text.json") as f:
    pdf_data = json.load(f)

# Create training examples
collector = TrainingDataCollector()
examples = collector.process_multiple_pdfs(pdf_data, format_type="instruction")

# Save
collector.save_training_data(examples, filename="training_data.jsonl", format_type="jsonl")
```

### Fine-tune with LoRA

```python
from training import LoRATrainer

# Initialize trainer
trainer = LoRATrainer(
    model_name="microsoft/DialoGPT-medium",
    output_dir="trained_models"
)

# Load model and setup LoRA
trainer.load_model_and_tokenizer()
trainer.setup_lora(r=8, lora_alpha=16)

# Prepare dataset
dataset = trainer.prepare_dataset("training_data.jsonl", format_type="instruction")

# Train
trainer.train(dataset, num_epochs=3, batch_size=4)

# Save
trainer.save_model()
```

## Training Data Formats

### Instruction Format
```json
{
  "instruction": "Explain the following:",
  "input": "",
  "output": "Detailed explanation..."
}
```

### Q&A Format
```json
{
  "instruction": "What is RPM?",
  "input": "",
  "output": "RPM stands for Revolutions Per Minute..."
}
```

### Conversational Format
```json
{
  "messages": [
    {"role": "user", "content": "Tell me about engine diagnostics"},
    {"role": "assistant", "content": "Engine diagnostics involves..."}
  ]
}
```

## Model Recommendations

### Small Models (Fast, Lower Quality)
- `microsoft/DialoGPT-small` (~117M parameters)
- `microsoft/DialoGPT-medium` (~345M parameters)
- `gpt2` (~124M parameters)

### Medium Models (Balanced)
- `meta-llama/Llama-2-7b-chat-hf` (requires HuggingFace access)
- `mistralai/Mistral-7B-Instruct-v0.2`

### Large Models (Best Quality, Requires More Resources)
- `meta-llama/Llama-2-13b-chat-hf`
- `mistralai/Mixtral-8x7B-Instruct-v0.1`

## LoRA Configuration

- **r (rank)**: Lower = fewer parameters, faster training. Recommended: 4-16
- **lora_alpha**: Scaling parameter. Typically 2x the rank. Recommended: 8-32
- **lora_dropout**: Dropout rate. Recommended: 0.05-0.1

Example:
```python
trainer.setup_lora(
    r=8,              # Rank
    lora_alpha=16,    # Alpha (typically 2x rank)
    lora_dropout=0.05 # Dropout
)
```

## Memory Optimization

### Use Quantization (4-bit or 8-bit)
```bash
python training/train_from_pdfs.py pdfs/ \
    --model meta-llama/Llama-2-7b-chat-hf \
    --use-4bit \
    --batch-size 2
```

### Reduce Batch Size
```bash
--batch-size 1 --gradient-accumulation-steps 8
```

### Use Gradient Checkpointing
Add to training arguments in `lora_trainer.py`:
```python
training_args.gradient_checkpointing = True
```

## Loading Fine-tuned Models

### With PEFT
```python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

# Load base model
base_model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")

# Load LoRA adapter
model = PeftModel.from_pretrained(base_model, "trained_models/lora_adapter")
```

### Merge LoRA Weights (Optional)
```python
# Merge adapter into base model
model = model.merge_and_unload()
model.save_pretrained("merged_model")
```

## Troubleshooting

### Out of Memory
- Use `--use-4bit` or `--use-8bit`
- Reduce `--batch-size`
- Reduce `--max-length`
- Use a smaller model

### Slow Training
- Use GPU (CUDA)
- Increase `--batch-size` if memory allows
- Use gradient accumulation instead of large batches

### Poor Results
- Increase training data (more PDFs)
- Increase `--epochs`
- Adjust `--learning-rate` (try 1e-4 to 5e-4)
- Use a larger base model

## File Structure

```
training/
├── __init__.py              # Module exports
├── pdf_processor.py         # PDF text extraction
├── data_collector.py        # Training data formatting
├── lora_trainer.py          # LoRA fine-tuning
├── train_from_pdfs.py       # Complete pipeline script
└── README.md                # This file
```

## Next Steps

1. **Collect PDFs**: Gather all your PDF documents in a directory
2. **Run Pipeline**: Use `train_from_pdfs.py` to process everything
3. **Test Model**: Load and test the fine-tuned model
4. **Iterate**: Adjust hyperparameters and retrain as needed

## Support

For issues or questions:
- Check the logs for error messages
- Verify all dependencies are installed
- Ensure you have sufficient disk space and memory
- For GPU issues, verify CUDA installation

