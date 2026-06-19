import './App.css'

function App() {
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
      </main>
    </div>
  )
}

export default App