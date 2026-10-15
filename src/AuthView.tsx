import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, KeyRound, ShieldCheck } from 'lucide-react';
import { useAuth } from './AuthContext';
import { routeHref } from './publicRoutes';

export const AuthView: React.FC = () => {
  const { login, requestPasswordReset } = useAuth();
  const [mode, setMode] = useState<'sign-in' | 'recovery'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  const clearFeedback = () => {
    if (formState !== 'loading') {
      setFormState('idle');
      setMessage('');
    }
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState('loading');
    setMessage('');
    const result = mode === 'sign-in'
      ? await login(email.trim(), password)
      : await requestPasswordReset(email.trim());
    setMessage(result.message ?? (result.ok ? 'Request submitted.' : 'The request was unsuccessful.'));
    setFormState(result.ok ? 'success' : 'error');
  };

  const switchMode = () => {
    setMode((current) => current === 'sign-in' ? 'recovery' : 'sign-in');
    setPassword('');
    setFormState('idle');
    setMessage('');
  };

  return (
    <section className="public-access-grid" aria-labelledby="access-heading">
      <div className="public-access-copy">
        <p className="alc-label">06 · secure access</p>
        <h1 id="access-heading" className="public-page-title">
          {mode === 'sign-in' ? 'Continue your enrolled program.' : 'Recover account access.'}
        </h1>
        <p className="public-page-lede">
          {mode === 'sign-in'
            ? 'Use the email address and password attached to your AECS enrollment. Your assigned program is provided by the account service after authentication.'
            : 'Enter the email address attached to your enrollment. For privacy, the confirmation is the same whether or not an account is found.'}
        </p>
        <div className="public-fact-list">
          <div><ShieldCheck aria-hidden="true" /><span><strong>Server-issued sessions</strong>Credentials and session tokens are never stored in this frontend.</span></div>
          <div><KeyRound aria-hidden="true" /><span><strong>Role-based workspace</strong>Students and staff only see the workspace authorized by the account service.</span></div>
        </div>
        <a className="public-text-link" href={routeHref('contact')}>Need enrollment help? Contact AECS <ArrowRight aria-hidden="true" /></a>
      </div>

      <form className="alc-panel public-auth-card" onSubmit={submit} noValidate>
        <p className="alc-label">{mode === 'sign-in' ? 'student + staff' : 'account recovery'}</p>
        <h2>{mode === 'sign-in' ? 'Sign in' : 'Reset password'}</h2>
        <p>{mode === 'sign-in' ? 'Enter your issued credentials.' : 'We will request a recovery message from the account service.'}</p>

        <label htmlFor="auth-email">Email address</label>
        <input id="auth-email" type="email" autoComplete="email" required value={email}
          onChange={(event) => { setEmail(event.target.value); clearFeedback(); }}
          className="alc-field" aria-invalid={formState === 'error'} placeholder="you@example.com" />

        {mode === 'sign-in' && (
          <>
            <div className="auth-label-row">
              <label htmlFor="auth-password">Password</label>
              <button type="button" className="public-text-button" onClick={switchMode}>Forgot password?</button>
            </div>
            <input id="auth-password" type="password" autoComplete="current-password" required minLength={8}
              value={password} onChange={(event) => { setPassword(event.target.value); clearFeedback(); }}
              className="alc-field" aria-invalid={formState === 'error'} placeholder="Enter your password" />
          </>
        )}

        <div className="auth-feedback" aria-live="polite">
          {message && <p data-tone={formState} role={formState === 'error' ? 'alert' : 'status'}>{message}</p>}
        </div>
        <button type="submit" className="alc-button-primary w-full"
          disabled={formState === 'loading' || !email.trim() || (mode === 'sign-in' && password.length < 8)}>
          {formState === 'loading' ? 'Submitting…' : mode === 'sign-in' ? 'Sign in' : 'Request reset'}
          {formState !== 'loading' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
        {mode === 'recovery' && (
          <button type="button" className="alc-button-quiet mt-2 w-full" onClick={switchMode}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to sign in
          </button>
        )}
      </form>
    </section>
  );
};
