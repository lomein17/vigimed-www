'use client';

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import { careersContent as mxCareers } from '@/content/mx-es/careers';
import { careersContent as usCareers } from '@/content/us-en/careers';
import type { Locale } from '@/lib/i18n';

const contentByLocale = {
  'mx-es': mxCareers,
  'us-en': usCareers,
} as const;

type FieldName =
  | 'name'
  | 'workEmail'
  | 'roleOfInterest'
  | 'message'
  | '__website';

type RequiredFieldName = 'name' | 'workEmail' | 'roleOfInterest';

const REQUIRED_FIELDS: ReadonlyArray<RequiredFieldName> = [
  'name',
  'workEmail',
  'roleOfInterest',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: Record<FieldName, string> = {
  name: '',
  workEmail: '',
  roleOfInterest: '',
  message: '',
  __website: '',
};

const INITIAL_TOUCHED: Record<FieldName, boolean> = {
  name: false,
  workEmail: false,
  roleOfInterest: false,
  message: false,
  __website: false,
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
  if (name === '__website') return null;
  if (name === 'message') return null;
  if (name === 'workEmail') {
    if (isRequiredEmpty(value)) return errors.required;
    if (isInvalidEmail(value)) return errors.invalidEmail;
    return null;
  }
  if (isRequiredEmpty(value)) return errors.required;
  return null;
}

const labelClass =
  'font-ui block text-[13px] font-medium text-text-primary mb-1.5';
const inputClass =
  'font-body w-full h-11 rounded-md border border-gray-200 bg-white px-3 text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition-colors';
const textareaClass =
  'font-body w-full min-h-[120px] rounded-md border border-gray-200 bg-white px-3 py-2 text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition-colors';
const errorClass = 'font-ui mt-1.5 text-[12px] text-alert-red';

export function TalentNetworkForm({ locale }: { locale: Locale }) {
  const { form } = contentByLocale[locale];
  const { labels, placeholders, options, errors, consentNote } = form;

  const [values, setValues] =
    useState<Record<FieldName, string>>(INITIAL_VALUES);
  const [touched, setTouched] =
    useState<Record<FieldName, boolean>>(INITIAL_TOUCHED);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errorMap: Record<FieldName, string | null> = {
    name: deriveError('name', values.name, errors),
    workEmail: deriveError('workEmail', values.workEmail, errors),
    roleOfInterest: deriveError(
      'roleOfInterest',
      values.roleOfInterest,
      errors,
    ),
    message: null,
    __website: null,
  };

  const hasAnyValidationError = REQUIRED_FIELDS.some(
    (field) => errorMap[field] !== null,
  );

  function handleChange(name: FieldName) {
    return (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
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
      <section
        aria-labelledby="careers-form-heading"
        className="bg-white"
      >
        <div className="max-w-[1280px] mx-auto px-gutter pb-20 md:pb-28">
          <div className="mx-auto max-w-[560px]">
            <div
              className="rounded-lg border border-gray-200 bg-surface-warm p-6 md:p-8"
              role="status"
              aria-live="polite"
            >
              <h2
                id="careers-form-heading"
                className="font-display text-[1.25rem] md:text-[1.375rem] font-bold leading-[1.25] text-text-primary"
              >
                {form.confirmation}
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const submitLabel = submitting ? form.submitting : form.submit;
  const submitDisabled = submitting || (submitAttempted && hasAnyValidationError);

  return (
    <section
      aria-labelledby="careers-form-heading"
      className="bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-gutter pb-20 md:pb-28">
        <div className="mx-auto max-w-[560px]">
          <h2
            id="careers-form-heading"
            className="sr-only"
          >
            {form.submit}
          </h2>
          <form
            className="rounded-lg border border-gray-200 bg-white p-6 md:p-8 flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label className={labelClass} htmlFor="careers-form-name">
                {labels.name}
              </label>
              <input
                id="careers-form-name"
                type="text"
                className={inputClass}
                value={values.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                aria-invalid={shouldShowError('name') || undefined}
                aria-describedby={
                  shouldShowError('name')
                    ? 'careers-form-name-error'
                    : undefined
                }
                autoComplete="name"
              />
              {shouldShowError('name') ? (
                <p id="careers-form-name-error" className={errorClass}>
                  {errorMap.name}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="careers-form-work-email">
                {labels.workEmail}
              </label>
              <input
                id="careers-form-work-email"
                type="email"
                className={inputClass}
                value={values.workEmail}
                onChange={handleChange('workEmail')}
                onBlur={handleBlur('workEmail')}
                aria-invalid={shouldShowError('workEmail') || undefined}
                aria-describedby={
                  shouldShowError('workEmail')
                    ? 'careers-form-work-email-error'
                    : undefined
                }
                autoComplete="email"
                inputMode="email"
              />
              {shouldShowError('workEmail') ? (
                <p
                  id="careers-form-work-email-error"
                  className={errorClass}
                >
                  {errorMap.workEmail}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="careers-form-role">
                {labels.roleOfInterest}
              </label>
              <select
                id="careers-form-role"
                className={inputClass}
                value={values.roleOfInterest}
                onChange={handleChange('roleOfInterest')}
                onBlur={handleBlur('roleOfInterest')}
                aria-invalid={shouldShowError('roleOfInterest') || undefined}
                aria-describedby={
                  shouldShowError('roleOfInterest')
                    ? 'careers-form-role-error'
                    : undefined
                }
              >
                <option value="" disabled>
                  {placeholders.roleOfInterest}
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {shouldShowError('roleOfInterest') ? (
                <p id="careers-form-role-error" className={errorClass}>
                  {errorMap.roleOfInterest}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="careers-form-message">
                {labels.message}{' '}
                <span className="text-text-muted font-normal">
                  {labels.messageOptional}
                </span>
              </label>
              <textarea
                id="careers-form-message"
                className={textareaClass}
                value={values.message}
                onChange={handleChange('message')}
                onBlur={handleBlur('message')}
                placeholder={placeholders.message}
                rows={4}
              />
            </div>

            <div
              className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="careers-form-website">Leave this empty</label>
              <input
                id="careers-form-website"
                type="text"
                name="__website"
                tabIndex={-1}
                autoComplete="off"
                value={values.__website}
                onChange={handleChange('__website')}
              />
            </div>

            <button
              type="submit"
              className="font-ui inline-flex items-center justify-center h-11 rounded-md bg-brand-500 px-5 text-[14px] font-medium text-white transition-colors hover:bg-brand-400 disabled:bg-gray-200 disabled:text-text-muted disabled:cursor-not-allowed"
              disabled={submitDisabled}
            >
              {submitLabel}
            </button>

            <p className="font-body text-[12px] leading-relaxed text-text-muted">
              {consentNote}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
