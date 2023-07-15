import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { styled } from 'twin.macro';

import { InputProps } from 'common/types/input';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    error,
    help,
    inlineLabel = false,
    label,
    customPrefix,
    suffix,
    disabled = false,
    readOnly = false,
    rules,
    ...other
  } = props;
  return (
    <Field className="input-container" component={!!label ? 'label' : 'div'}>
      {label && !inlineLabel && (
        <div className="input-label__container">
          <span className="input-label non-inline-label">{label}</span>
          {rules?.required && <span className="input-label__required">*</span>}
        </div>
      )}
      <StyledInputWrapper
        className="input-wrapper"
        error={error}
        help={help}
        disabled={disabled}
        readOnly={readOnly}
      >
        {customPrefix && <div className="prefix-container">{customPrefix}</div>}
        {label && inlineLabel && <span className="input-label inline-label">{label}</span>}
        <StyledInput
          ref={ref}
          className="input-field"
          disabled={disabled}
          readOnly={readOnly}
          {...other}
        />
        {suffix && <div className="suffix-container">{suffix}</div>}
      </StyledInputWrapper>
      {error && (
        <div className="error-container">
          <BiErrorCircle size={12} color={'#d21c1c'} />
          <span className="error-text">{error}</span>
        </div>
      )}
      {help && !error && (
        <div className="help-container">
          <span className="help-text">{help}</span>
        </div>
      )}
    </Field>
  );
});

export default Input;

export const StyledInput = styled.input`
  flex: 1 1 20%;
  border: none;
  padding: 0;
  width: 100%;
  height: 100%;

  color: #555555;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  background-color: ${({ disabled, readOnly }) => (disabled || readOnly ? '#F0F0F0' : '#FFFFFF')};

  &:focus {
    outline: none;
  }
  &:read-only,
  &::placeholder {
    font-weight: 500;
  }

  &::placeholder {
    color: #abaeb8;
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  :-webkit-autofill,
  :-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 62.5rem white inset;
  }
`;

export const StyledInputWrapper = styled.div<
  Pick<InputProps, 'error' | 'help' | 'disabled' | 'readOnly'>
>`
  display: flex;
  height: 2.5rem;
  padding: 0 0.875rem;
  border: 1px solid
    ${(props) => {
      if (props.error) return '#D21C1C';
      else if (props.help) return '#FF6112';
      else return '#E6E6E6';
    }};
  background-color: ${({ disabled, readOnly }) => (disabled || readOnly ? '#F0F0F0' : '#FFFFFF')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'auto')};
  border-radius: 0.75rem;

  .inline-label {
    margin-right: 0.75rem;
    align-self: center;
  }

  .prefix-container,
  .suffix-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .prefix-container {
    padding-right: 0.5rem;
  }

  .suffix-container {
    padding-left: 0.5rem;
  }

  &:focus-within {
    border: 1.5px solid #eaa249;
  }
`;

export const Field: any = styled(
  React.forwardRef<any, any>(
    ({ component: Component, className, children, spaceAfter, theme, width, ...props }, ref) => {
      return (
        <Component
          className={className}
          ref={ref}
          spaceAfter={spaceAfter}
          theme={theme}
          width={width}
          {...props}
        >
          {children}
        </Component>
      );
    },
  ),
)`
  span.input-label {
    display: block;
    color: #262626;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    &.non-inline-label {
      margin-bottom: 0.5rem;
    }
  }

  .input-label__container {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }

  .input-label__required {
    color: #d21c1c;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .error-container,
  .help-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.25rem;
  }

  .error-icon,
  .help-icon {
    margin-right: 0.25rem;
    margin-top: 0.125rem;
    min-width: 1rem;
    min-height: 1rem;
    width: 1rem;
    height: 1rem;
  }

  .error-text,
  .help-text {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.25rem;
  }

  .error-text {
    color: #d21c1c;
  }

  .help-text {
    color: #ff6112;
  }
`;
