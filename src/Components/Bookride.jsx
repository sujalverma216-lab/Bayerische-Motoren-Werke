import { useState, useMemo } from "react";
import "./Bookride.css";

/**
 * BMW — Book a Test Drive
 * A calm, upscale reservation page. Pair with Bookride.css.
 */

const MODELS = [
  "3 Series",
  "5 Series",
  "7 Series",
  "M3 Competition",
  "M4 Coupé",
  "M5 CS",
  "X5",
  "X7",
  "i7",
  "iX",
];

const SHOWROOMS = [
  "New Delhi — Mathura Road",
  "Mumbai — Worli",
  "Bengaluru — Bannerghatta Road",
  "Chennai — Sardar Patel Road",
  "Pune — Senapati Bapat Road",
  "Hyderabad — Banjara Hills",
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", range: "9:00 – 11:00" },
  { id: "midday", label: "Midday", range: "12:00 – 14:00" },
  { id: "afternoon", label: "Afternoon", range: "15:00 – 17:00" },
  { id: "evening", label: "Evening", range: "17:30 – 19:00" },
];

const EXPECTATIONS = [
  {
    n: "01",
    title: "Arrive with your licence",
    body: "Bring a valid driving licence held for at least one year. A specialist will verify it on arrival.",
  },
  {
    n: "02",
    title: "A guided walkthrough",
    body: "Your product specialist introduces the model — controls, drive modes, and what makes it distinct.",
  },
  {
    n: "03",
    title: "A considered route",
    body: "A 30–45 minute drive covering city roads and a highway stretch, so you feel the car properly.",
  },
  {
    n: "04",
    title: "No obligation",
    body: "Ask anything afterwards over coffee. There's no pressure to decide on the day.",
  },
];

