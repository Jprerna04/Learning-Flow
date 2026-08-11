import React, { useState } from 'react';
import SuccessState from './SuccessState';
import { submitWaitlist } from '../services/waitlistService';

function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function isValidPhone(val) {
  return /^[0-9]{7,15}$/.test(val.trim());
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  });
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhoneChange = (e) => {
    const filteredValue = e.target.value.replace(/[^0-9]/g, '');
    setFormData((prev) => ({ ...prev, phone: filteredValue }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ text: '', isError: false });

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const role = formData.role;

    if (!name || !email || !phone || !role) {
      setStatusMsg({ text: 'Please fill in every field.', isError: true });
      return;
    }

    if (!isValidEmail(email)) {
      setStatusMsg({ text: 'Enter a valid email address.', isError: true });
      return;
    }

    if (!isValidPhone(phone)) {
      setStatusMsg({ text: 'Phone number should be numeric.', isError: true });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitWaitlist({ name, email, phone, role });
      setIsSubmitted(true);
    } catch (err) {
      setStatusMsg({ text: "Couldn't save your details. Try again.", isError: true });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="form-section wrap">
      <div className="form-card">
        {!isSubmitted ? (
          <div id="formView">
            <h2>Be the first to experience Learning Flow.</h2>
            <p className="sub">
              Join the waitlist to get early access, shape the roadmap, and unlock exclusive invite-only benefits.
            </p>
            <form id="waitlistForm" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row2">
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    inputMode="numeric"
                    maxLength={15}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    <option value="Student">Student</option>
                    <option value="Professional">Professional</option>
                    <option value="Fresher">Fresher</option>
                    <option value="CTO/CXO">CTO/CXO</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                id="submitBtn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join the waitlist'}
              </button>

              <div
                className={`form-msg ${statusMsg.isError ? 'error' : statusMsg.text ? 'ok' : ''}`}
                id="formMsg"
              >
                {statusMsg.text}
              </div>
            </form>
          </div>
        ) : (
          <SuccessState />
        )}
      </div>
    </section>
  );
}
