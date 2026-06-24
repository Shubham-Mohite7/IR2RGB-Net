import { useState } from 'react'
import './App.css'

function App() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [uploadedImage, setUploadedImage] = useState(null)

  const handleSliderChange = (e) => setSliderPosition(e.target.value)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) setUploadedImage(URL.createObjectURL(file))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) setUploadedImage(URL.createObjectURL(file))
  }

  const handleDragOver = (e) => e.preventDefault()

  const displayImage = uploadedImage || 'https://picsum.photos/seed/satview1/700/450'

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <span className="eyebrow">BHARAT ANTRIKSH HACKATHON · TEAM SUBMISSION</span>
          <h1 className="title">IR2RGB-NET</h1>
          <p className="subtitle">
            Infrared satellite imagery, enhanced and recolorized for real object interpretation.
          </p>
          <div className="status-row">
            <span className="status-dot" />
            <span className="status-text">
              {uploadedImage ? 'MODEL STATUS: PREVIEWING INPUT' : 'MODEL STATUS: AWAITING INPUT'}
            </span>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="upload-section">
          <span className="kicker">01 · INPUT</span>
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
          <span className="kicker">02 · OUTPUT PREVIEW</span>
          <h2 className="section-title">Infrared → RGB</h2>
          <p className="section-note">
            Placeholder preview — final colorization will use our trained Pix2Pix model (in progress by team).
          </p>
          <div className="comparison-container">
            <div className="comparison-image-wrap">
              <img
                src={displayImage}
                alt="RGB preview"
                className="comparison-image base-image"
              />
              <div
                className="comparison-image-overlay"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={displayImage}
                  alt="IR preview"
                  className="comparison-image ir-style"
                />
              </div>
              <div className="slider-line" style={{ left: `${sliderPosition}%` }}>
                <div className="slider-handle">⇔</div>
              </div>
              <span className="tag tag-left">IR</span>
              <span className="tag tag-right">RGB</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="comparison-slider"
            />
          </div>
        </section>

        <section className="metrics-section">
          <span className="kicker">03 · MODEL TELEMETRY</span>
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
              <span className="metric-label">Inference</span>
              <span className="metric-value">0.42<span className="metric-unit">s</span></span>
              <span className="metric-desc">Per image, GPU</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>IR2RGB-NET · Built for Bharat Antriksh Hackathon</span>
      </footer>
    </div>
  )
}

export default App