function todayPlusOne() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function Field({ id, label, type = "text", value, onChange, error, ...rest }) {
  return (
    <div className={`br-field ${error ? "has-error" : ""}`}>
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
        <p className="br-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Bookride() {
  const minDate = useMemo(() => todayPlusOne(), []);

  const [form, setForm] = useState({
    model: "",
    showroom: "",
    date: "",
    slot: "",
    name: "",
    email: "",
    phone: "",
    license: "",
    notes: "",
  });
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.model) next.model = "Choose a model.";
    if (!form.showroom) next.showroom = "Choose a showroom.";
    if (!form.date) next.date = "Pick a date.";
    if (!form.slot) next.slot = "Pick a time slot.";
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Enter a valid 10-digit number.";
    if (!form.license.trim()) next.license = "Enter your licence number.";
    if (!confirmChecked) next.confirm = "Please confirm before booking.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const ref = `TD-${new Date().getFullYear()}-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const selectedSlot = TIME_SLOTS.find((s) => s.id === form.slot);

  const resetForm = () => {
    setForm({
      model: "",
      showroom: "",
      date: "",
      slot: "",
      name: "",
      email: "",
      phone: "",
      license: "",
      notes: "",
    });
    setConfirmChecked(false);
    setErrors({});
    setSubmitted(false);
    setBookingRef("");
  };

  return (
    <div className="bmw-bookride">
      <section className="br-hero">
        <div className="br-hero-scrim" />
        <div className="br-hero-inner">
          <p className="br-eyebrow">Complimentary · By appointment</p>
          <h1 className="br-hero-title">Reserve your test drive.</h1>
          <p className="br-hero-sub">
            Ninety minutes behind the wheel of the car you've been imagining —
            at the showroom nearest you, on your schedule.
          </p>
        </div>
      </section>

      <div className="br-layout">
        {/* ---------- LEFT: editorial info ---------- */}
        <aside className="br-info">
          <h2 className="br-info-heading">What to expect</h2>
          <ol className="br-expect-list">
            {EXPECTATIONS.map((item) => (
              <li key={item.n}>
                <span className="br-expect-n">{item.n}</span>
                <div>
                  <p className="br-expect-title">{item.title}</p>
                  <p className="br-expect-body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="br-divider" />

          <h2 className="br-info-heading">Requirements</h2>
          <ul className="br-req-list">
            <li>Valid driving licence, held for at least one year</li>
            <li>Minimum age of 21</li>
            <li>One companion permitted per booking</li>
          </ul>

          <blockquote className="br-quote">
            <p>
              "The specialist adjusted the whole route once he saw I wanted
              to feel the handling, not just cruise. Made the decision easy."
            </p>
            <cite>— R. Malhotra, Gurugram</cite>
          </blockquote>
        </aside>

        {/* ---------- RIGHT: form card ---------- */}
        <main className="br-form-wrap">
          {!submitted ? (
            <form className="br-form-card" onSubmit={handleSubmit} noValidate>
              <p className="br-card-eyebrow">Booking details</p>
              <h3 className="br-card-title">Schedule your drive</h3>

              <div className="br-field select-field">
                <select
                  id="model"
                  value={form.model}
                  onChange={setField("model")}
                  aria-invalid={!!errors.model}
                >
                  <option value="" disabled>
                    Choose a model
                  </option>
                  {MODELS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <label htmlFor="model">Model</label>
                {errors.model && <p className="br-field-error">{errors.model}</p>}
              </div>

              <div className="br-field select-field">
                <select
                  id="showroom"
                  value={form.showroom}
                  onChange={setField("showroom")}
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
                <label htmlFor="showroom">Showroom</label>
                {errors.showroom && <p className="br-field-error">{errors.showroom}</p>}
              </div>

              <div className="br-field-pair">
                <Field
                  id="date"
                  label="Preferred date"
                  type="date"
                  min={minDate}
                  value={form.date}
                  onChange={setField("date")}
                  error={errors.date}
                />
              </div>

              <div className="br-slot-block">
                <p className="br-mini-label">Time slot</p>
                <div className="br-slot-grid">
                  {TIME_SLOTS.map((s) => (
                    <label
                      key={s.id}
                      className={`br-slot ${form.slot === s.id ? "is-active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="slot"
                        value={s.id}
                        checked={form.slot === s.id}
                        onChange={() => setForm((f) => ({ ...f, slot: s.id }))}
                      />
                      <span className="br-slot-label">{s.label}</span>
                      <span className="br-slot-range">{s.range}</span>
                    </label>
                  ))}
                </div>
                {errors.slot && <p className="br-field-error">{errors.slot}</p>}
              </div>

              <div className="br-divider" />

              <div className="br-field-pair">
                <Field id="name" label="Full name" value={form.name} onChange={setField("name")} error={errors.name} />
                <Field id="email" label="Email address" type="email" value={form.email} onChange={setField("email")} error={errors.email} />
              </div>
              <div className="br-field-pair">
                <Field id="phone" label="Phone number" type="tel" value={form.phone} onChange={setField("phone")} error={errors.phone} />
                <Field id="license" label="Driving licence no." value={form.license} onChange={setField("license")} error={errors.license} />
              </div>

              <div className="br-field textarea-field">
                <textarea
                  id="notes"
                  rows={3}
                  placeholder=" "
                  value={form.notes}
                  onChange={setField("notes")}
                />
                <label htmlFor="notes">Anything your specialist should know? (optional)</label>
              </div>

              <label className="br-checkbox">
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                />
                <span className="br-checkbox-box" />
                I confirm I hold a valid driving licence and am 21 years or older.
              </label>
              {errors.confirm && <p className="br-field-error">{errors.confirm}</p>}

              <button type="submit" className="br-submit">
                Confirm reservation
              </button>
              <p className="br-fine-print">
                No payment required. A specialist will call to confirm within one business day.
              </p>
            </form>
          ) : (
            <div className="br-confirm-card">
              <span className="br-confirm-mark" aria-hidden="true">
                ✓
              </span>
              <p className="br-card-eyebrow">Reservation received</p>
              <h3 className="br-card-title">You're booked in.</h3>
              <p className="br-confirm-sub">
                We've held a slot for the {form.model || "selected model"} at{" "}
                {form.showroom}. A specialist will call {form.name.split(" ")[0] || "you"} to
                confirm the details.
              </p>

              <dl className="br-confirm-list">
                <div>
                  <dt>Date</dt>
                  <dd>{form.date}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>
                    {selectedSlot ? `${selectedSlot.label} · ${selectedSlot.range}` : "—"}
                  </dd>
                </div>
                <div>
                  <dt>Model</dt>
                  <dd>{form.model}</dd>
                </div>
                <div>
                  <dt>Showroom</dt>
                  <dd>{form.showroom}</dd>
                </div>
              </dl>

              <div className="br-divider" />

              <div className="br-ref-row">
                <span>Booking reference</span>
                <strong>{bookingRef}</strong>
              </div>

              <button className="br-submit br-submit-ghost" onClick={resetForm}>
                Make another booking
              </button>
            </div>
          )}
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
