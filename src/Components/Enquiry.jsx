import { useState, useMemo } from "react";
import "./Enquiry.css";

/**
 * BMW Enquiry — multi-step enquiry wizard.
 * Drop into any React app. Needs Enquiry.css alongside it.
 */

const MODELS = [
  {
    id: "m3-competition",
    name: "M3 Competition",
    spec: "510 hp · 3.9s 0–100",
    src: "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "m4-coupe",
    name: "M4 Coupé",
    spec: "480 hp · Twin-turbo",
    src: "https://images.unsplash.com/photo-1603189661342-e45f1374f890?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "m2",
    name: "M2",
    spec: "460 hp · 3-door",
    src: "https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "m8-gran-coupe",
    name: "M8 Gran Coupé",
    spec: "617 hp · 4 doors",
    src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "m5-cs",
    name: "M5 CS",
    spec: "627 hp · AWD",
    src: "https://images.unsplash.com/photo-1728060838342-cb9744a27d1b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "m3-touring",
    name: "M3 Touring",
    spec: "510 hp · Estate",
    src: "https://images.unsplash.com/photo-1600268330186-76564be81357?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "4series-coupe",
    name: "4 Series Coupé",
    spec: "374 hp · Coupé",
    src: "https://images.unsplash.com/photo-1570356528233-b442cf2de345?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "m2-coupe",
    name: "M2 Coupé",
    spec: "460 hp · Manual",
    src: "https://images.unsplash.com/photo-1614026480209-cd9934144671?auto=format&fit=crop&w=1400&q=80",
  },
];

const SHOWROOMS = [
  "New Delhi — Mathura Road",
  "Mumbai — Worli",
  "Bengaluru — Bannerghatta Road",
  "Chennai — Sardar Patel Road",
  "Pune — Senapati Bapat Road",
  "Hyderabad — Banjara Hills",
];

const STEPS = ["Model", "Details", "Preferences", "Review"];

