let model;
let isModelLoaded = false;

async function loadModel() {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'flex';
    
    try {
        model = await mobilenet.load();
        isModelLoaded = true;
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
        alert('Failed to load AI model. Please refresh the page.');
    } finally {
        loadingDiv.style.display = 'none';
    }
}

function initializeUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    
    uploadZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleImage(e.target.files[0]);
        }
    });
    
    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--primary)';
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = 'var(--border)';
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--border)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImage(e.dataTransfer.files[0]);
        }
    });
}

function handleImage(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('uploadedImage');
        img.src = e.target.result;
        
        document.getElementById('uploadZone').style.display = 'none';
        document.getElementById('imagePreview').style.display = 'block';
        
        // Classify after image loads
        img.onload = () => classifyImage(img);
    };
    reader.readAsDataURL(file);
}

async function classifyImage(img) {
    if (!isModelLoaded) {
        alert('Model is still loading. Please wait...');
        return;
    }
    
    const startTime = performance.now();
    
    try {
        const predictions = await model.classify(img);
        const endTime = performance.now();
        const processingTime = ((endTime - startTime) / 1000).toFixed(2);
        
        displayPredictions(predictions, processingTime);
    } catch (error) {
        console.error('Classification error:', error);
        alert('Error classifying image');
    }
}

function displayPredictions(predictions, processingTime) {
    const predictionsDiv = document.getElementById('predictions');
    const resultsSection = document.getElementById('resultsSection');
    
    predictionsDiv.innerHTML = predictions.map((pred, index) => `
        <div class="prediction-item">
            <div class="prediction-rank">#${index + 1}</div>
            <div class="prediction-content">
                <div class="prediction-label">${pred.className}</div>
                <div class="prediction-bar">
                    <div class="prediction-fill" style="width: ${pred.probability * 100}%"></div>
                </div>
            </div>
            <div class="prediction-confidence">${(pred.probability * 100).toFixed(1)}%</div>
        </div>
    `).join('');
    
    document.getElementById('processingTime').textContent = processingTime + 's';
    resultsSection.style.display = 'block';
}

function resetUpload() {
    document.getElementById('uploadZone').style.display = 'block';
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('fileInput').value = '';
}

window.onload = () => {
    loadModel();
    initializeUpload();
};
