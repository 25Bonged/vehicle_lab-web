# Contributing to VEHICLE-LAB

Thank you for your interest in contributing to VEHICLE-LAB! 🎉

## 🤝 How to Contribute

### Reporting Bugs

- Use the [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)
- Include steps to reproduce
- Provide environment details
- Add screenshots if applicable

### Suggesting Features

- Use the [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)
- Explain the problem it solves
- Provide use cases
- Include mockups if possible

### Code Contributions

1. **Fork the repository**
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Follow code style**: PEP 8 for Python
5. **Add tests** if applicable
6. **Update documentation**
7. **Commit**: `git commit -m 'Add feature: description'`
8. **Push**: `git push origin feature/your-feature-name`
9. **Open a Pull Request**

## 📝 Code Style

### Python
- Follow PEP 8
- Use type hints where possible
- Add docstrings to functions/classes
- Maximum line length: 100 characters

### Example
```python
def analyze_signal(signal_data: pd.Series, 
                   method: str = "mean") -> Dict[str, float]:
    """
    Analyze signal data using specified method.
    
    Args:
        signal_data: Input signal time series
        method: Analysis method ('mean', 'std', etc.)
    
    Returns:
        Dictionary with analysis results
    """
    # Implementation
    pass
```

## ✅ Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add changelog entry
4. Request review from maintainers
5. Address review comments

## 📚 Documentation

- Update relevant `.md` files
- Add code comments for complex logic
- Include usage examples
- Update API documentation

## 🧪 Testing

- Add tests for new features
- Ensure existing tests still pass
- Run: `python3 -m pytest test_*.py`

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing!** 🙏

