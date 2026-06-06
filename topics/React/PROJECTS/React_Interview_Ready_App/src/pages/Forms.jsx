/**
 * FORMS PAGE - Interview Topic: React Forms
 *
 * Purpose: Compare controlled and uncontrolled form patterns with validation examples.
 * Interview Points:
 * - Controlled vs uncontrolled components
 * - Validation, refs, and useDebounce
 * - Form submission and error handling
 *
 * Interview Questions to Prepare:
 * Q1: What is a controlled component in React?
 * A: An input element whose value is driven by React state.
 *
 * Q2: When would you use refs for form values?
 * A: For uncontrolled inputs or when you need direct DOM access without state updates.
 *
 * Q3: How do you validate form input in a React app?
 * A: Validate on change or submit, store errors in state, and render messages conditionally.
 */
import { useState, useRef } from 'react';
import useDebounce from '../hooks/useDebounce';

/**
 * FORMS PAGE - Interview Topic: Controlled vs Uncontrolled Components
 * Demonstrates: Both form patterns, validation, debouncing
 */
function Forms() {
    // Controlled Component State
    const [controlled, setControlled] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Uncontrolled Component Refs
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    // Validation state
    const [errors, setErrors] = useState({});
    const debouncedEmail = useDebounce(controlled.email, 500);

    // Controlled form handlers
    const handleControlledChange = (e) => {
        const { name, value } = e.target;
        setControlled(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleControlledSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(controlled);

        if (Object.keys(newErrors).length === 0) {
            console.log('Controlled form submitted:', controlled);
            alert('Controlled form submitted! Check console.');
            setControlled({ name: '', email: '', message: '' });
        } else {
            setErrors(newErrors);
        }
    };

    // Uncontrolled form handler
    const handleUncontrolledSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value
        };

        console.log('Uncontrolled form submitted:', formData);
        alert('Uncontrolled form submitted! Check console.');
        e.target.reset();
    };

    // Validation function
    const validateForm = (data) => {
        const errors = {};
        if (!data.name.trim()) errors.name = 'Name is required';
        if (!data.email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
        if (!data.message.trim()) errors.message = 'Message is required';
        return errors;
    };

    return (
        <div className="forms-page">
            <h1>Forms Demo 📝</h1>

            <div className="forms-container">
                {/* Controlled Component Form */}
                <section className="form-section">
                    <h2>Controlled Component</h2>
                    <p className="form-description">
                        React controls the form state. Value is stored in component state.
                    </p>

                    <form onSubmit={handleControlledSubmit}>
                        <div className="form-group">
                            <label htmlFor="controlled-name">Name:</label>
                            <input
                                id="controlled-name"
                                name="name"
                                value={controlled.name}
                                onChange={handleControlledChange}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="controlled-email">Email:</label>
                            <input
                                id="controlled-email"
                                name="email"
                                type="email"
                                value={controlled.email}
                                onChange={handleControlledChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                            {debouncedEmail && <p className="info-text">Debounced: {debouncedEmail}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="controlled-message">Message:</label>
                            <textarea
                                id="controlled-message"
                                name="message"
                                value={controlled.message}
                                onChange={handleControlledChange}
                                className={errors.message ? 'error' : ''}
                                rows="4"
                            />
                            {errors.message && <span className="error-text">{errors.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit Controlled
                        </button>
                    </form>

                    <div className="form-state">
                        <h4>Current State:</h4>
                        <pre>{JSON.stringify(controlled, null, 2)}</pre>
                    </div>
                </section>

                {/* Uncontrolled Component Form */}
                <section className="form-section">
                    <h2>Uncontrolled Component</h2>
                    <p className="form-description">
                        DOM controls the form state. Access values using refs.
                    </p>

                    <form onSubmit={handleUncontrolledSubmit}>
                        <div className="form-group">
                            <label htmlFor="uncontrolled-name">Name:</label>
                            <input
                                id="uncontrolled-name"
                                ref={nameRef}
                                defaultValue=""
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="uncontrolled-email">Email:</label>
                            <input
                                id="uncontrolled-email"
                                ref={emailRef}
                                type="email"
                                defaultValue=""
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="uncontrolled-message">Message:</label>
                            <textarea
                                id="uncontrolled-message"
                                ref={messageRef}
                                defaultValue=""
                                rows="4"
                            />
                        </div>

                        <button type="submit" className="btn btn-secondary">
                            Submit Uncontrolled
                        </button>
                    </form>
                </section>
            </div>

            {/* Comparison Table */}
            <section className="comparison-section">
                <h2>Controlled vs Uncontrolled Comparison</h2>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Controlled</th>
                            <th>Uncontrolled</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>State Management</td>
                            <td>React state</td>
                            <td>DOM</td>
                        </tr>
                        <tr>
                            <td>Access Value</td>
                            <td>state.value</td>
                            <td>ref.current.value</td>
                        </tr>
                        <tr>
                            <td>Validation</td>
                            <td>Real-time</td>
                            <td>On submit</td>
                        </tr>
                        <tr>
                            <td>Use Case</td>
                            <td>Complex forms, validation</td>
                            <td>Simple forms, file inputs</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Interview Notes */}
            <section className="interview-notes">
                <h2>🎯 Form Interview Topics</h2>
                <ul>
                    <li><strong>Controlled:</strong> React manages state, value prop</li>
                    <li><strong>Uncontrolled:</strong> DOM manages state, refs</li>
                    <li><strong>Validation:</strong> Real-time vs on-submit</li>
                    <li><strong>Performance:</strong> Controlled can cause re-renders</li>
                    <li><strong>Use Cases:</strong> When to use each pattern</li>
                </ul>
            </section>
        </div>
    );
}

export default Forms;

// Made with ❤️ for Interview Preparation
