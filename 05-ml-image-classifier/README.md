# Machine Learning Image Classifier

TensorFlow.js-powered image classification app using MobileNet for real-time object recognition.

## Features

- **TensorFlow.js Integration**: Client-side ML inference
- **MobileNet Model**: Pre-trained on ImageNet dataset
- **Real-time Classification**: Fast prediction on device
- **Drag & Drop Upload**: User-friendly image upload
- **Confidence Scores**: Probability distribution for predictions
- **1000+ Object Classes**: Comprehensive recognition

## Technologies

- TensorFlow.js
- MobileNet v2
- HTML5 File API
- Canvas API
- Modern CSS3

## Installation

```bash
python3 -m http.server 8080
```

Visit http://localhost:8080

## Technical Details

- Model runs entirely in browser (no server needed)
- Uses WebGL acceleration when available
- Input: 224x224 RGB images
- Output: Top 3 predictions with confidence scores

## Skills Demonstrated

- Machine Learning integration
- TensorFlow.js API
- Pre-trained model usage
- Image preprocessing
- Asynchronous operations
- Performance optimization
