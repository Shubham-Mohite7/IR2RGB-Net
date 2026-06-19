import { useState } from 'react'
import './App.css'

function App() {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value)
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
          <div className="upload-box">
            <div className="upload-icon">▣</div>
            <p className="upload-text">Drop an infrared satellite image here</p>
            <p className="upload-hint">or click to browse · PNG, JPG, TIFF</p>
          </div>
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
                  className="comparison-image"
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
      </main>
    </div>
  )
}

export default App