import { useState } from 'react'
import './App.css'

function App() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <span className="eyebrow">BHARAT ANTRIKSH HACKATHON</span>
          <h1 className="title">IR2RGB-NET</h1>
          <p className="subtitle">
            Infrared satellite imagery, enhanced and recolorized for real object interpretation.
          </p>
        </div>
      </header>

      <main className="main">
        <section className="upload-section">
          <label
            htmlFor="file-input"
            className="upload-box"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded preview" className="uploaded-preview" />
            ) : (
              <>
                <div className="upload-icon">▣</div>
                <p className="upload-text">Drop an infrared satellite image here</p>
                <p className="upload-hint">or click to browse · PNG, JPG, TIFF</p>
              </>
            )}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {uploadedImage && (
            <button className="clear-button" onClick={() => setUploadedImage(null)}>
              Remove image
            </button>
          )}
        </section>

        <section className="comparison-section">
          <h2 className="section-title">Before / After</h2>
          <div className="comparison-container">
            <div className="comparison-image-wrap">
              <img
                src="https://picsum.photos/seed/satview1/700/450"
                alt="RGB output"
                className="comparison-image base-image"
              />
              <div
                className="comparison-image-overlay"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="https://picsum.photos/seed/satview1/700/450"
                  alt="IR input"
                  className="comparison-image ir-style"
                />
              </div>
              <div
                className="slider-line"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="slider-handle">⇔</div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="comparison-slider"
            />
            <div className="comparison-labels">
              <span>Infrared</span>
              <span>RGB Output</span>
            </div>
          </div>
        </section>

        <section className="metrics-section">
          <h2 className="section-title">Evaluation Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-label">PSNR</span>
              <span className="metric-value">28.4<span className="metric-unit">dB</span></span>
              <span className="metric-desc">Peak Signal-to-Noise Ratio</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">SSIM</span>
              <span className="metric-value">0.87</span>
              <span className="metric-desc">Structural Similarity</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">FID</span>
              <span className="metric-value">14.2</span>
              <span className="metric-desc">Fréchet Inception Distance</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Inference Time</span>
              <span className="metric-value">0.42<span className="metric-unit">s</span></span>
              <span className="metric-desc">Per image, GPU</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App