function Field({ id, label, type = "text", value, onChange, error, ...rest }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function EnquiryPage() {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [modelId, setModelId] = useState(null);
  const [details, setDetails] = useState({ name: "", email: "", phone: "", city: "" });
  const [prefs, setPrefs] = useState({
    showroom: "",
    testDrive: false,
    financing: false,
    contactTime: "Morning",
    message: "",
  });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const selectedModel = useMemo(
    () => MODELS.find((m) => m.id === modelId) || MODELS[0],
    [modelId]
  );

  const setDetail = (key) => (e) => setDetails((d) => ({ ...d, [key]: e.target.value }));

  const validateStep = (i) => {
    const next = {};
    if (i === 0 && !modelId) {
      next.model = "Please pick a model to continue.";
    }
    if (i === 1) {
      if (!details.name.trim()) next.name = "We need your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
        next.email = "Enter a valid email address.";
      if (!/^[0-9]{10}$/.test(details.phone.replace(/\D/g, "")))
        next.phone = "Enter a valid 10-digit phone number.";
      if (!details.city.trim()) next.city = "Tell us your city.";
    }
    if (i === 2) {
      if (!prefs.showroom) next.showroom = "Pick your nearest showroom.";
    }
    if (i === 3) {
      if (!agree) next.agree = "Please accept the terms to submit.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    const nextStep = Math.min(step + 1, STEPS.length - 1);
    setStep(nextStep);
    setMaxStep((m) => Math.max(m, nextStep));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const jumpTo = (i) => {
    if (i <= maxStep) {
      setErrors({});
      setStep(i);
    }
  };

  const handleSubmit = () => {
    if (!validateStep(3)) return;
    const ref = `BMW-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;
    setRefNumber(ref);
    setSubmitted(true);
  };

  const resetAll = () => {
    setStep(0);
    setMaxStep(0);
    setModelId(null);
    setDetails({ name: "", email: "", phone: "", city: "" });
    setPrefs({ showroom: "", testDrive: false, financing: false, contactTime: "Morning", message: "" });
    setAgree(false);
    setErrors({});
    setSubmitted(false);
    setRefNumber("");
  };

  if (submitted) {
    return (
      <div className="bmw-enquiry">
        <div className="success-screen">
          <svg className="success-check" viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="36" />
            <path d="M24 41l11 11 21-23" />
          </svg>
          <h1>Enquiry received.</h1>
          <p className="success-sub">
            Our concierge team will reach out within 24 hours to talk you through the{" "}
            {selectedModel.name}.
          </p>
          <div className="success-ref">
            <span>Reference</span>
            <strong>{refNumber}</strong>
          </div>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={resetAll}>
              Make another enquiry
            </button>
            <a className="btn btn-ghost" href="/gallery">
              Back to gallery
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bmw-enquiry">
      <div className="enq-layout">
        {/* ---------- LEFT: visual panel ---------- */}
        <aside className="enq-visual">
          <div className="enq-visual-image-wrap">
            <img
              key={selectedModel.id}
              src={selectedModel.src}
              alt={selectedModel.name}
              className="enq-visual-image"
            />
            <div className="enq-visual-scrim" />
          </div>

          <div className="enq-visual-body">
            <p className="enq-visual-eyebrow">
              {modelId ? "" : "Featured"}
            </p>
            <h2 className="enq-visual-title">{selectedModel.name}</h2>
            <p className="enq-visual-spec">{selectedModel.spec}</p>

            <div className="enq-thumb-strip">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  className={`enq-thumb ${m.id === selectedModel.id ? "is-active" : ""}`}
                  onClick={() => setModelId(m.id)}
                  aria-label={`Preview ${m.name}`}
                  aria-pressed={m.id === modelId}
                >
                  <img src={m.src} alt="" />
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ---------- RIGHT: form panel ---------- */}
        <main className="enq-form-panel">
          <h1 className="enq-heading">Enquire about your next BMW</h1>
          <p className="enq-subheading">
            Four short steps. Our representatives will reach out to you.
          </p>

          {/* stepper */}
          <ol className="stepper">
            {STEPS.map((label, i) => (
              <li key={label} className="stepper-item">
                <button
                  className={`stepper-dot ${i === step ? "is-current" : ""} ${
                    i < step ? "is-done" : ""
                  } ${i <= maxStep ? "is-reachable" : ""}`}
                  onClick={() => jumpTo(i)}
                  disabled={i > maxStep}
                >
                  {i < step ? "✓" : i + 1}
                </button>
                <span className="stepper-label">{label}</span>
                {i < STEPS.length - 1 && (
                  <span className={`stepper-line ${i < step ? "is-filled" : ""}`} />
                )}
              </li>
            ))}
          </ol>

          {/* ---- STEP 0: model ---- */}
          {step === 0 && (
            <section className="step-panel" key="step-0">
              <h3 className="step-title">Which BMW caught your eye?</h3>
              <div className="model-grid">
                {MODELS.map((m) => (
                  <button
                    key={m.id}
                    className={`model-card ${modelId === m.id ? "is-selected" : ""}`}
                    onClick={() => setModelId(m.id)}
                  >
                    <img src={m.src} alt={m.name} />
                    <div className="model-card-info">
                      <p className="model-name">{m.name}</p>
                      <p className="model-spec">{m.spec}</p>
                    </div>
                    {modelId === m.id && <span className="model-tick">✓</span>}
                  </button>
                ))}
              </div>
              {errors.model && <p className="step-error">{errors.model}</p>}
            </section>
          )}

          {/* ---- STEP 1: details ---- */}
          {step === 1 && (
            <section className="step-panel" key="step-1">
              <h3 className="step-title">Tell us who you are</h3>
              <div className="field-grid">
                <Field
                  id="name"
                  label="Full name"
                  value={details.name}
                  onChange={setDetail("name")}
                  error={errors.name}
                />
                <Field
                  id="email"
                  label="Email address"
                  type="email"
                  value={details.email}
                  onChange={setDetail("email")}
                  error={errors.email}
                />
                <Field
                  id="phone"
                  label="Phone number"
                  type="tel"
                  value={details.phone}
                  onChange={setDetail("phone")}
                  error={errors.phone}
                />
                <Field
                  id="city"
                  label="City"
                  value={details.city}
                  onChange={setDetail("city")}
                  error={errors.city}
                />
              </div>
            </section>
          )}

          {/* ---- STEP 2: preferences ---- */}
          {step === 2 && (
            <section className="step-panel" key="step-2">
              <h3 className="step-title">Your preferences</h3>

              <div className="field select-field">
                <select
                  id="showroom"
                  value={prefs.showroom}
                  onChange={(e) => setPrefs((p) => ({ ...p, showroom: e.target.value }))}
                  aria-invalid={!!errors.showroom}
                >
                  <option value="" disabled>
                    Choose a showroom
                  </option>
                  {SHOWROOMS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <label htmlFor="showroom">Nearest showroom</label>
                {errors.showroom && <p className="field-error">{errors.showroom}</p>}
              </div>

              <div className="checkbox-row">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={prefs.testDrive}
                    onChange={(e) => setPrefs((p) => ({ ...p, testDrive: e.target.checked }))}
                  />
                  <span className="checkbox-box" />
                  I'd like to book a test drive
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={prefs.financing}
                    onChange={(e) => setPrefs((p) => ({ ...p, financing: e.target.checked }))}
                  />
                  <span className="checkbox-box" />
                  Send me financing options
                </label>
              </div>

              <p className="mini-label">Best time to call</p>
              <div className="pill-row">
                {["Morning", "Afternoon", "Evening"].map((t) => (
                  <label key={t} className={`pill ${prefs.contactTime === t ? "is-active" : ""}`}>
                    <input
                      type="radio"
                      name="contactTime"
                      value={t}
                      checked={prefs.contactTime === t}
                      onChange={() => setPrefs((p) => ({ ...p, contactTime: t }))}
                    />
                    {t}
                  </label>
                ))}
              </div>

              <div className="field textarea-field">
                <textarea
                  id="message"
                  rows={4}
                  placeholder=" "
                  value={prefs.message}
                  onChange={(e) => setPrefs((p) => ({ ...p, message: e.target.value }))}
                />
                <label htmlFor="message">Anything else we should know? (optional)</label>
              </div>
            </section>
          )}

          {/* ---- STEP 3: review ---- */}
          {step === 3 && (
            <section className="step-panel" key="step-3">
              <h3 className="step-title">Review your enquiry</h3>

              <div className="review-card">
                <div className="review-row">
                  <img src={selectedModel.src} alt={selectedModel.name} />
                  <div>
                    <p className="review-model">{selectedModel.name}</p>
                    <p className="review-spec">{selectedModel.spec}</p>
                  </div>
                </div>

                <dl className="review-list">
                  <div>
                    <dt>Name</dt>
                    <dd>{details.name}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>{details.email}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{details.phone}</dd>
                  </div>
                  <div>
                    <dt>City</dt>
                    <dd>{details.city}</dd>
                  </div>
                  <div>
                    <dt>Showroom</dt>
                    <dd>{prefs.showroom}</dd>
                  </div>
                  <div>
                    <dt>Best time</dt>
                    <dd>{prefs.contactTime}</dd>
                  </div>
                  <div>
                    <dt>Test drive</dt>
                    <dd>{prefs.testDrive ? "Yes" : "No"}</dd>
                  </div>
                  <div>
                    <dt>Financing info</dt>
                    <dd>{prefs.financing ? "Yes" : "No"}</dd>
                  </div>
                </dl>
              </div>

              <label className="checkbox agree-checkbox">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span className="checkbox-box" />
                I agree to be contacted by BMW and its authorised dealers regarding this enquiry.
              </label>
              {errors.agree && <p className="step-error">{errors.agree}</p>}
            </section>
          )}

          {/* ---- nav buttons ---- */}
          <div className="step-actions">
            {step > 0 ? (
              <button className="btn btn-ghost" onClick={goBack}>
                Back
              </button>
            ) : (
              <span />
            )}

            {step < STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={goNext}>
                Continue
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit enquiry
              </button>
            )}
          </div>
        </main>
      </div>

      <footer className="footerS">
        <div className="copyright">
          © 2026 BMW. All rights reserved by Sujal Verma. Designed and developed by Sujal Verma.
        </div>

      </footer>
    </div>
  );
}
