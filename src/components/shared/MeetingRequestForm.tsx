'use client';

// Shared meeting-request form. Single source of truth for the form on
// the Home Final CTA section and the segment-page chassis Section 5.
// Reads labels/options/errors/consent/confirmation from
// src/content/{locale}/home.ts:finalCta.form so authoring stays in one
// place. Lifted out of the original src/components/home/final-cta/
// FinalCtaForm.tsx in VM-437.
//
// The wrapping element carries data-meeting-form-anchor so the chassis
// Section 5 CTA pill can scroll the user here and place keyboard focus
// on the first field.

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import { homeContent as mxHome } from '@/content/mx-es/home';
import { homeContent as usHome } from '@/content/us-en/home';
import type { Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxHome,
  'us-en': usHome,
} as const;

type FieldName =
  | 'name'
  | 'jobTitle'
  | 'organizationName'
  | 'organizationType'
  | 'workEmail'
  | 'phone';

type RequiredFieldName = Exclude<FieldName, 'phone'>;

const REQUIRED_FIELDS: ReadonlyArray<RequiredFieldName> = [
  'name',
  'jobTitle',
  'organizationName',
  'organizationType',
  'workEmail',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: Record<FieldName, string> = {
  name: '',
  jobTitle: '',
  organizationName: '',
  organizationType: '',
  workEmail: '',
  phone: '',
};

const INITIAL_TOUCHED: Record<FieldName, boolean> = {
  name: false,
  jobTitle: false,
  organizationName: false,
  organizationType: false,
  workEmail: false,
  phone: false,
};

function isRequiredEmpty(value: string): boolean {
  return value.trim() === '';
}

function isInvalidEmail(value: string): boolean {
  return !EMAIL_PATTERN.test(value.trim());
}

function deriveError(
  name: FieldName,
  value: string,
  errors: { required: string; invalidEmail: string },
): string | null {
  if (name === 'phone') return null;
  if (name === 'workEmail') {
    if (isRequiredEmpty(value)) return errors.required;
    if (isInvalidEmail(value)) return errors.invalidEmail;
    return null;
  }
  if (isRequiredEmpty(value)) return errors.required;
  return null;
}

export function MeetingRequestForm({ locale }: { locale: Locale }) {
  const { finalCta } = contentByLocale[locale];
  const { form, confirmation } = finalCta;
  const { labels, placeholders, options, errors } = form;

  const [values, setValues] =
    useState<Record<FieldName, string>>(INITIAL_VALUES);
  const [touched, setTouched] =
    useState<Record<FieldName, boolean>>(INITIAL_TOUCHED);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errorMap: Record<FieldName, string | null> = {
    name: deriveError('name', values.name, errors),
    jobTitle: deriveError('jobTitle', values.jobTitle, errors),
    organizationName: deriveError(
      'organizationName',
      values.organizationName,
      errors,
    ),
    organizationType: deriveError(
      'organizationType',
      values.organizationType,
      errors,
    ),
    workEmail: deriveError('workEmail', values.workEmail, errors),
    phone: null,
  };

  const hasAnyValidationError = REQUIRED_FIELDS.some(
    (field) => errorMap[field] !== null,
  );

  function handleChange(name: FieldName) {
    return (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      const next = e.target.value;
      setValues((prev) => ({ ...prev, [name]: next }));
    };
  }

  function handleBlur(name: FieldName) {
    return () => {
      setTouched((prev) =>
        prev[name] ? prev : { ...prev, [name]: true },
      );
    };
  }

  function shouldShowError(name: FieldName): boolean {
    return (touched[name] || submitAttempted) && errorMap[name] !== null;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (hasAnyValidationError) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="vm-final-cta-card" data-meeting-form-anchor>
        <div
          className="vm-final-cta-confirmation"
          role="status"
          aria-live="polite"
        >
          <div
            className="vm-final-cta-confirmation-check"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 12 12"
              width={10}
              height={10}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6l3 3 5-6" />
            </svg>
          </div>
          <p className="vm-final-cta-confirmation-text">{confirmation}</p>
        </div>
      </div>
    );
  }

  const submitLabel = submitting ? form.submitting : form.submit;
  const submitDisabled = submitting || hasAnyValidationError;

  return (
    <div className="vm-final-cta-card" data-meeting-form-anchor>
      <form
        className="vm-final-cta-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="vm-final-cta-field">
          <label className="vm-final-cta-label" htmlFor="meeting-form-name">
            {labels.name}
          </label>
          <input
            id="meeting-form-name"
            type="text"
            className="vm-final-cta-input"
            value={values.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            aria-invalid={shouldShowError('name') || undefined}
            aria-describedby={
              shouldShowError('name') ? 'meeting-form-name-error' : undefined
            }
            autoComplete="name"
          />
          {shouldShowError('name') ? (
            <p id="meeting-form-name-error" className="vm-final-cta-error">
              {errorMap.name}
            </p>
          ) : null}
        </div>

        <div className="vm-final-cta-field">
          <label
            className="vm-final-cta-label"
            htmlFor="meeting-form-job-title"
          >
            {labels.jobTitle}
          </label>
          <input
            id="meeting-form-job-title"
            type="text"
            className="vm-final-cta-input"
            value={values.jobTitle}
            onChange={handleChange('jobTitle')}
            onBlur={handleBlur('jobTitle')}
            aria-invalid={shouldShowError('jobTitle') || undefined}
            aria-describedby={
              shouldShowError('jobTitle')
                ? 'meeting-form-job-title-error'
                : undefined
            }
            autoComplete="organization-title"
          />
          {shouldShowError('jobTitle') ? (
            <p
              id="meeting-form-job-title-error"
              className="vm-final-cta-error"
            >
              {errorMap.jobTitle}
            </p>
          ) : null}
        </div>

        <div className="vm-final-cta-field">
          <label
            className="vm-final-cta-label"
            htmlFor="meeting-form-organization-name"
          >
            {labels.organizationName}
          </label>
          <input
            id="meeting-form-organization-name"
            type="text"
            className="vm-final-cta-input"
            value={values.organizationName}
            onChange={handleChange('organizationName')}
            onBlur={handleBlur('organizationName')}
            aria-invalid={shouldShowError('organizationName') || undefined}
            aria-describedby={
              shouldShowError('organizationName')
                ? 'meeting-form-organization-name-error'
                : undefined
            }
            autoComplete="organization"
          />
          {shouldShowError('organizationName') ? (
            <p
              id="meeting-form-organization-name-error"
              className="vm-final-cta-error"
            >
              {errorMap.organizationName}
            </p>
          ) : null}
        </div>

        <div className="vm-final-cta-field">
          <label
            className="vm-final-cta-label"
            htmlFor="meeting-form-organization-type"
          >
            {labels.organizationType}
          </label>
          <select
            id="meeting-form-organization-type"
            className="vm-final-cta-select"
            value={values.organizationType}
            onChange={handleChange('organizationType')}
            onBlur={handleBlur('organizationType')}
            aria-invalid={shouldShowError('organizationType') || undefined}
            aria-describedby={
              shouldShowError('organizationType')
                ? 'meeting-form-organization-type-error'
                : undefined
            }
          >
            <option value="" disabled>
              {placeholders.organizationType}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {shouldShowError('organizationType') ? (
            <p
              id="meeting-form-organization-type-error"
              className="vm-final-cta-error"
            >
              {errorMap.organizationType}
            </p>
          ) : null}
        </div>

        <div className="vm-final-cta-field">
          <label
            className="vm-final-cta-label"
            htmlFor="meeting-form-work-email"
          >
            {labels.workEmail}
          </label>
          <input
            id="meeting-form-work-email"
            type="email"
            className="vm-final-cta-input"
            value={values.workEmail}
            onChange={handleChange('workEmail')}
            onBlur={handleBlur('workEmail')}
            aria-invalid={shouldShowError('workEmail') || undefined}
            aria-describedby={
              shouldShowError('workEmail')
                ? 'meeting-form-work-email-error'
                : undefined
            }
            autoComplete="email"
            inputMode="email"
          />
          {shouldShowError('workEmail') ? (
            <p
              id="meeting-form-work-email-error"
              className="vm-final-cta-error"
            >
              {errorMap.workEmail}
            </p>
          ) : null}
        </div>

        <div className="vm-final-cta-field">
          <label className="vm-final-cta-label" htmlFor="meeting-form-phone">
            {labels.phone}{' '}
            <span className="vm-final-cta-label-opt">
              {labels.phoneOptional}
            </span>
          </label>
          <input
            id="meeting-form-phone"
            type="tel"
            className="vm-final-cta-input"
            value={values.phone}
            onChange={handleChange('phone')}
            onBlur={handleBlur('phone')}
            autoComplete="tel"
            inputMode="tel"
          />
        </div>

        <button
          type="submit"
          className="vm-final-cta-submit"
          disabled={submitDisabled}
        >
          {submitLabel}
        </button>

        <p className="vm-final-cta-consent">{form.consentNote}</p>
      </form>
    </div>
  );
}
